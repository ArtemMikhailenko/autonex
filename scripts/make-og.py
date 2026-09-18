#!/usr/bin/env python3
"""Compose public/og.jpg — the 1200x630 social share card.

Re-run after changing the hero photo or the headline:
    python3 scripts/make-og.py
Brand fonts are pulled from Google Fonts so nothing heavy lives in the repo.
"""
import pathlib, urllib.request
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE = pathlib.Path("/tmp")
FONTS = {
    "display": "https://github.com/google/fonts/raw/main/ofl/unbounded/Unbounded%5Bwght%5D.ttf",
    "sans": "https://github.com/google/fonts/raw/main/ofl/manrope/Manrope%5Bwght%5D.ttf",
}

W, H = 1200, 630
BRAND = (79, 139, 255)
INK = (255, 255, 255)
MUTED = (176, 194, 224)

HEADLINE = ["Доставка авто", "з США та Європи", "під ключ"]
HIGHLIGHT = 2  # index of the line painted in brand blue
SUBLINE = "Від аукціону до ваших дверей · 12+ країн · від 8 днів"


def font(kind: str, size: int, weight: int) -> ImageFont.FreeTypeFont:
    path = CACHE / f"og-{kind}.ttf"
    if not path.exists():
        urllib.request.urlretrieve(FONTS[kind], path)
    f = ImageFont.truetype(str(path), size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


def build() -> None:
    hero = Image.open(ROOT / "public/images/hero-bg.webp").convert("RGB")
    sw, sh = hero.size
    ratio = W / H
    if sw / sh > ratio:  # too wide: trim the sides
        nw = int(sh * ratio)
        box = ((sw - nw) // 2, 0, (sw - nw) // 2 + nw, sh)
    else:  # too tall: trim top/bottom, biased to keep the truck and globe
        nh = int(sw / ratio)
        top = int((sh - nh) * 0.42)
        box = (0, top, sw, top + nh)
    card = hero.crop(box).resize((W, H), Image.LANCZOS).convert("RGBA")

    # lift the left side only — the truck on the right stays untouched
    scrim = Image.new("RGBA", (W, H))
    px = scrim.load()
    for x in range(W):
        a = int(min(248, max(0, 250 * (1 - (x / W) / 0.78))))
        for y in range(H):
            px[x, y] = (5, 8, 16, a)
    card = Image.alpha_composite(card, scrim)

    logo = Image.open(ROOT / "public/images/logo-full.webp").convert("RGBA")
    lw = 196
    logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
    card.alpha_composite(logo, (64, 52))

    d = ImageDraw.Draw(card)
    head = font("display", 52, 640)
    sub = font("sans", 25, 500)

    y = 258
    for i, line in enumerate(HEADLINE):
        d.text((64, y), line, font=head, fill=BRAND if i == HIGHLIGHT else INK)
        y += 70

    y += 22
    d.line([(66, y), (66 + 52, y)], fill=BRAND, width=3)
    d.text((64, y + 22), SUBLINE, font=sub, fill=MUTED)

    out = ROOT / "public/og.jpg"
    card.convert("RGB").save(out, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"{out.relative_to(ROOT)}  {W}x{H}  {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    build()
