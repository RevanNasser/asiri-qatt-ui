#!/usr/bin/env python3
"""Qatt UI tokens: OKLCH source of truth -> tokens.css + WCAG contrast table.
Usage: python3 tokens.py <out_dir>
"""
import math, sys, os

# ---------- colour math (OKLCH -> OKLab -> linear sRGB -> sRGB) ----------
def oklch_to_lin(L, C, h):
    a = C * math.cos(math.radians(h)); b = C * math.sin(math.radians(h))
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    return r, g, bb

def enc(x):
    x = min(max(x, 0.0), 1.0)
    return 12.92 * x if x <= 0.0031308 else 1.055 * x ** (1 / 2.4) - 0.055
def dec(x):
    return x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4

def to_srgb(L, C, h):
    lin = oklch_to_lin(L, C, h)
    in_gamut = all(-1e-4 <= v <= 1 + 1e-4 for v in lin)
    return tuple(enc(v) for v in lin), in_gamut

def hex_of(rgb): return "#" + "".join(f"{round(v*255):02X}" for v in rgb)

def hex_to_oklch(hx):
    r, g, b = (dec(int(hx[i:i+2], 16) / 255) for i in (1, 3, 5))
    l = 0.4122214708*r + 0.5363325363*g + 0.0514459929*b
    m = 0.2119034982*r + 0.6806995451*g + 0.1073969566*b
    s = 0.0883024619*r + 0.2817188376*g + 0.6299787005*b
    l_, m_, s_ = (math.copysign(abs(v) ** (1/3), v) for v in (l, m, s))
    L = 0.2104542553*l_ + 0.7936177850*m_ - 0.0040720468*s_
    a = 1.9779984951*l_ - 2.4285922050*m_ + 0.4505937099*s_
    bb = 0.0259040371*l_ + 0.7827717662*m_ - 0.8086757660*s_
    C = math.hypot(a, bb); h = math.degrees(math.atan2(bb, a)) % 360
    return (round(L, 3), round(C, 3), round(h, 1))

def lum(rgb):
    r, g, b = (dec(v) for v in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def contrast(c1, c2):
    a, b = lum(c1), lum(c2)
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)

def mix(fg, bg, alpha):  # alpha-composite fg over bg in sRGB (what browsers do)
    return tuple(f * alpha + b * (1 - alpha) for f, b in zip(fg, bg))

# ---------- tokens ----------
GYPSUM = (0.972, 0.012, 85)
LIGHT = {
    "background": GYPSUM,
    "foreground": (0.22, 0.014, 55),
    "card": (0.99, 0.006, 85),
    "card-foreground": (0.22, 0.014, 55),
    "popover": (0.99, 0.006, 85),
    "popover-foreground": (0.22, 0.014, 55),
    "primary": (0.5, 0.163, 31),
    "primary-foreground": (0.985, 0.008, 85),
    "secondary": (0.925, 0.05, 88),
    "secondary-foreground": (0.27, 0.03, 60),
    "muted": (0.935, 0.014, 80),
    "muted-foreground": (0.47, 0.022, 60),
    "accent": (0.93, 0.028, 250),
    "accent-foreground": (0.33, 0.085, 255),
    "destructive": (0.5, 0.19, 18),
    "destructive-foreground": (0.985, 0.008, 85),
    "border": (0.875, 0.02, 75),
    "input": (0.6, 0.02, 65),
    "ring": (0.48, 0.12, 252),
    "chart-1": (0.5, 0.163, 31),
    "chart-2": (0.47, 0.11, 252),
    "chart-3": (0.62, 0.13, 75),
    "chart-4": (0.52, 0.11, 135),
    "chart-5": (0.6, 0.15, 48),
    "sidebar": (0.952, 0.015, 82),
    "sidebar-foreground": (0.22, 0.014, 55),
    "sidebar-primary": (0.5, 0.163, 31),
    "sidebar-primary-foreground": (0.985, 0.008, 85),
    "sidebar-accent": (0.915, 0.022, 80),
    "sidebar-accent-foreground": (0.22, 0.014, 55),
    "sidebar-border": (0.875, 0.02, 75),
    "sidebar-ring": (0.48, 0.12, 252),
}
DARK = {  # "night majlis": project interpretation, not a heritage claim
    "background": (0.185, 0.012, 55),
    "foreground": (0.93, 0.016, 85),
    "card": (0.22, 0.013, 55),
    "card-foreground": (0.93, 0.016, 85),
    "popover": (0.245, 0.014, 55),
    "popover-foreground": (0.93, 0.016, 85),
    "primary": (0.68, 0.15, 33),
    "primary-foreground": (0.17, 0.012, 55),
    "secondary": (0.3, 0.04, 75),
    "secondary-foreground": (0.93, 0.03, 85),
    "muted": (0.265, 0.012, 55),
    "muted-foreground": (0.74, 0.02, 75),
    "accent": (0.3, 0.045, 250),
    "accent-foreground": (0.91, 0.03, 250),
    "destructive": (0.7, 0.17, 20),
    "destructive-foreground": (0.17, 0.012, 55),
    "border": (0.32, 0.014, 60),
    "input": (0.53, 0.018, 65),
    "ring": (0.72, 0.11, 245),
    "chart-1": (0.68, 0.15, 33),
    "chart-2": (0.7, 0.1, 245),
    "chart-3": (0.8, 0.13, 82),
    "chart-4": (0.72, 0.12, 135),
    "chart-5": (0.74, 0.14, 55),
    "sidebar": (0.205, 0.013, 55),
    "sidebar-foreground": (0.93, 0.016, 85),
    "sidebar-primary": (0.68, 0.15, 33),
    "sidebar-primary-foreground": (0.17, 0.012, 55),
    "sidebar-accent": (0.28, 0.016, 55),
    "sidebar-accent-foreground": (0.93, 0.016, 85),
    "sidebar-border": (0.32, 0.014, 60),
    "sidebar-ring": (0.72, 0.11, 245),
}

