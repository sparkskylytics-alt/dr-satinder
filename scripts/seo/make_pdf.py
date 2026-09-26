"""Build the branded, client-friendly SEO report PDF.

Numbers and tables come straight from Search Console data (seo-reports/data/latest.json).
Claude only writes short plain-English insights (seo-reports/insights.json).

Env (optional): REPORT_DATE, SITE_NAME, MODE, STATUS_TEXT,
  AGENCY_NAME (default SparkSkylytics), AGENCY_WEBSITE, AGENCY_PHONE, AGENCY_EMAIL, BRAND_COLOR
Logo: scripts/seo/brand/logo.png
"""
import datetime as dt
import html
import json
import os
from pathlib import Path
from urllib.parse import urlparse

from weasyprint import HTML

E = os.environ.get
HERE = Path(__file__).resolve().parent
LOGO = HERE / "brand" / "logo.png"
esc = html.escape


def cfg():
    return {
        "date": E("REPORT_DATE") or dt.date.today().isoformat(),
        "site": E("SITE_NAME") or E("GITHUB_REPOSITORY", "Website"),
        "agency": E("AGENCY_NAME") or "SparkSkylytics",
        "color": E("BRAND_COLOR") or "#1F4E79",
        "mode": E("MODE", "report"),
        "status": E("STATUS_TEXT", ""),
        "contact": " · ".join(x for x in (E("AGENCY_WEBSITE"), E("AGENCY_PHONE"), E("AGENCY_EMAIL")) if x),
    }


# ---------- helpers ----------
def nice_date(s):
    try:
        return dt.date.fromisoformat(s).strftime("%d %b %Y")
    except Exception:
        return s


def page_name(url):
    path = urlparse(url).path.strip("/")
    if not path:
        return "Home page"
    last = path.split("/")[-1].replace("-", " ")
    prefix = "Doctor: " if path.startswith("doctors/") else ""
    return prefix + last[:1].upper() + last[1:]


def badge(pos):
    if pos is None:
        return ""
    if pos <= 3:
        return '<span class="b b-top">Top 3</span>'
    if pos <= 10:
        return '<span class="b b-p1">Page 1</span>'
    if pos <= 20:
        return '<span class="b b-p2">Page 2</span>'
    return '<span class="b b-p3">Page 3+</span>'


def change_pos(cur, prev):
    """Position change: lower is better."""
    if prev is None:
        return '<span class="new">new</span>'
    d = prev - cur
    if abs(d) < 0.5:
        return '<span class="flat">same</span>'
    return f'<span class="up">▲ {d:.1f}</span>' if d > 0 else f'<span class="down">▼ {abs(d):.1f}</span>'


def change_num(cur, prev, pct=False, lower_better=False):
    if not prev:
        return '<span class="new">new baseline</span>'
    d = cur - prev
    if abs(d) < (0.05 if pct else 0.5 if lower_better else 1):
        return '<span class="flat">no change</span>'
    good = (d < 0) if lower_better else (d > 0)
    cls = "up" if good else "down"
    arrow = "▲" if d > 0 else "▼"
    if lower_better:
        txt = f"{arrow} {abs(d):.1f}"
    elif pct:
        txt = f"{arrow} {abs(d):.1f} pts"
    else:
        rel = f" ({abs(d) / prev * 100:.0f}%)" if prev else ""
        txt = f"{arrow} {abs(d):,.0f}{rel}"
    return f'<span class="{cls}">{txt}</span>'


def li(items):
    items = [i for i in (items or []) if str(i).strip()]
    return "<ul>" + "".join(f"<li>{esc(str(i))}</li>" for i in items) + "</ul>" if items else "<p class='muted'>Nothing this time.</p>"


