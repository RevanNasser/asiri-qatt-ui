import { QattDivider } from "@/registry/qatt/ui/qatt-divider"

export default function QattDividerDemo() {
  return (
    <div className="w-full max-w-xl">
      <QattDivider />
      <QattDivider motif="hanash" />
      <QattDivider motif="rukun" thickness="md" label="المكوّنات" />
      <QattDivider motif="kaff" thickness="md" animate />
    </div>
  )
}
