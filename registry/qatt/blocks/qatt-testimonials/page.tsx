import { QattTestimonials } from "@/registry/qatt/blocks/qatt-testimonials/qatt-testimonials"

// Fictional names and quotes from Heritage copy (blocks.qatt-testimonials.*); never publish as real.
export default function QattTestimonialsPage() {
  return (
    <QattTestimonials
      title="ماذا يقول من جرّبوه"
      avatarAlt="صورة {name}"
      note="أسماءٌ وآراء مختلَقة لأغراض العرض، لا تخصّ أشخاصًا حقيقيين."
      items={[
        {
          quote: "«انتقلنا إليه في أسبوعٍ واحد، ولم نحتج إلى الدعم إلا مرة. والواجهة العربية فيه طبيعيةٌ بلا تكلّف.»",
          name: "نورة (اسمٌ افتراضي)",
          role: "مديرة منتج، شركة مثال",
        },
        {
          quote: "«أخيرًا أدواتٌ تحترم الاتجاه من اليمين إلى اليسار دون ترقيع. وفّرت علينا أيامًا من التعديل.»",
          name: "فهد (اسمٌ افتراضي)",
          role: "مطوّر واجهات، استوديو نموذج",
        },
        {
          quote: "«فريقي كلّه يستعمله كلّ يوم، حتى من لا يحبّ الأدوات الجديدة.»",
          name: "هند (اسمٌ افتراضي)",
          role: "مؤسِّسة، متجر تجريبي",
        },
      ]}
    />
  )
}
