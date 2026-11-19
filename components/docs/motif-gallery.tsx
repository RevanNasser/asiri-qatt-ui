import { t, type CopyKey } from "@/lib/site-copy"
import { MOTIF_IDS, MOTIFS, type MotifId } from "@/registry/qatt/lib/qatt-motifs"
import { Badge } from "@/registry/qatt/ui/badge"
import { QattMotif, QattMotifTile } from "@/registry/qatt/ui/qatt-pattern"

const k = (key: string) => t(key as CopyKey)
const has = (key: string) => {
  try {
    return Boolean(t(key as CopyKey))
  } catch {
    return false
  }
}

function Preview({ id }: { id: MotifId }) {
  const m = MOTIFS[id]
  if (m.repeat === "none") return <QattMotifTile motif={id} className="size-16" />
  return (
    <div
      className="h-16 w-full overflow-hidden rounded-sm border"
      style={{ height: m.repeat === "xy" ? 64 : m.height * 1.5 }}
    >
      <QattMotif motif={id} scale={1.5} />
    </div>
  )
}

/** The motif catalogue for the patterns page (names and notes from Heritage copy, D-020/D-021 labels). */
export function MotifGallery() {
  return (
    <ul className="not-prose grid gap-6 sm:grid-cols-2">
      {MOTIF_IDS.map((id) => {
        const m = MOTIFS[id]
        return (
          <li key={id} className="flex flex-col gap-3 rounded-lg border bg-card p-4" data-motif={id}>
            <Preview id={id} />
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-heading text-lg font-semibold">{k(`docs.motifs.${id}.name`)}</h3>
              <code dir="ltr" className="text-xs text-muted-foreground">
                {id}
              </code>
            </div>
            <div className="flex flex-wrap gap-2">
              {m.projectExtension ? (
                <Badge variant="outline">{k("docs.patterns.extensionLabel")}</Badge>
              ) : m.traditionalName ? (
                <Badge variant="banat">{k("docs.motifs.traditionalLabel")}</Badge>
              ) : (
                <Badge variant="outline">{k("docs.patterns.descriptiveLabel")}</Badge>
              )}
            </div>
            <p className="text-sm">{k(`docs.motifs.${id}.desc`)}</p>
            {has(`docs.motifs.${id}.note`) && (
              <p className="text-sm text-muted-foreground">{k(`docs.motifs.${id}.note`)}</p>
            )}
            {m.variants.length > 0 && (
              <ul className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                {m.variants.map((v) => (
                  <li key={v.id}>
                    <code dir="ltr">{v.id}</code> · {k(`docs.motifs.variant.${v.id}`)}
                  </li>
                ))}
              </ul>
            )}
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 text-xs text-muted-foreground">
              <dt>{k("docs.motifs.slots")}</dt>
              <dd className="m-0 tabular-nums">{m.slots}</dd>
              <dt>{k("docs.motifs.defaultColors")}</dt>
              <dd className="m-0" dir="ltr">
                {m.defaultSlots.join(", ")}
              </dd>
            </dl>
          </li>
        )
      })}
    </ul>
  )
}
