"""Regenerează fișierele de brand Codito. Rulare: python3 design/brand/export.py"""
import os, subprocess, tempfile
D = os.path.dirname(os.path.abspath(__file__))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
MARK = '<svg viewBox="0 0 64 64" style="width:{s}px;height:{s}px"><rect width="64" height="64" rx="{r}" fill="#F0643A"/><path d="M35 22.5a12 12 0 1 0 0 19" fill="none" stroke="#fff" stroke-width="7.5" stroke-linecap="round"/><rect x="42" y="39" width="12" height="6" rx="3" fill="#FFE08A"/></svg>'
HEAD = '''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Inter:wght@500;600&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}body{display:grid;place-items:center;font-family:Inter,sans-serif;overflow:hidden;position:relative}
.l{display:flex;align-items:center;justify-content:center}.w{font:700 1em/1 Fraunces,serif;letter-spacing:-.02em;font-variation-settings:"opsz" 30}.w i{font-style:normal;color:#F0643A}</style></head>'''
def lockup(size, gap, color):
    return f'<div class="l" style="gap:{gap}px;font-size:{size}px">{MARK.format(s=int(size*1.18), r=18)}<span class="w" style="color:{color}">Codit<i>o</i></span></div>'
PAGES = {
  "codito-logo-fundal-deschis.png": (2000, 600, f'<body style="width:2000px;height:600px;background:#FFF9F1">{lockup(220,56,"#1E2442")}</body>'),
  "codito-logo-fundal-inchis.png": (2000, 600, f'<body style="width:2000px;height:600px;background:#1E2442">{lockup(220,56,"#fff")}</body>'),
  "codito-poza-profil.png": (1024, 1024, f'<body style="width:1024px;height:1024px;background:#FFF9F1">{MARK.format(s=560, r=18)}</body>'),
  "codito-coperta-facebook.png": (1640, 624, '<body style="width:1640px;height:624px;background:#FFF9F1"><div style="position:absolute;inset:0;background-image:radial-gradient(rgba(30,36,66,.08) 1.4px,transparent 1.4px);background-size:28px 28px"></div><div style="position:absolute;right:-180px;top:-220px;width:760px;height:760px;border-radius:50%;background:radial-gradient(circle,rgba(240,100,58,.22),transparent 65%)"></div><div style="position:relative;text-align:center">' + lockup(120,30,"#1E2442") + '<p style="margin-top:26px;font:600 38px Inter;color:#454C68">Programare &amp; AI pentru copii și adolescenți · 9–17 ani</p><p style="margin-top:22px;display:inline-block;background:#F0643A;color:#fff;font:600 30px Inter;padding:14px 30px;border-radius:999px">Lecții online 1:1 · Prima lecție gratuită</p></div></body>'),
}
for name, (w, h, body) in PAGES.items():
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as f:
        f.write(HEAD + body + "</html>"); tmp = f.name
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", f"--window-size={w},{h}", "--virtual-time-budget=4000", f"--screenshot={os.path.join(D, name)}", "file://" + tmp], capture_output=True)
    os.unlink(tmp); print("ok", name)
