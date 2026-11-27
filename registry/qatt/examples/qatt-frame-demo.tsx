import { QattFrame } from "@/registry/qatt/ui/qatt-frame"

export default function QattFrameDemo() {
  return (
    <div className="grid w-full max-w-xl gap-8 sm:grid-cols-2">
      <QattFrame caption="إطارٌ هادئ بخطوط الجدار">
        <div className="size-full bg-qatt-jiss" />
      </QattFrame>
      <QattFrame base="mathalith-makhamis" caption="شريطٌ سفلي حين يحتاجه التكوين">
        <div className="size-full bg-qatt-jiss" />
      </QattFrame>
    </div>
  )
}
