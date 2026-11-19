import { QattHero } from "@/registry/qatt/blocks/qatt-hero/qatt-hero"
import { QattPattern } from "@/registry/qatt/ui/qatt-pattern"

// Sample content from Heritage copy (blocks.qatt-hero.*); fictional, replace with yours.
export default function QattHeroPage() {
  return (
    <QattHero
      eyebrow="جديد: الإصدار 2.0"
      title="ابنوا منتجكم على أساسٍ متين"
      subtitle="أدواتٌ واضحة تنظّم عملكم وتختصر وقتكم، من الفكرة الأولى حتى يوم الإطلاق."
      primaryCta={{ label: "ابدأ مجانًا", href: "#" }}
      secondaryCta={{ label: "شاهد العرض", href: "#" }}
      install={{
        label: "ثبِّت بأمرٍ واحد",
        command: "pnpm dlx shadcn@latest add @qatt/qatt-theme",
        copyLabel: "انسخ الأمر",
        copiedLabel: "تم النسخ",
      }}
      align="start"
      media={
        // Placeholder for your product image (decorative until you replace it with a real <img alt="…" />).
        <QattPattern motif="balsanah" className="size-full" />
      }
      animate
    />
  )
}
