import { Qatt404 } from "@/registry/qatt/blocks/qatt-404/qatt-404"
import { buttonVariants } from "@/registry/qatt/ui/button"

// Sample content from Heritage copy (blocks.qatt-404.*).
export default function Qatt404Page() {
  return (
    <Qatt404
      title="الصفحة غير موجودة"
      body="حتى في جبال عسير قد يضلّ السائر دربه بين المدرّجات. ربما نُقلت هذه الصفحة أو تغيّر رابطها، والطريق إلى الرئيسية قريب."
      homeLabel="العودة إلى الرئيسية"
      extra={
        <a href="#" className={buttonVariants({ variant: "qatt-outline", size: "lg" })}>
          ابحث في الموقع
        </a>
      }
    />
  )
}
