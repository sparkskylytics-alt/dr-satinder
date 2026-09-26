"""Turn the markdown SEO report into a branded PDF (logo, watermark, header/footer).

Env (all optional):
  REPORT_DATE, SITE_NAME, MODE, STATUS_TEXT
  AGENCY_NAME (default SparkSkylytics), AGENCY_WEBSITE, AGENCY_PHONE, AGENCY_EMAIL
  BRAND_COLOR (hex, default #1F4E79)
Logo: put your logo at scripts/seo/brand/logo.png (transparent PNG works best).
Output: seo-reports/<date>.pdf
"""
import html
import os
from pathlib import Path

import markdown
from weasyprint import HTML

E = os.environ.get
DATE = E("REPORT_DATE", "")
SITE = E("SITE_NAME") or E("GITHUB_REPOSITORY", "Website")
AGENCY = E("AGENCY_NAME") or "SparkSkylytics"
COLOR = E("BRAND_COLOR") or "#1F4E79"
MODE = E("MODE", "report")
STATUS = E("STATUS_TEXT", "")
CONTACT = " · ".join(x for x in (E("AGENCY_WEBSITE"), E("AGENCY_PHONE"), E("AGENCY_EMAIL")) if x)

HERE = Path(__file__).resolve().parent
LOGO = HERE / "brand" / "logo.png"


def build(report_md: str, out: Path):
    body = markdown.markdown(report_md, extensions=["tables", "sane_lists"])
    logo_tag = (f'<img class="logo" src="{LOGO.as_uri()}">' if LOGO.exists()
                else f'<div class="logo-text">{html.escape(AGENCY)}</div>')
    wm_logo = f'<img class="wm-logo" src="{LOGO.as_uri()}">' if LOGO.exists() else ""
    title = "Monthly SEO Report" if MODE == "fix" else "Weekly SEO Report"
    status = f'<div class="status">{html.escape(STATUS)}</div>' if STATUS else ""

    doc = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@page {{
  size: A4; margin: 26mm 16mm 20mm 16mm;
  @top-left {{ content: "{html.escape(AGENCY)} · SEO Report"; font-size: 8.5pt; color: #888; }}
  @top-right {{ content: "{html.escape(SITE)} · {DATE}"; font-size: 8.5pt; color: #888; }}
  @bottom-left {{ content: "{html.escape(CONTACT) or 'Confidential — prepared for the client'}"; font-size: 8pt; color: #999; }}
  @bottom-right {{ content: "Page " counter(page) " of " counter(pages); font-size: 8pt; color: #999; }}
}}
body {{ font-family: "Noto Sans", "Noto Sans Devanagari", "DejaVu Sans", Arial, sans-serif;
        font-size: 10pt; line-height: 1.5; color: #222; }}
.watermark {{ position: fixed; top: 45%; left: 0; right: 0; text-align: center;
              transform: rotate(-35deg); font-size: 70pt; font-weight: 700;
              color: {COLOR}; opacity: 0.06; letter-spacing: 4pt; z-index: -1; }}
.wm-logo {{ position: fixed; top: 32%; left: 30%; width: 40%; opacity: 0.05; z-index: -2; }}
.cover {{ border-bottom: 3px solid {COLOR}; padding-bottom: 10pt; margin-bottom: 14pt; }}
.logo {{ max-height: 48pt; max-width: 180pt; }}
.logo-text {{ font-size: 20pt; font-weight: 800; color: {COLOR}; }}
.cover h1 {{ color: {COLOR}; font-size: 22pt; margin: 10pt 0 2pt; border: none; }}
.meta {{ color: #555; font-size: 10.5pt; }}
.status {{ background: #f1f5f9; border-left: 4px solid {COLOR}; padding: 8pt 10pt; margin: 10pt 0;
           font-weight: 600; }}
h1 {{ color: {COLOR}; font-size: 16pt; }}
h2 {{ color: {COLOR}; font-size: 13.5pt; border-bottom: 1px solid #dde3ea; padding-bottom: 2pt; margin-top: 16pt; }}
h3 {{ font-size: 11.5pt; margin-top: 12pt; }}
table {{ border-collapse: collapse; width: 100%; margin: 8pt 0; font-size: 9pt; page-break-inside: auto; }}
th {{ background: {COLOR}; color: #fff; text-align: left; padding: 5pt 6pt; }}
td {{ border-bottom: 1px solid #e3e8ee; padding: 4pt 6pt; vertical-align: top; }}
tr {{ page-break-inside: avoid; }}
tr:nth-child(even) td {{ background: #f7f9fb; }}
code {{ font-size: 8.5pt; background: #f1f3f5; padding: 0 2pt; }}
</style></head><body>
<div class="watermark">{html.escape(AGENCY)}</div>{wm_logo}
<div class="cover">{logo_tag}
<h1>{title}</h1>
<div class="meta"><b>{html.escape(SITE)}</b> &nbsp;|&nbsp; {DATE} &nbsp;|&nbsp; Prepared by {html.escape(AGENCY)}</div>
{status}</div>
{body}
</body></html>"""
    out.parent.mkdir(parents=True, exist_ok=True)
    HTML(string=doc, base_url=str(HERE)).write_pdf(out)
    return out


def main():
    src = Path(f"seo-reports/{DATE}.md")
    if not src.exists():
        print("No report file, skipping PDF.")
        return
    out = build(src.read_text(encoding="utf-8"), Path(f"seo-reports/{DATE}.pdf"))
    print("PDF:", out)


if __name__ == "__main__":
    main()