# Traditional pigment evocations (motif slot colours). Light = catalog hex converted.
CATALOG_HEX = {"white": "#F4EFE4", "red": "#A8322A", "yellow": "#D9A42B", "black": "#1F1B17",
               "blue": "#2D5A8C", "green": "#4E7D3A", "orange": "#D2692A", "brown": "#9C7448"}
QATT_LIGHT = {k: hex_to_oklch(v) for k, v in CATALOG_HEX.items()}
QATT_DARK = {  # pigments seen by lamplight on a dark wall: lifted L, slightly reduced C
    "white": (0.88, 0.02, 85),
    "red": (0.62, 0.15, 31),
    "yellow": (0.8, 0.13, 82),
    "black": (0.36, 0.014, 55),   # soot must stay visible on a dark ground
    "blue": (0.62, 0.1, 250),
    "green": (0.66, 0.11, 135),
    "orange": (0.7, 0.14, 50),
    "brown": (0.64, 0.07, 70),
}

def fmt(t): L, C, h = t; return f"oklch({L:g} {C:g} {h:g})"

# ---------- pairs ----------
TEXT, LARGE, UI = 4.5, 3.0, 3.0
def pairs(T, Q, mode):
    P = [
        ("foreground", "background", TEXT, "body text"),
        ("foreground", "card", TEXT, "card text"),
        ("card-foreground", "card", TEXT, ""),
        ("popover-foreground", "popover", TEXT, ""),
        ("primary-foreground", "primary", TEXT, "filled button label"),
        ("primary", "background", TEXT, "link / outline text"),
        ("primary", "card", TEXT, "link on card"),
        ("secondary-foreground", "secondary", TEXT, ""),
        ("muted-foreground", "muted", TEXT, ""),
        ("muted-foreground", "background", TEXT, "captions"),
        ("muted-foreground", "card", TEXT, ""),
        ("muted-foreground", "sidebar", TEXT, ""),
        ("accent-foreground", "accent", TEXT, "hover/selected item"),
        ("foreground", "accent", TEXT, "fg on hover item"),
        ("destructive-foreground", "destructive", TEXT, "filled destructive"),
        ("destructive", "background", TEXT, "error text"),
        ("destructive", "card", TEXT, ""),
        ("destructive", "destructive/10 over background", TEXT, "shadcn v4 tinted destructive button"),
        ("foreground", "secondary", TEXT, ""),
        ("sidebar-foreground", "sidebar", TEXT, ""),
        ("sidebar-primary-foreground", "sidebar-primary", TEXT, ""),
        ("sidebar-accent-foreground", "sidebar-accent", TEXT, ""),
        ("ring", "background", UI, "focus ring (1.4.11 / 2.4.13)"),
        ("ring", "card", UI, ""),
        ("ring", "ring/50 over background", None, "info"),
        ("ring/50 over background", "background", UI, "WHY: shadcn default ring-ring/50 is too faint; Qatt uses solid ring + 2px offset"),
        ("sidebar-ring", "sidebar", UI, ""),
        ("input", "background", UI, "input/checkbox boundary"),
        ("input", "card", UI, ""),
        ("primary", "background", UI, "filled button shape vs page"),
        ("chart-1", "card", UI, "chart mark"),
        ("chart-2", "card", UI, ""),
        ("chart-3", "card", UI, ""),
        ("chart-4", "card", UI, ""),
        ("chart-5", "card", UI, ""),
        ("border", "background", None, "decorative only (not relied on)"),
    ]
    return P

