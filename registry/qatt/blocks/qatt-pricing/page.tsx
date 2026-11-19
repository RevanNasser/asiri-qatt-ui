import { QattPricing } from "@/registry/qatt/blocks/qatt-pricing/qatt-pricing"

// Plan names, features and labels from Heritage copy (blocks.qatt-pricing.*); prices are fictional samples.
export default function QattPricingPage() {
  return (
    <QattPricing
      title="خططٌ تناسب كلّ مرحلة"
      subtitle="ابدأوا مجانًا، وانتقلوا إلى خطةٍ أكبر حين تحتاجون. والأسعار هنا افتراضية للعرض."
      currency="ر.س"
      freeLabel="مجانًا"
      includedLabel="مشمول"
      notIncludedLabel="غير مشمول"
      period={{
        label: "فترة الفوترة",
        monthly: "شهريًا",
        yearly: "سنويًا",
        yearlyHint: "وفّروا شهرين",
        perMonth: "في الشهر",
        perYear: "في السنة",
      }}
      plans={[
        {
          name: "البداية",
          price: 0,
          description: "للأفراد ومن يجرّب أوّل مرة.",
          features: ["مشروعٌ واحد", "حتى 3 أعضاء", "مساحة تخزين 1 غيغابايت", "دعمٌ عبر البريد الإلكتروني"],
          cta: { label: "ابدأ مجانًا", href: "#" },
        },
        {
          name: "النموّ",
          price: { monthly: 99, yearly: 990 },
          description: "للفرق الصغيرة التي تتوسّع.",
          features: ["مشاريع غير محدودة", "حتى 20 عضوًا", "مساحة تخزين 50 غيغابايت", "تقارير متقدّمة", "دعمٌ ذو أولوية"],
          cta: { label: "اختر هذه الخطة", href: "#" },
          highlighted: true,
          badge: "الأكثر اختيارًا",
        },
        {
          name: "المؤسسات",
          price: "حسب الطلب",
          description: "للمؤسسات ذات الاحتياجات الخاصة.",
          features: [
            "كلّ ما في خطة النموّ",
            "أعضاءٌ بلا حدّ",
            "تسجيل دخولٍ موحّد (SSO)",
            "مدير حسابٍ مخصّص",
            "اتفاقية مستوى الخدمة",
          ],
          cta: { label: "تواصل معنا", href: "#" },
        },
      ]}
    />
  )
}
