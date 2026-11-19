#!/usr/bin/env python3
"""Generate Qatt motif SVG masters + motifs.json + preview.html.
Geometry follows docs/agents/heritage/motif-catalog.md (project interpretation), with seam fixes noted.
Usage: python3 motifs.py <ux-ui dir> <scratch dir>
"""
import json, os, sys

FALLBACK = {1: "#A8322A", 2: "#1F1B17", 3: "#D9A42B", 4: "transparent"}
def S(n): return f"var(--qatt-slot-{n}, {FALLBACK[n]})"
def ground(w, h): return f'<rect width="{w}" height="{h}" fill="{S(4)}"/>'

M = []
def motif(id, ar, en, w, h, repeat, slots, default, uses, body, *, traditional=True, mirror=True,
          variants=(), note="", extension=False):
    M.append(dict(id=id, arabicName=ar, englishName=en, traditionalName=traditional, width=w, height=h,
                  repeat=repeat, slots=slots, defaultSlots=default, mirror=mirror, flipInRtl=False,
                  projectExtension=extension, aboutVocabulary=traditional and not extension,
                  uses=uses, markup=ground(w, h) + body, variants=[
                      dict(id=v[0], width=v[1], height=v[2], slots=v[3], markup=ground(v[1], v[2]) + v[4])
                      for v in variants], note=note))

# 1 kaff — base band
motif("kaff", "الكَفّ", "Base band", 8, 32, "x", 2, ["red", "ink"], ["band", "border"],
      f'<rect y="8" width="8" height="24" fill="{S(1)}"/><rect y="2" width="8" height="3" fill="{S(2)}"/>')

# 2 qatt-lines — stacked strokes A,B,C,A,B
order = [1, 2, 3, 1, 2]
motif("qatt-lines", "القَطّ", "Stacked strokes", 8, 40, "x", 3, ["red", "yellow", "ink"], ["band", "border"],
      "".join(f'<rect y="{y}" width="8" height="4" fill="{S(s)}"/>' for y, s in zip(range(0, 40, 8), order)))

# 3 mathalith-makhamis — 3 (default) / 5 thin lines
motif("mathalith-makhamis", "المثالث والمخامس", "Triple / quintuple lines", 8, 16, "x", 1, ["ink"],
      ["band", "border"],
      "".join(f'<rect y="{y}" width="8" height="2" fill="{S(1)}"/>' for y in (3, 7, 11)),
      variants=[("5", 8, 24, 1, "".join(f'<rect y="{y}" width="8" height="2" fill="{S(1)}"/>' for y in (3, 7, 11, 15, 19)))])

# 4 rukun — triangle row
motif("rukun", "الرُّكون", "Triangle row", 48, 24, "x", 2, ["red", "ink"], ["band", "border"],
      f'<path d="M0 24 12 0l12 24z" fill="{S(1)}"/><path d="M24 24 36 0l12 24z" fill="{S(2)}"/>')

# 5 banat — small triangles with sprigs
motif("banat", "البَنات", "Small triangles with sprigs", 16, 24, "x", 2, ["red", "green"], ["band", "border"],
      f'<path d="M2 24 8 12l6 12z" fill="{S(1)}"/>'
      f'<path d="M8 12V4M8 8 5 5m3 3 3-3" fill="none" stroke="{S(2)}" stroke-width="1.5" stroke-linecap="round"/>',
      note="D-021: the sprig stays plant-like (slot-2 green or yellow). Never add a dot or head above it; "
           "never describe, stylise or animate it as a figure.")

# 6 balsanah — rhombus chain
motif("balsanah", "البَلْسَنة", "Rhombus chain", 24, 24, "xy", 2, ["blue", "yellow"], ["band", "background"],
      f'<path d="M12 0 24 12 12 24 0 12z" fill="{S(1)}"/><path d="M12 6l6 6-6 6-6-6z" fill="{S(2)}"/>')