def resolve(name, T, Q):
    if name == "qatt-ink":
        return to_srgb(*Q["white" if T is DARK else "black"])[0]
    if name.startswith("qatt-"):
        return to_srgb(*Q[name[5:]])[0]
    if name == "ring/50 over background":
        return mix(to_srgb(*T["ring"])[0], to_srgb(*T["background"])[0], 0.5)
    if name == "destructive/10 over background":
        return mix(to_srgb(*T["destructive"])[0], to_srgb(*T["background"])[0], 0.10 if T is LIGHT else 0.2)
    return to_srgb(*T[name])[0]

QATT_PAIRS = [
    # (fg, bg, threshold, note)  — which pigments can carry text
    ("qatt-red", "background", TEXT, ""),
    ("qatt-black", "background", TEXT, ""),
    ("qatt-blue", "background", TEXT, ""),
    ("qatt-green", "background", TEXT, ""),
    ("qatt-brown", "background", TEXT, ""),
    ("qatt-yellow", "background", TEXT, ""),
    ("qatt-orange", "background", TEXT, ""),
    ("qatt-white", "qatt-red", TEXT, "label on red paint"),
    ("qatt-white", "qatt-blue", TEXT, "label on blue paint"),
    ("qatt-white", "qatt-green", TEXT, "label on green paint"),
    ("qatt-black", "qatt-yellow", TEXT, "label on yellow paint"),
    ("qatt-black", "qatt-orange", TEXT, "label on orange paint"),
    ("qatt-white", "qatt-black", TEXT, ""),
    ("qatt-ink", "background", TEXT, "ink = qatt-black in light"),
    ("foreground", "qatt-white", TEXT, "gypsum surface (D-019), both modes"),
    ("muted-foreground", "qatt-white", TEXT, "gypsum surface caption"),
    ("primary", "qatt-white", TEXT, "gypsum surface link"),
    ("ring", "qatt-white", UI, "gypsum surface focus"),
    ("input", "qatt-white", UI, "gypsum surface control boundary"),
]
QATT_PAIRS_DARK = [
    ("qatt-red", "background", TEXT, ""),
    ("qatt-yellow", "background", TEXT, ""),
    ("qatt-blue", "background", TEXT, ""),
    ("qatt-green", "background", TEXT, ""),
    ("qatt-orange", "background", TEXT, ""),
    ("qatt-white", "background", TEXT, ""),
    ("qatt-black", "background", None, "decorative: soot band on night wall"),
    ("qatt-ink", "background", UI, "ink = qatt-white in dark"),
    ("background", "qatt-yellow", TEXT, "dark label on yellow paint"),
    ("background", "qatt-red", TEXT, "dark label on red paint"),
    ("background", "qatt-white", TEXT, ""),
]

def verdict(cr, thr):
    if thr is None: return "decorative"
    if thr == UI: return "PASS (3:1)" if cr >= 3 else "FAIL"
    if cr >= 4.5: return "PASS AA"
    if cr >= 3: return "large only"
    return "FAIL"

def table(T, Q, mode, extra):
    rows = []
    for fg, bg, thr, note in pairs(T, Q, mode) + extra:
        c = contrast(resolve(fg, T, Q), resolve(bg, T, Q))
        rows.append((fg, bg, c, thr, verdict(c, thr), note))
    return rows

