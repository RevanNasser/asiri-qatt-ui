import { QattFrame } from "@/registry/qatt/ui/qatt-frame"
import { QattPattern } from "@/registry/qatt/ui/qatt-pattern"

export default function QattFrameDemo() {
  return (
    <div className="grid w-full max-w-xl grid-cols-3 gap-6">
      <QattFrame>
        <QattPattern motif="balsanah" className="size-full" />
      </QattFrame>
      <QattFrame shape="round" outline={3}>
        <QattPattern motif="sankroli" scale="sm" className="size-full" />
      </QattFrame>
      <QattFrame
        shape="stepped"
        outline={1}
        base="mathalith-makhamis"
        caps={false}
        caption="المدرّج: إضافةٌ من المشروع، غير موثّقة في القطّ العسيري"
      >
        <QattPattern motif="shabakah" className="size-full" />
      </QattFrame>
    </div>
  )
}