# 7 amshat — comb teeth (form inferred from the word; see catalog)
motif("amshat", "الأمشاط", "Comb teeth", 8, 24, "x", 1, ["ink"], ["band", "border"],
      f'<path d="M0 0h8v4H5.5v16h-3V4H0z" fill="{S(1)}"/>',
      variants=[("alternate", 16, 24, 2,
                 f'<path d="M0 0h16v4H0z" fill="{S(1)}"/><path d="M2.5 4h3v16h-3z" fill="{S(1)}"/>'
                 f'<path d="M10.5 4h3v16h-3z" fill="{S(2)}"/>')],
      note="Comb form is inferred from the name + 'parallel lines' definition; no source drawing.")

# 8 taadheeq — triangle with three-point crown
motif("taadheeq", "التَّعذيق", "Triangle with three-point crown", 24, 32, "x", 2, ["red", "yellow"], ["band", "corner"],
      f'<path d="M2 32 12 12l10 20z" fill="{S(1)}"/>'
      f'<g fill="{S(2)}"><path d="M12 12V3m0 9L6 5m6 7 6-7" fill="none" stroke="{S(2)}" stroke-width="2" stroke-linecap="round"/>'
      f'<circle cx="12" cy="3" r="1.6"/><circle cx="6" cy="5" r="1.6"/><circle cx="18" cy="5" r="1.6"/></g>')

# 9 mahareeb — niche arches
motif("mahareeb", "المَحاريب", "Niche arches", 24, 32, "x", 2, ["ink", "yellow"], ["band", "border", "corner"],
      f'<path d="M2 32V14L12 2l10 12v18z" fill="{S(1)}"/><path d="M6 32V16l6-7.5 6 7.5v16z" fill="{S(2)}"/>')

# 10 sankroli — nested niche outlines
motif("sankroli", "سَنكرولي", "Nested niches", 24, 32, "x", 3, ["red", "ink", "yellow"], ["band", "background"],
      f'<g fill="none" stroke-width="2"><path d="M2 32V14L12 2l10 12v18" stroke="{S(1)}"/>'
      f'<path d="M6 32V16l6-8 6 8v16" stroke="{S(2)}"/><path d="M10 32V18l2-3 2 3v14" stroke="{S(3)}"/></g>')

# 11 shabakah — single-colour grid; lattice drawn as an X extended past the tile so crossings are seamless
motif("shabakah", "الشَّبَكة", "Single-colour grid", 16, 16, "xy", 1, ["ink"], ["background"],
      f'<path d="M0 0h8v8H0zm8 8h8v8H8z" fill="{S(1)}"/>',
      variants=[("lattice", 16, 16, 1,
                 f'<path d="M-2-2 18 18M18-2-2 18" fill="none" stroke="{S(1)}" stroke-width="1.5"/>')],
      note="Lattice: diagonals run past the tile corners so the clipped strokes meet without gaps.")

# 12 hanash — zigzag (default) / wave; strokes extended one period beyond the tile for seamless joins
motif("hanash", "الحَنَش", "Serpentine zigzag", 12, 12, "x", 1, ["red"], ["band", "border"],
      f'<path d="M-6 2l6 8 6-8 6 8 6-8" fill="none" stroke="{S(1)}" stroke-width="2.5" stroke-linejoin="miter"/>',
      variants=[("wave", 24, 12, 1,
                 f'<path d="M-12 6Q-6 12 0 6T12 6 24 6 36 6" fill="none" stroke="{S(1)}" stroke-width="2.5"/>')])

# 13 khatmah — closing square (single, not repeated)
motif("khatmah", "الخَتْمة", "Closing square", 24, 24, "none", 3, ["ink", "red", "yellow"], ["corner", "cap"],
      f'<path d="M0 0h24v24H0zm3 3v18h18V3z" fill="{S(1)}" fill-rule="evenodd"/>'
      f'<path d="M12 5l7 7-7 7-7-7z" fill="{S(2)}"/><path d="M10 10h4v4h-4z" fill="{S(3)}"/>')

# 14 sawtooth — NOT a traditional term; never mirrors (D-007)
motif("sawtooth", "المنشار", "Sawtooth (descriptive)", 24, 24, "x", 1, ["ink"], ["band"],
      f'<path d="M0 24 24 0v24z" fill="{S(1)}"/>', traditional=False, mirror=False,
      variants=[("alternate", 48, 24, 2, f'<path d="M0 24 24 0v24z" fill="{S(1)}"/><path d="M24 24 48 0v24z" fill="{S(2)}"/>')],
      note="Descriptive name, not a traditional term; excluded from About vocabulary chips. Directional: render identically in LTR and RTL (D-007).")

