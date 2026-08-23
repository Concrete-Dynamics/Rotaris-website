"""Regenerate public/og-image.png.

The Open Graph card is a build artefact, not hand-drawn: the mark is the
geometry from src/assets/logo.svg, the greys come from the oklch values in
src/styles/tokens/colors.css, and the type is the self-hosted variable fonts.
Change any of those and run this again rather than editing the PNG.

    python scripts/og-image.py

Needs fonttools, brotli and Pillow, and npm install to have run.
"""
import io, math, os
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, 'node_modules', '.cache', 'og-fonts')
os.makedirs(BUILD, exist_ok=True)

# ── oklch -> sRGB, so the greys match styles/tokens/colors.css exactly ───────
def oklch(L, C, h_deg):
    h = math.radians(h_deg)
    a, b = C * math.cos(h), C * math.sin(h)
    l_, m_, s_ = L + 0.3963377774*a + 0.2158037573*b, \
                 L - 0.1055613458*a - 0.0638541728*b, \
                 L - 0.0894841775*a - 1.2914855480*b
    l, m, s = l_**3, m_**3, s_**3
    r = +4.0767416621*l - 3.3077115913*m + 0.2309699292*s
    g = -1.2684380046*l + 2.6097574011*m - 0.3413193965*s
    bl = -0.0041960863*l - 0.7034186147*m + 1.7076147010*s
    def enc(c):
        c = max(0.0, min(1.0, c))
        c = 12.92*c if c <= 0.0031308 else 1.055*c**(1/2.4) - 0.055
        return int(round(c * 255))
    return (enc(r), enc(g), enc(bl))

BG        = oklch(0.21, 0, 0)      # --rt-bg
TEXT      = oklch(0.94, 0, 0)      # --rt-text
SECONDARY = oklch(0.80, 0, 0)      # --rt-text-secondary
TERTIARY  = oklch(0.68, 0, 0)      # --rt-text-tertiary
RING      = (0x91, 0x84, 0xd9)     # logo ring
AMBER     = (0xcc, 0x8b, 0x00)     # logo, --rt-wait family
GREEN     = (0x00, 0xa8, 0x78)     # logo, --rt-run family

# ── the variable fonts, unpacked from woff2 so FreeType can read them ────────
def ttf(pkg, name):
    src = os.path.join(ROOT, 'node_modules/@fontsource-variable', pkg, 'files', name)
    out = os.path.join(BUILD, name.replace('.woff2', '.ttf'))
    if not os.path.exists(out):
        f = TTFont(src)
        f.flavor = None
        f.save(out)
    return out

GROTESK = ttf('space-grotesk', 'space-grotesk-latin-wght-normal.woff2')
MANROPE = ttf('manrope', 'manrope-latin-wght-normal.woff2')
MONO    = ttf('jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2')

def font(path, size, weight):
    f = ImageFont.truetype(path, size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f

W, H, S = 1200, 630, 3           # supersample for clean circles
img = Image.new('RGB', (W*S, H*S), BG)
d = ImageDraw.Draw(img, 'RGBA')

# ── dot grid, the .rt-dot-grid-soft motif behind the hero ───────────────────
step = 26*S
for y in range(0, H*S, step):
    for x in range(0, W*S, step):
        d.ellipse([x, y, x+2*S, y+2*S], fill=(255, 255, 255, 12))

# ── logo mark: circles clipped to the area OUTSIDE the primary circle ───────
# Geometry copied from src/assets/logo.svg (viewBox "-1 0 106 121").
MARK = 148 * S
sc = MARK / 121.0
ox, oy = 96*S, 172*S

def px(x, y):   # svg user units -> canvas
    return (ox + (x + 1) * sc, oy + y * sc)

layer = Image.new('RGBA', img.size, (0, 0, 0, 0))
ld = ImageDraw.Draw(layer)
for (cx, cy, r, col) in ((22, 76, 23, AMBER), (72, 88, 33, GREEN)):
    x, y = px(cx, cy)
    rr = r * sc
    ld.ellipse([x-rr, y-rr, x+rr, y+rr], fill=col + (217,))   # fill-opacity .85

mask = Image.new('L', img.size, 255)
md = ImageDraw.Draw(mask)
mx, my = px(52, 52)
mr = 52 * sc
md.ellipse([mx-mr, my-mr, mx+mr, my+mr], fill=0)              # the SVG mask
layer.putalpha(Image.composite(layer.getchannel('A'), Image.new('L', img.size, 0), mask))
img.paste(Image.alpha_composite(img.convert('RGBA'), layer).convert('RGB'), (0, 0))

d = ImageDraw.Draw(img, 'RGBA')
rr = 50.5 * sc
d.ellipse([mx-rr, my-rr, mx+rr, my+rr], outline=RING + (230,), width=int(3*sc))

# ── wordmark and copy ───────────────────────────────────────────────────────
tx = ox + 108*sc + 46*S
d.text((tx, 190*S), 'Rotaris', font=font(GROTESK, 104*S, 600), fill=TEXT)
d.text((tx, 310*S), 'The agentic coding control plane',
       font=font(MANROPE, 40*S, 500), fill=SECONDARY)

d.line([96*S, 424*S, 1104*S, 424*S], fill=RING + (70,), width=S)
d.text((96*S, 456*S),
       'Run and supervise a team of specialized coding agents',
       font=font(MANROPE, 34*S, 400), fill=SECONDARY)
d.text((96*S, 522*S), 'Free  ·  GPL-3.0-only  ·  no account  ·  Windows and Linux',
       font=font(MONO, 26*S, 400), fill=TERTIARY)

img.resize((W, H), Image.LANCZOS).save(os.path.join(ROOT, 'public/og-image.png'),
                                       optimize=True)
print('wrote public/og-image.png')
