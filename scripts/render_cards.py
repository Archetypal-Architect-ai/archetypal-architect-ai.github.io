"""Render the Explore-tab title cards and share images in the house style.

Charcoal #1a1a1a, white type, gold #c4a574 accents only, Inter Display, gold
glyph mark. Run from the repo root:  python3 scripts/render_cards.py
Needs Pillow and an Inter variable font (path below or $INTER_FONT).
"""
import json, math, os, sys
from PIL import Image, ImageDraw, ImageFont

FONT = os.environ.get(
    "INTER_FONT",
    "/usr/share/fonts/truetype/sand-box/google/Inter/Inter-VariableFont_opsz,wght.ttf",
)
CHAR = (26, 26, 26)
WHITE = (255, 255, 255)
GOLD = (196, 165, 116)
S = 2  # supersample factor


def font(size, weight=500, opsz=32):
    f = ImageFont.truetype(FONT, size * S)
    try:
        f.set_variation_by_axes([opsz, weight])
    except Exception:
        pass
    return f


def spaced(draw, xy, text, fnt, fill, tracking=0.18):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + fnt.size * tracking
    return x


def glyph(draw, x, y, size, width, color=GOLD):
    """The gold square mark: open at the upper right, with an inward bar."""
    s, w = size, width
    draw.rectangle([x, y, x + s, y + w], fill=color)  # top
    draw.rectangle([x, y, x + w, y + s], fill=color)  # left
    draw.rectangle([x, y + s - w, x + s, y + s], fill=color)  # bottom
    draw.rectangle([x + s - w, y + s * 0.5, x + s, y + s], fill=color)  # right (lower half)
    draw.rectangle([x + s * 0.58, y + s * 0.5, x + s, y + s * 0.5 + w], fill=color)  # bar


def wrap(draw, text, fnt, width):
    words, lines, cur = text.split(), [], ""
    for wd in words:
        t = (cur + " " + wd).strip()
        if draw.textlength(t, font=fnt) <= width:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = wd
    if cur:
        lines.append(cur)
    return lines


def motif(draw, kind, cx, cy, r):
    line = (255, 255, 255, 46)
    lw = max(2, int(1.2 * S))
    if kind in ("Concept", "Other"):
        for i in range(1, 5):
            rr = r * i / 4
            draw.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], outline=line, width=lw)
        for a in range(0, 360, 30):
            t = math.radians(a)
            draw.line([cx, cy, cx + r * math.cos(t), cy + r * math.sin(t)], fill=line, width=lw)
        draw.ellipse([cx - 9 * S, cy - 9 * S, cx + 9 * S, cy + 9 * S], fill=GOLD)
    elif kind == "Imprint":
        x = cx - r * 0.9
        heights = [0.95, 1.4, 1.15, 1.6, 1.05, 1.3, 0.9, 1.5]
        for i, h in enumerate(heights):
            wdt = r * 0.18
            top = cy + r * 0.8 - r * h
            col = GOLD if i == 3 else line
            draw.rectangle([x, top, x + wdt, cy + r * 0.8], outline=col, width=lw)
            x += wdt + r * 0.05
        draw.line([cx - r, cy + r * 0.8, cx + r, cy + r * 0.8], fill=line, width=lw)
    elif kind in ("Atlas", "Universe"):
        n = 7
        step = 2 * r / (n - 1)
        for i in range(n):
            for j in range(n):
                px, py = cx - r + i * step, cy - r + j * step
                rad = 3 * S
                col = GOLD if (i, j) == (4, 2) else (255, 255, 255, 70)
                if (i, j) == (4, 2):
                    rad = 7 * S
                draw.ellipse([px - rad, py - rad, px + rad, py + rad], fill=col)
        draw.rectangle([cx - r, cy - r, cx + r, cy + r], outline=line, width=lw)
    elif kind == "Place":
        for i in range(7):
            pts = []
            for k in range(0, 101):
                x = cx - r + 2 * r * k / 100
                y = cy - r * 0.75 + i * r * 0.25 + math.sin(k / 100 * math.pi * 2 + i * 0.6) * r * 0.12
                pts.append((x, y))
            draw.line(pts, fill=GOLD if i == 3 else line, width=lw)
    elif kind in ("Character", "Species"):
        hexr = r * 0.32
        for q in range(-2, 3):
            for rr in range(-2, 3):
                x = cx + hexr * 1.5 * q
                y = cy + hexr * math.sqrt(3) * (rr + q / 2)
                if abs(x - cx) > r or abs(y - cy) > r:
                    continue
                pts = [(x + hexr * 0.92 * math.cos(math.radians(60 * k)), y + hexr * 0.92 * math.sin(math.radians(60 * k))) for k in range(7)]
                draw.line(pts, fill=GOLD if (q, rr) == (0, 0) else line, width=lw)
    elif kind == "Tool":
        for i in range(5):
            d = r * (1 - i * 0.2)
            ang = math.radians(i * 9)
            pts = []
            for k in range(5):
                t = ang + math.radians(45 + 90 * k)
                pts.append((cx + d * math.cos(t), cy + d * math.sin(t)))
            draw.line(pts, fill=GOLD if i == 2 else line, width=lw)
    elif kind == "Merch":
        w = r * 0.55
        draw.ellipse([cx - r, cy - w, cx - r + 2 * w, cy + w], outline=line, width=lw)
        draw.rectangle([cx - w, cy - w, cx + w, cy + w], outline=GOLD, width=lw)
        draw.polygon([(cx + r - 2 * w, cy + w), (cx + r, cy + w), (cx + r - w, cy - w)], outline=line, width=lw)
    elif kind in ("Album", "Song", "Video"):
        bars = 23
        for i in range(bars):
            x = cx - r + i * (2 * r / (bars - 1))
            h = r * (0.18 + 0.8 * abs(math.sin(i * 0.55) * math.cos(i * 0.21)))
            draw.line([x, cy - h, x, cy + h], fill=GOLD if i == 11 else line, width=lw * 2)
    else:
        for i in range(9):
            y = cy - r + i * r / 4
            draw.line([cx - r, y, cx + r, y], fill=GOLD if i == 4 else line, width=lw)


