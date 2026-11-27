import { QattCorner } from "@/registry/qatt/ui/qatt-corner"

export default function QattCornerDemo() {
  return (
    <div className="relative grid h-40 w-full max-w-sm place-items-center rounded-md border-2 border-qatt-ink bg-card">
      <QattCorner position="start-start" />
      <QattCorner position="start-end" motif="taadheeq" />
      <QattCorner position="end-start" motif="taadheeq" />
      <QattCorner position="end-end" size="lg" />
      <p>زاوية الختمة</p>
    </div>
  )
}
