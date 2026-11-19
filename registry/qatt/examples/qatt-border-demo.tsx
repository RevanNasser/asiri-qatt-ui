import { QattBorder } from "@/registry/qatt/ui/qatt-border"

export default function QattBorderDemo() {
  return (
    <div className="grid w-full max-w-xl gap-6">
      <QattBorder side="block" caps className="rounded-md bg-card px-6 text-center">
        <p className="font-heading text-xl">قَطّ</p>
      </QattBorder>
      <QattBorder side="all" motif="mathalith-makhamis" thickness="sm" className="rounded-md bg-card text-center">
        <p>المكوّنات</p>
      </QattBorder>
    </div>
  )
}