def title_card(title, eyebrow, kind, out, size=(1200, 690)):
    W, H = size[0] * S, size[1] * S
    img = Image.new("RGB", (W, H), CHAR)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    pad = 72 * S
    motif(d, kind, int(W * 0.79), int(H * 0.5), int(H * 0.3))
    glyph(d, pad, pad, 40 * S, 5 * S)
    spaced(d, (pad, 168 * S), eyebrow.upper(), font(17, 600, 14), GOLD, 0.22)
    size_pt = 78
    while True:
        f = font(size_pt, 600, 32)
        lines = wrap(d, title, f, int(W * 0.56))
        if len(lines) <= 3 or size_pt <= 48:
            break
        size_pt -= 6
    y = 214 * S
    for ln in lines:
        d.text((pad, y), ln, font=f, fill=WHITE)
        y += int(size_pt * 1.12 * S)
    d.rectangle([pad, H - 118 * S, pad + 64 * S, H - 116 * S], fill=GOLD)
    spaced(d, (pad, H - 98 * S), "ARCHETYPAL ARCHITECT", font(14, 500, 14), (255, 255, 255, 150), 0.24)
    img.paste(layer, (0, 0), layer)
    img = img.resize(size, Image.LANCZOS)
    save(img, out)


def save(img, out):
    os.makedirs(os.path.dirname(out), exist_ok=True)
    if out.endswith(".webp"):
        img.save(out, "WEBP", quality=82, method=6)
    elif out.endswith(".png"):
        img.convert("P", palette=Image.ADAPTIVE, colors=128).save(out, optimize=True)
    else:
        img.convert("RGB").save(out, "JPEG", quality=84, optimize=True, progressive=True)