def main(out):
    fails = []
    md = []
    for mode, T, Q, extra in (("light", LIGHT, QATT_LIGHT, QATT_PAIRS), ("dark", DARK, QATT_DARK, QATT_PAIRS_DARK)):
        md.append(f"\n#### {mode}\n\n| foreground | background | ratio | need | result | note |\n|---|---|---:|---|---|---|")
        for fg, bg, c, thr, v, note in table(T, Q, mode, extra):
            need = "-" if thr is None else ("3:1" if thr == 3 else "4.5:1")
            md.append(f"| `{fg}` | `{bg}` | {c:.2f} | {need} | {v} | {note} |")
            if v == "FAIL" and not fg.startswith(("qatt-", "ring/50")):
                fails.append((mode, fg, bg, round(c, 2)))
    # gamut + hex reference
    md.append("\n#### sRGB hex reference (computed; for design tools only — CSS uses OKLCH)\n")
    md.append("| token | light | light hex | dark | dark hex |\n|---|---|---|---|---|")
    for k in LIGHT:
        (lr, lg), (dr, dg) = to_srgb(*LIGHT[k]), to_srgb(*DARK[k])
        flag = "" if lg and dg else " (gamut-clipped)"
        md.append(f"| `--{k}` | `{fmt(LIGHT[k])}` | `{hex_of(lr)}` | `{fmt(DARK[k])}` | `{hex_of(dr)}`{flag} |")
    for k in QATT_LIGHT:
        (lr, lg), (dr, dg) = to_srgb(*QATT_LIGHT[k]), to_srgb(*QATT_DARK[k])
        flag = "" if lg and dg else " (gamut-clipped)"
        md.append(f"| `--qatt-{k}` | `{fmt(QATT_LIGHT[k])}` | `{hex_of(lr)}` | `{fmt(QATT_DARK[k])}` | `{hex_of(dr)}`{flag} |")
    open(os.path.join(out, "contrast-table.md"), "w").write("\n".join(md) + "\n")

    # css
    def block(sel, T, Q, dark):
        lines = [f"{sel} {{"]
        if not dark: lines.append("  --radius: 0.375rem;")
        for k, v in T.items(): lines.append(f"  --{k}: {fmt(v)};")
        lines.append("  /* Qatt pigment evocations (approximate, project interpretation) */")
        for k, v in Q.items(): lines.append(f"  --qatt-{k}: {fmt(v)};")
        lines.append("  --qatt-jiss: var(--qatt-white);")
        lines.append("  /* role: structural line colour — charcoal on the day wall, lamplit gypsum on the night wall */")
        lines.append("  --qatt-ink: " + ("var(--qatt-white)" if dark else "var(--qatt-black)") + ";")
        lines.append("  --shadow-painted: 0 3px 0 0 " + ("oklch(0 0 0 / 0.55)" if dark else "oklch(0.22 0.014 55 / 0.9)") + ";")
        lines.append("}")
        return "\n".join(lines)
    css = open(os.path.join(os.path.dirname(__file__), "tokens.head.css")).read()
    css += block(":root", LIGHT, QATT_LIGHT, False) + "\n\n" + block(".dark", DARK, QATT_DARK, True) + "\n"
    # D-019: heritage-presenting surfaces always show motifs on gypsum, in both modes
    g = ["", "/* Gypsum surface (D-019): heritage-presenting sections (About bands, vocabulary chips, theme",
         " * 'faithful' swatch row) render on jiss in BOTH modes. Scope with data-qatt-surface=\"gypsum\"",
         " * (qatt-pattern surface=\"gypsum\"). Re-declares the light pigments + ink so motifs inside keep",
         " * their day-wall colours under .dark, and resets shadcn tokens to light (a light-theme island). Text inside uses --qatt-surface-gypsum-foreground. */",
         ":root,\n.dark {",
         f"  --qatt-surface-gypsum: {fmt(QATT_LIGHT['white'])};",
         f"  --qatt-surface-gypsum-foreground: {fmt(LIGHT['foreground'])};",
         f"  --qatt-surface-gypsum-muted-foreground: {fmt(LIGHT['muted-foreground'])};",
         "}",
         '[data-qatt-surface="gypsum"] {']
    g.append("  /* a light-theme island: shadcn tokens back to light so controls inside stay AA */")
    for k, v in LIGHT.items(): g.append(f"  --{k}: {fmt(v)};")
    for k, v in QATT_LIGHT.items(): g.append(f"  --qatt-{k}: {fmt(v)};")
    g += ["  --qatt-ink: var(--qatt-black);",
          "  --qatt-slot-1: var(--qatt-red);", "  --qatt-slot-2: var(--qatt-ink);",
          "  --qatt-slot-3: var(--qatt-yellow);", "  --qatt-slot-4: transparent;",
          "  background-color: var(--qatt-surface-gypsum);",
          "  color: var(--qatt-surface-gypsum-foreground);",
          "  color-scheme: light;", "}", ""]
    css += "\n".join(g)
    css += open(os.path.join(os.path.dirname(__file__), "tokens.tail.css")).read()
    open(os.path.join(out, "tokens.css"), "w").write(css)

    print("\n".join(md))
    print("\nNON-QATT FAILS:", fails or "none")
    for k in QATT_LIGHT: print(k, CATALOG_HEX[k], fmt(QATT_LIGHT[k]))

if __name__ == "__main__":
    main(sys.argv[1])