# 15 stepped — NOT documented in Al-Qatt; project extension echoing Asir's terraces
motif("stepped", "المدرّج", "Stepped (descriptive)", 24, 24, "x", 1, ["red"], ["band"],
      f'<path d="M0 24v-4h4v-4h4v-4h2V8h4v4h2v4h4v4h4v4z" fill="{S(1)}"/>', traditional=False,
      note="Project extension (terraces), not documented in Al-Qatt sources. Always show docs.patterns.extensionLabel; never in About vocabulary chips; never styled as a wall band beside traditional bands (D-020).", extension=True)

def svg(w, h, inner):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
            f'aria-hidden="true" focusable="false">{inner}</svg>\n')

def main(ux, scratch):
    mdir = os.path.join(ux, "motifs"); os.makedirs(mdir, exist_ok=True)
    for m in M:
        m["file"] = f"motifs/{m['id']}.svg"
        open(os.path.join(mdir, f"{m['id']}.svg"), "w").write(svg(m["width"], m["height"], m["markup"]))
        for v in m["variants"]:
            v["file"] = f"motifs/{m['id']}-{v['id']}.svg"
            open(os.path.join(mdir, f"{m['id']}-{v['id']}.svg"), "w").write(svg(v["width"], v["height"], v["markup"]))
    manifest = {
        "$comment": "Qatt UI motif masters. Geometry = project interpretation (motif-catalog.md). "
                    "markup is the SVG inner content for a tile with viewBox 0 0 width height. "
                    "Colours: var(--qatt-slot-1..4); slot-1/2/3 = catalog A/B/C, slot-4 = ground. "
                    "mirror = mirror-safe (identical under horizontal reflection). flipInRtl is false for every motif.",
        "version": 1,
        "slotFallbacks": {f"--qatt-slot-{k}": v for k, v in FALLBACK.items()},
        "motifs": M,
    }
    open(os.path.join(ux, "motifs.json"), "w").write(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")

    # preview: each tile repeated in a band, light + dark slots, plus mirrored copy
    rows = []
    for m in M:
        for vid, w, h, inner in [("", m["width"], m["height"], m["markup"])] + [
                (v["id"], v["width"], v["height"], v["markup"]) for v in m["variants"]]:
            pid = (m["id"] + "-" + vid).strip("-")
            reps = "1" if m["repeat"] == "none" else ""
            bw = w if reps else 192
            bh = h * (3 if m["repeat"] == "xy" else 1)
            band = (f'<svg width="{bw*2}" height="{bh*2}" viewBox="0 0 {bw} {bh}"><defs><pattern id="p-{pid}-ID" width="{w}" height="{h}" '
                    f'patternUnits="userSpaceOnUse">{inner}</pattern></defs><rect width="{bw}" height="{bh}" fill="url(#p-{pid}-ID)"/></svg>')
            rows.append(f'<div class="row"><code>{pid} {"(mirror-safe)" if m["mirror"] else "(NOT mirror-safe)"}</code>'
                        f'<div class="light">{band.replace("ID","l")}</div><div class="dark">{band.replace("ID","d")}</div>'
                        f'<div class="light flip">{band.replace("ID","f")}</div></div>')
    html = f"""<!doctype html><meta charset=utf-8><style>
body{{font:12px monospace;background:#ccc;margin:8px}}
.row{{display:flex;gap:8px;align-items:center;margin:4px 0}} code{{width:220px}}
.light{{background:#F9F5ED;padding:4px;--qatt-slot-1:#A8322A;--qatt-slot-2:#1F1B17;--qatt-slot-3:#D9A42B}}
.dark{{background:#17110E;padding:4px;--qatt-slot-1:#D15D4B;--qatt-slot-2:#DDD7C9;--qatt-slot-3:#E7B551}}
.flip svg{{transform:scaleX(-1)}}
</style>{''.join(rows)}"""
    open(os.path.join(scratch, "preview.html"), "w").write(html)
    print(len(M), "motifs;", sum(len(m["variants"]) for m in M), "variants")

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
