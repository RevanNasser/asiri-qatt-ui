import {
  MOTIF_IDS,
  MOTIFS,
  getMotifTile,
  motifToDataUri,
  resolveColor,
  slotStyle,
} from "@/registry/qatt/lib/qatt-utils"

describe("motif registry (generated from motifs.json)", () => {
  it("has the 15 catalog motifs with their variants", () => {
    expect(MOTIF_IDS).toHaveLength(15)
    expect(MOTIFS.hanash.variants.map((v) => v.id)).toEqual(["wave"])
    expect(getMotifTile("shabakah", "lattice").markup).not.toBe(MOTIFS.shabakah.markup)
    expect(getMotifTile("kaff", "wave")).toBe(MOTIFS.kaff) // unknown variant -> base tile
  })

  it("never flips in RTL; sawtooth is the only non mirror-safe motif; stepped is a project extension", () => {
    for (const id of MOTIF_IDS) expect(MOTIFS[id].flipInRtl).toBe(false)
    expect(MOTIF_IDS.filter((id) => !MOTIFS[id].mirror)).toEqual(["sawtooth"])
    expect(MOTIF_IDS.filter((id) => MOTIFS[id].projectExtension)).toEqual(["stepped"])
  })

  it("paints only through the four slot variables", () => {
    for (const id of MOTIF_IDS) {
      for (const tile of [MOTIFS[id], ...MOTIFS[id].variants]) {
        const colours = tile.markup.match(/(fill|stroke)="([^"]+)"/g) ?? []
        for (const c of colours) expect(c).toMatch(/="(none|var\(--qatt-slot-[1-4], [^)]+\))"/)
      }
    }
  })

  it("resolves colours and slots", () => {
    expect(resolveColor("red")).toBe("var(--qatt-red)")
    expect(resolveColor("#fff")).toBe("#fff")
    expect(slotStyle("kaff")).toEqual({ "--qatt-slot-1": "var(--qatt-red)", "--qatt-slot-2": "var(--qatt-ink)" })
    expect(slotStyle("kaff", ["blue"], "jiss")).toEqual({
      "--qatt-slot-1": "var(--qatt-blue)",
      "--qatt-slot-4": "var(--qatt-jiss)",
    })
  })

  it("builds data URIs with resolved colours (no CSS vars)", () => {
    const uri = decodeURIComponent(motifToDataUri("hanash", ["#000"], undefined, { rotate: 90 }))
    expect(uri).not.toContain("var(")
    expect(uri).toContain('stroke="#000"')
    expect(uri).toContain('width="12" height="12"')
  })
})
