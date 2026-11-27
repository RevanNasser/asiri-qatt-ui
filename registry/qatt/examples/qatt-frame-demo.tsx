import { QattFrame } from "@/registry/qatt/ui/qatt-frame"
import { QattPattern } from "@/registry/qatt/ui/qatt-pattern"

export default function QattFrameDemo() {
  return (
    <div className="grid w-full max-w-xl gap-8 sm:grid-cols-2">
      <QattFrame caption="إطارٌ هادئ بخطوط الجدار">
        <QattPattern motif="balsanah" className="size-full" />
      </QattFrame>
      <QattFrame base="mathalith-makhamis" caption="شريطٌ سفلي حين يحتاجه التكوين">
        <QattPattern motif="mahareeb" scale="sm" className="size-full" />
      </QattFrame>
    </div>
  )
}
