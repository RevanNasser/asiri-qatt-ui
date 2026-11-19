import { QattDivider } from "@/registry/qatt/ui/qatt-divider"

export default function QattDividerDemo() {
  return (
    <div className="w-full">
      <QattDivider />
      <QattDivider className="text-foreground" />
    </div>
  )
}
