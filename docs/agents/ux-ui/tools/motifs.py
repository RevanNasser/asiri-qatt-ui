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
      # Phase 4 revision (heritage phase4-review D1): two branch pairs, so a lone tile reads as a plant, never a figure.
      f'<path d="M8 12V4M8 9.5 5.5 7M8 9.5 10.5 7M8 7 6 5M8 7 10 5" fill="none" stroke="{S(2)}" stroke-width="1.25" stroke-linecap="round"/>',
      note="D-021: the sprig stays plant-like (slot-2 green or yellow), two branch pairs (phase4-review D1). Never add a dot or head above it; "
           "never describe, stylise or animate it as a figure; never render a lone tile with one branch pair (badge shows at least two tiles).")

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

# 9 mahareeb — horizontal broken wave lines (AACIA 2024, pp. 293, 296)
motif("mahareeb", "المَحاريب", "Horizontal wave lines", 48, 20, "x", 3, ["red", "yellow", "blue"], ["band", "border"],
      f'<g fill="none" stroke-width="2.6" stroke-linejoin="miter">'
      f'<path d="M0 4 6 10 12 4 18 10 24 4 30 10 36 4 42 10 48 4" stroke="{S(1)}"/>'
      f'<path d="M0 10 6 16 12 10 18 16 24 10 30 16 36 10 42 16 48 10" stroke="{S(2)}"/>'
      f'<path d="M0 0 6 6 12 0 18 6 24 0 30 6 36 0 42 6 48 0" stroke="{S(3)}"/></g>',
      mirror=False, note="AACIA 2024 pp. 293, 296 illustrates mahareeb as stacked horizontal broken wave lines, not arches.")

# 10 sankroli — parallel vertical chevrons, usually facing right (AACIA 2024, pp. 293, 296)
motif("sankroli", "سَنكرولي", "Parallel vertical chevrons", 36, 32, "x", 3, ["red", "ink", "yellow"], ["band", "background"],
      f'<g fill="none" stroke-width="3" stroke-linejoin="miter"><path d="M5 0 14 8 5 16 14 24 5 32" stroke="{S(1)}"/>'
      f'<path d="M16 0 25 8 16 16 25 24 16 32" stroke="{S(2)}"/><path d="M27 0 36 8 27 16 36 24 27 32" stroke="{S(3)}"/></g>',
      mirror=False, note="AACIA 2024 pp. 293, 296 illustrates sankroli as parallel vertical broken lines, usually facing right. It does not mirror in RTL.")

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
