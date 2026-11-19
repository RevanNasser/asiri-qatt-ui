import { QattCta } from "@/registry/qatt/blocks/qatt-cta/qatt-cta"

// Sample content from Heritage copy (blocks.qatt-cta.*).
export default function QattCtaPage() {
  return (
    <QattCta
      title="الباب مفتوح، تفضّلوا"
      body="ابدأوا اليوم مجانًا، وانضمّوا إلى فرقٍ تعمل بهدوءٍ ووضوح."
      primary={{ label: "ابدأ مجانًا", href: "#" }}
      secondary={{ label: "تحدّث إلى فريقنا", href: "#" }}
    />
  )
}
