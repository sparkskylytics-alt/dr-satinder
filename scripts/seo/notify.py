"""Send the SEO report by email (Gmail) with a branded PDF attached. Never fails the job."""
import os
import smtplib
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

E = os.environ.get
SITE = E("SITE_NAME") or E("GITHUB_REPOSITORY", "Website")
DATE = E("REPORT_DATE", "")
MODE = E("MODE", "report")
RESULT = E("PUSH_RESULT", "")
LINK = E("LINK_URL", "")
RUN_URL = E("RUN_URL", "")

STATUS_TEXT = {
    "live": "Fixes are LIVE on the website (build passed).",
    "pr": "Fixes are ready in a Pull Request. Please review and merge.",
    "build_failed": "Fixes NOT live: build failed. Pull Request opened, please check.",
    "report_only": "No code changes needed this month.",
    "none": "No code changes this month.",
}


def status_line():
    if MODE != "fix":
        return "Weekly report only (code fixes run on the first Monday of each month)."
    return STATUS_TEXT.get(RESULT, "Fix run finished.")


def send_email(subject, report_md, short_text, pdf_path=None):
    user, pwd, to = E("EMAIL_USER"), E("EMAIL_APP_PASSWORD"), E("EMAIL_TO")
    if not (user and pwd and to):
        return
    try:
        import markdown
        body_html = markdown.markdown(report_md or short_text, extensions=["tables"])
    except Exception:
        body_html = "<pre>" + (report_md or short_text) + "</pre>"
    link_html = f'<p><a href="{LINK}">Open the changes on GitHub</a></p>' if LINK else ""
    summary_html = ("<p style=\"background:#fffbea;padding:10px;border-radius:6px\"><b>Quick summary:</b><br>"
                    + short_text.replace("\n", "<br>") + "</p>") if short_text else ""
    html = f"""<html><body style="font-family:Arial,sans-serif;max-width:760px;line-height:1.5">
<h2 style="color:#0082C8">SEO report - {SITE} - {DATE}</h2>
<p style="background:#f2f7fb;padding:10px;border-radius:6px"><b>{status_line()}</b></p>
{summary_html}
{link_html}
<p>The full report is attached as a PDF.</p>
{body_html}
<style>table{{border-collapse:collapse}}td,th{{border:1px solid #ccc;padding:4px 8px}}</style>
<hr><p style="color:#888;font-size:12px">Workflow run: <a href="{RUN_URL}">{RUN_URL}</a></p>
</body></html>"""
    msg = MIMEMultipart("mixed")
    msg["Subject"], msg["From"], msg["To"] = subject, user, to
    alt = MIMEMultipart("alternative")
    alt.attach(MIMEText(report_md or short_text, "plain", "utf-8"))
    alt.attach(MIMEText(html, "html", "utf-8"))
    msg.attach(alt)
    if pdf_path and Path(pdf_path).exists():
        part = MIMEApplication(Path(pdf_path).read_bytes(), _subtype="pdf")
        safe_site = "".join(c if c.isalnum() else "-" for c in SITE).strip("-")
        part.add_header("Content-Disposition", "attachment", filename=f"SEO-Report-{safe_site}-{DATE}.pdf")
        msg.attach(part)
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=30) as s:
        s.login(user, pwd)
        s.sendmail(user, [a.strip() for a in to.split(",")], msg.as_string())
    print("Email: sent")


def main():
    summary_f = Path("seo-reports/summary.txt")
    report_f = Path(f"seo-reports/{DATE}.md")
    summary = summary_f.read_text(encoding="utf-8").strip() if summary_f.exists() else ""
    report = report_f.read_text(encoding="utf-8") if report_f.exists() else ""

    if E("JOB_STATUS", "success") != "success" or not summary:
        text = f"SEO job for {SITE} did not finish. Check: {RUN_URL}"
        subject = f"SEO job FAILED - {SITE} - {DATE}"
    else:
        text = summary
        tag = {"live": "fixes LIVE", "pr": "review needed", "build_failed": "BUILD FAILED"}.get(RESULT, "")
        subject = f"SEO {'monthly fix' if MODE == 'fix' else 'weekly report'} - {SITE} - {DATE}" + (f" ({tag})" if tag else "")

    pdf_path = None
    if report:
        try:
            os.environ["STATUS_TEXT"] = status_line()
            import make_pdf
            pdf_path = make_pdf.build(report, Path(f"seo-reports/{DATE}.pdf"))
            print("PDF created:", pdf_path)
        except Exception as e:
            print("PDF failed (email still sent without it):", e)

    try:
        send_email(subject, report, text, pdf_path)
    except Exception as e:
        print(f"Email failed: {e}")


if __name__ == "__main__":
    main()