def placeholder_cover(title_lines, series, out, size=(938, 1500)):
    W, H = size[0] * S, size[1] * S
    img = Image.new("RGB", (W, H), CHAR)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    m = 56 * S
    d.rectangle([m, m, W - m, H - m], outline=GOLD, width=2 * S)
    gs = 90 * S
    glyph(d, (W - gs) // 2, 230 * S, gs, 10 * S)
    y = 520 * S
    for ln in title_lines:
        f = font(104, 600, 32)
        tw = d.textlength(ln, font=f)
        d.text(((W - tw) / 2, y), ln, font=f, fill=WHITE)
        y += 124 * S
    f = font(22, 600, 14)
    label = series.upper()
    tw = sum(d.textlength(c, font=f) + f.size * 0.24 for c in label)
    spaced(d, ((W - tw) / 2, y + 40 * S), label, f, GOLD, 0.24)
    for i, txt in enumerate(["COMING SOON TO AMAZON"]):
        f = font(20, 500, 14)
        tw = sum(d.textlength(c, font=f) + f.size * 0.24 for c in txt)
        spaced(d, ((W - tw) / 2, H - 330 * S), txt, f, (255, 255, 255, 170), 0.24)
    f = font(26, 600, 14)
    txt = "ARCHETYPAL ARCHITECT"
    tw = sum(d.textlength(c, font=f) + f.size * 0.24 for c in txt)
    spaced(d, ((W - tw) / 2, H - 220 * S), txt, f, WHITE, 0.24)
    img.paste(layer, (0, 0), layer)
    save(img.resize(size, Image.LANCZOS), out)


def share_card(headline, sub, out, cover=None, size=(1200, 630)):
    W, H = size[0] * S, size[1] * S
    img = Image.new("RGB", (W, H), CHAR)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    pad = 80 * S
    glyph(d, pad, pad, 44 * S, 5 * S)
    f = font(66, 600, 32)
    y = 200 * S
    for ln in wrap(d, headline, f, int(W * (0.55 if cover else 0.8))):
        d.text((pad, y), ln, font=f, fill=WHITE)
        y += 78 * S
    spaced(d, (pad, y + 26 * S), sub.upper(), font(18, 600, 14), GOLD, 0.22)
    d.rectangle([pad, H - 110 * S, pad + 64 * S, H - 108 * S], fill=GOLD)
    spaced(d, (pad, H - 90 * S), "ARCHETYPAL ARCHITECT", font(15, 500, 14), (255, 255, 255, 150), 0.24)
    img.paste(layer, (0, 0), layer)
    if cover:
        c = Image.open(cover).convert("RGB")
        ch = H - 2 * 70 * S
        c = c.resize((int(c.width * ch / c.height), ch), Image.LANCZOS)
        img.paste(c, (W - c.width - 90 * S, 70 * S))
    save(img.resize(size, Image.LANCZOS), out)


BOOK_COVERS = {
    "the-gentle-shadow": "/images/books/the-gentle-shadow.jpg",
    "the-gentle-shadow-series": "/images/books/the-gentle-shadow.jpg",
    "the-weight-of-memory": "/images/books/the-weight-of-memory.jpg",
    "my-evolution-system": "/images/books/fall-from-space.jpg",
    "graysons-game": "/images/works/graysons-game-webnovel.jpg",
    "make-anxiety-your-superpower": "/images/works/make-anxiety-your-superpower.jpg",
    "emotional-misinterpretation-dictionary": "/images/works/emotional-misinterpretation-dictionary.jpg",
}

if __name__ == "__main__":
    entries = []
    for p in ("src/data/projects.json", "src/data/wiki-expansion.json"):
        entries += json.load(open(p))
    for e in entries:
        if e.get("visibility") == "Adult" or e.get("maturity") == "Adult":
            continue
        if e["id"] in BOOK_COVERS:
            continue
        label = {"Imprint": "Imprint", "Atlas": "Atlas", "Album": "Music"}.get(e["kind"], e["kind"])
        title_card(e["title"], label, e["kind"], f"public/images/cards/{e['id']}.webp")
    placeholder_cover(["The", "Thousandfold", "Gate"], "Book One", "public/images/books/the-thousandfold-gate.jpg")
    share_card("Beautifully strange stories.", "Books · Music · Objects", "public/images/share/archetypal-architect.jpg")
    share_card("Rowan's Honey Cakes", "A reader bonus from The Gentle Shadow", "public/images/share/rowans-honey-cakes.png", cover="public/images/books/the-gentle-shadow.jpg")
    print("rendered")