def daily_chart(daily, color):
    if not daily:
        return ""
    daily = sorted(daily, key=lambda r: r["date"])
    W, H, pad = 640, 150, 24
    n = len(daily)
    mx = max(r["impressions"] for r in daily) or 1
    bw = (W - pad * 2) / n
    bars, labels = [], []
    for i, r in enumerate(daily):
        h = (r["impressions"] / mx) * (H - 40)
        x = pad + i * bw
        bars.append(f'<rect x="{x + bw * 0.15:.1f}" y="{H - 20 - h:.1f}" width="{bw * 0.7:.1f}" height="{h:.1f}" rx="2" fill="{color}" opacity="0.8"/>')
        if r["clicks"]:
            bars.append(f'<circle cx="{x + bw / 2:.1f}" cy="{H - 26 - h:.1f}" r="3.2" fill="#E8833A"/>')
        if i % max(1, n // 6) == 0:
            d = dt.date.fromisoformat(r["date"]).strftime("%d %b")
            labels.append(f'<text x="{x + bw / 2:.1f}" y="{H - 5}" font-size="9" text-anchor="middle" fill="#888">{d}</text>')
    return (f'<svg viewBox="0 0 {W} {H}" width="100%" xmlns="http://www.w3.org/2000/svg">'
            f'<line x1="{pad}" y1="{H - 20}" x2="{W - pad}" y2="{H - 20}" stroke="#ddd"/>'
            + "".join(bars) + "".join(labels) + "</svg>"
            f'<div class="legend"><span class="sq" style="background:{color}"></span> Impressions per day '
            f'&nbsp;&nbsp;<span class="dot"></span> Day with a click (max {mx} impressions/day)</div>')


# ---------- main builder ----------
def build(data, insights, out: Path):
    c = cfg()
    cur, prev = data["current"], data["previous"]
    t, pt = cur["totals"], prev["totals"]
    prev_q = {r["query"]: r for r in prev.get("queries", [])}
    color = c["color"]
    ins = insights or {}

    # KPI cards
    def card(label, value, chg, hint):
        return f'<div class="kpi"><div class="kl">{label}</div><div class="kv">{value}</div><div class="kc">{chg}</div><div class="kh">{hint}</div></div>'

    kpis = "".join([
        card("Clicks", f"{t['clicks']:,}", change_num(t["clicks"], pt.get("clicks")), "Visits from Google"),
        card("Impressions", f"{t['impressions']:,}", change_num(t["impressions"], pt.get("impressions")), "Times shown on Google"),
        card("Click rate", f"{t['ctr'] * 100:.1f}%", change_num(t["ctr"] * 100, (pt.get("ctr") or 0) * 100 if pt.get("impressions") else None, pct=True), "Clicks ÷ impressions"),
        card("Avg. position", f"{t['position']:.1f}" if t.get("position") else "–",
             change_num(t["position"], pt.get("position"), lower_better=True) if t.get("position") else "", "Lower is better (1 = top)"),
    ])

    queries = cur.get("queries", [])
    top_q = sorted(queries, key=lambda r: -r["impressions"])[:12]
    opp = [r for r in queries if r["position"] <= 10 and r["impressions"] >= 5 and r["clicks"] == 0]
    opp = sorted(opp, key=lambda r: -r["impressions"])[:8]
    near = [r for r in queries if 10 < r["position"] <= 20 and r["impressions"] >= 2]
    near = sorted(near, key=lambda r: -r["impressions"])[:8]

    def qrow(r):
        p = prev_q.get(r["query"])
        return (f"<tr><td>{esc(r['query'])}</td><td class='n'>{r['impressions']}</td><td class='n'>{r['clicks']}</td>"
                f"<td class='n'>{r['position']:.1f}</td><td>{badge(r['position'])}</td>"
                f"<td>{change_pos(r['position'], p['position'] if p else None)}</td></tr>")

    qhead = "<tr><th>Search term</th><th class='n'>Shown</th><th class='n'>Clicks</th><th class='n'>Position</th><th>Where</th><th>Change</th></tr>"

    def simple_rows(rows):
        return "".join(f"<tr><td>{esc(r['query'])}</td><td class='n'>{r['impressions']}</td><td class='n'>{r['position']:.1f}</td></tr>" for r in rows)

    pages = sorted(cur.get("pages", []), key=lambda r: -r["impressions"])[:10]
    page_rows = "".join(
        f"<tr><td>{esc(page_name(r['page']))}</td><td class='n'>{r['impressions']}</td><td class='n'>{r['clicks']}</td>"
        f"<td class='n'>{r['ctr'] * 100:.1f}%</td><td class='n'>{r['position']:.1f}</td></tr>" for r in pages)

    dev = {d.get("device", "").lower(): d for d in cur.get("devices", [])}
    mob = dev.get("mobile", {}).get("impressions", 0)
    share = f"{mob / t['impressions'] * 100:.0f}%" if t.get("impressions") else "–"

    all_rows = "".join(
        f"<tr><td>{esc(r['query'])}</td><td class='n'>{r['impressions']}</td><td class='n'>{r['clicks']}</td><td class='n'>{r['position']:.1f}</td></tr>"
        for r in sorted(queries, key=lambda r: -r["impressions"])[:120])

    changes = ins.get("changes_made") or []
    changes_html = ""
    if c["mode"] == "fix":
        rows = "".join(f"<tr><td>{esc(x.get('page', ''))}</td><td>{esc(x.get('change', ''))}</td><td>{esc(x.get('reason', ''))}</td></tr>" for x in changes)
        changes_html = ("<h2>What we improved on the website this month</h2>" +
                        (f"<table><tr><th>Page</th><th>What we changed</th><th>Why (from the data)</th></tr>{rows}</table>" if rows
                         else "<p class='muted'>No changes were needed this month.</p>"))
    earlier = ins.get("earlier_fixes") or []
    if earlier:
        label = {"kept": "Working – kept", "waiting": "Waiting for Google", "restored": "Didn't help – undone"}
        rows = "".join(f"<tr><td>{esc(x.get('page', ''))}</td><td>{label.get(x.get('result'), esc(x.get('result', '')))}</td><td>{esc(x.get('note', ''))}</td></tr>" for x in earlier)
        changes_html += f"<h2>Results of earlier improvements</h2><table><tr><th>Page</th><th>Result</th><th>Note</th></tr>{rows}</table>"

    verdict = {"good": ("Good progress", "#1E8E5A"), "okay": ("Steady", "#C98A00"), "needs_attention": ("Needs attention", "#C2413A")}
    vtxt, vcol = verdict.get(ins.get("verdict", "okay"), verdict["okay"])
    logo = f'<img class="logo" src="{LOGO.as_uri()}">' if LOGO.exists() else f'<div class="logo-text">{esc(c["agency"])}</div>'
    wm_logo = f'<img class="wm-logo" src="{LOGO.as_uri()}">' if LOGO.exists() else ""
    period = f"{nice_date(cur['start'])} – {nice_date(cur['end'])}"
    title = "Monthly SEO Report" if c["mode"] == "fix" else "Weekly SEO Report"
    compare_note = ("" if pt.get("impressions") else
                    "<p class='note'>This is the first full period of data, so it is the starting point (baseline). Changes will be shown from next report.</p>")

    doc = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@page {{ size: A4; margin: 22mm 15mm 18mm 15mm;
  @top-left {{ content: "{esc(c['agency'])}"; font: 600 8.5pt Poppins; color: {color}; }}
  @top-right {{ content: "{esc(c['site'])} · {esc(nice_date(c['date']))}"; font: 8.5pt Poppins; color: #999; }}
  @bottom-left {{ content: "{esc(c['contact']) or 'Confidential · prepared for ' + esc(c['site'])}"; font: 8pt Poppins; color: #aaa; }}
  @bottom-right {{ content: "Page " counter(page) " of " counter(pages); font: 8pt Poppins; color: #aaa; }} }}
@page:first {{ @top-left {{ content: none; }} @top-right {{ content: none; }} }}
body {{ font-family: Poppins, "Noto Sans Devanagari", "Noto Sans", sans-serif; font-size: 9.6pt; line-height: 1.55; color: #26303a; }}
.watermark {{ position: fixed; top: 44%; left: -10%; right: -10%; text-align: center; transform: rotate(-32deg);
  font-size: 64pt; font-weight: 700; color: {color}; opacity: 0.07; letter-spacing: 3pt; }}
.wm-logo {{ position: fixed; top: 34%; left: 32%; width: 36%; opacity: 0.06; }}
.cover {{ display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid {color}; padding-bottom: 12pt; }}
.logo {{ max-height: 46pt; max-width: 170pt; }}
.logo-text {{ font-size: 19pt; font-weight: 700; color: {color}; }}
.cover-r {{ text-align: right; font-size: 9pt; color: #6b7785; }}
h1 {{ font-size: 21pt; font-weight: 700; color: {color}; margin: 14pt 0 0; }}
.sub {{ color: #6b7785; margin: 0 0 10pt; }}
h2 {{ font-size: 12.5pt; font-weight: 600; color: {color}; margin: 16pt 0 6pt; }}
.headline {{ font-size: 12pt; font-weight: 600; margin: 8pt 0; }}
.verdict {{ display: inline-block; background: {vcol}; color: #fff; font-size: 8.5pt; font-weight: 600; padding: 2pt 9pt; border-radius: 10pt; }}
.status {{ background: #f1f5f9; border-left: 4px solid {color}; padding: 6pt 10pt; margin: 8pt 0; font-weight: 500; }}
.kpis {{ display: flex; gap: 8pt; margin: 10pt 0; }}
.kpi {{ flex: 1; border: 1px solid #e3e8ee; border-radius: 8pt; padding: 8pt 10pt; background: #fbfcfd; }}
.kl {{ font-size: 8pt; color: #6b7785; text-transform: uppercase; letter-spacing: .5pt; }}
.kv {{ font-size: 18pt; font-weight: 700; color: #1b2733; line-height: 1.2; }}
.kc {{ font-size: 8.5pt; }} .kh {{ font-size: 7.5pt; color: #9aa4ae; }}
.cols {{ display: flex; gap: 12pt; }} .col {{ flex: 1; }}
.box {{ border: 1px solid #e3e8ee; border-radius: 8pt; padding: 4pt 12pt 6pt; }}
.box h3 {{ font-size: 10.5pt; margin: 6pt 0 2pt; }}
ul {{ margin: 4pt 0; padding-left: 14pt; }} li {{ margin-bottom: 3pt; }}
table {{ border-collapse: collapse; width: 100%; margin: 4pt 0 8pt; font-size: 8.8pt; }}
th {{ background: {color}; color: #fff; text-align: left; padding: 5pt 6pt; font-weight: 600; }}
td {{ border-bottom: 1px solid #edf0f3; padding: 4pt 6pt; vertical-align: top; }}
tr {{ page-break-inside: avoid; }} tr:nth-child(even) td {{ background: #f8fafb; }}
.n {{ text-align: right; }}
.b {{ font-size: 7.5pt; padding: 1pt 6pt; border-radius: 8pt; font-weight: 600; white-space: nowrap; }}
.b-top {{ background: #d9f2e5; color: #1E6E47; }} .b-p1 {{ background: #e3eefa; color: #245a92; }}
.b-p2 {{ background: #fdf0d5; color: #8a5b00; }} .b-p3 {{ background: #f6dddb; color: #9b2c25; }}
.up {{ color: #1E8E5A; font-weight: 600; }} .down {{ color: #C2413A; font-weight: 600; }}
.flat, .new {{ color: #8a96a3; }}
.muted, .note {{ color: #7a8793; font-size: 8.8pt; }}
.legend {{ font-size: 7.8pt; color: #7a8793; margin-top: 2pt; }}
.sq {{ display: inline-block; width: 8pt; height: 8pt; vertical-align: middle; }}
.dot {{ display: inline-block; width: 7pt; height: 7pt; border-radius: 50%; background: #E8833A; vertical-align: middle; }}
.appendix table {{ font-size: 7.8pt; }}
.pb {{ page-break-before: always; }}
</style></head><body>
<div class="watermark">{esc(c['agency'])}</div>{wm_logo}

<div class="cover">{logo}<div class="cover-r">Prepared by <b>{esc(c['agency'])}</b><br>{esc(nice_date(c['date']))}</div></div>
<h1>{title}</h1>
<p class="sub"><b>{esc(c['site'])}</b> · Google Search data: {period}</p>
<span class="verdict">{vtxt}</span>
<p class="headline">{esc(ins.get('headline', ''))}</p>
{f'<div class="status">{esc(c["status"])}</div>' if c['status'] else ''}

<div class="kpis">{kpis}</div>
{compare_note}

<div class="cols">
 <div class="col box"><h3>✔ What is going well</h3>{li(ins.get('wins'))}</div>
 <div class="col box"><h3>⚠ What needs work</h3>{li(ins.get('problems'))}</div>
</div>

<h2>Next steps</h2>
<div class="cols">
 <div class="col box"><h3>We ({esc(c['agency'])}) will</h3>{li(ins.get('next_actions_agency'))}</div>
 <div class="col box"><h3>Clinic team can help by</h3>{li(ins.get('next_actions_owner'))}</div>
</div>

<h2 class="pb">Visibility on Google, day by day</h2>
{daily_chart(cur.get('daily'), color)}
<p class="muted">{share} of searches came from mobile phones.</p>

<h2>Top search terms</h2>
<table>{qhead}{''.join(qrow(r) for r in top_q)}</table>

<div class="cols">
 <div class="col"><h2>Shown on page 1, but not clicked yet</h2>
  <p class="muted">Better titles and descriptions can turn these into visits.</p>
  <table><tr><th>Search term</th><th class='n'>Shown</th><th class='n'>Position</th></tr>{simple_rows(opp) or "<tr><td colspan=3 class='muted'>None</td></tr>"}</table></div>
 <div class="col"><h2>Almost on page 1</h2>
  <p class="muted">Small improvements can move these to page 1.</p>
  <table><tr><th>Search term</th><th class='n'>Shown</th><th class='n'>Position</th></tr>{simple_rows(near) or "<tr><td colspan=3 class='muted'>None</td></tr>"}</table></div>
</div>

<h2>Top pages</h2>
<table><tr><th>Page</th><th class='n'>Shown</th><th class='n'>Clicks</th><th class='n'>Click rate</th><th class='n'>Position</th></tr>{page_rows}</table>

{changes_html}

<div class="appendix pb"><h2>Appendix: all search terms ({len(queries)})</h2>
<table><tr><th>Search term</th><th class='n'>Shown</th><th class='n'>Clicks</th><th class='n'>Position</th></tr>{all_rows}</table></div>
</body></html>"""
    out.parent.mkdir(parents=True, exist_ok=True)
    HTML(string=doc, base_url=str(HERE)).write_pdf(out)
    return out


def load(date):
    data = json.loads(Path("seo-reports/data/latest.json").read_text(encoding="utf-8"))
    p = Path(f"seo-reports/insights-{date}.json")
    insights = json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}
    return data, insights


if __name__ == "__main__":
    d = cfg()["date"]
    data, ins = load(d)
    print(build(data, ins, Path(f"seo-reports/{d}.pdf")))
