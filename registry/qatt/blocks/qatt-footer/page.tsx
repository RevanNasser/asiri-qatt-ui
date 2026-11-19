import { QattFooter } from "@/registry/qatt/blocks/qatt-footer/qatt-footer"
import { fillTemplate } from "@/registry/qatt/lib/qatt-utils"

// Sample content from Heritage copy (blocks.qatt-footer.*); replace with yours.
export default function QattFooterPage() {
  const brand = "اسم منتجكم"
  return (
    <QattFooter
      brand={brand}
      tagline="أدواتٌ عربية لفرقٍ تعمل بوضوح."
      heritageNote="الزخرفة مستوحاة من القطّ العسيري، فنّ نساء عسير المُدرج في قائمة اليونسكو للتراث الثقافي غير المادي عام 2017."
      navLabel="روابط التذييل"
      externalLabel="(يُفتح في نافذةٍ جديدة)"
      columns={[
        {
          title: "المنتج",
          links: [
            { label: "المزايا", href: "#" },
            { label: "الأسعار", href: "#" },
            { label: "التحديثات", href: "#" },
            { label: "خارطة الطريق", href: "#" },
          ],
        },
        {
          title: "الشركة",
          links: [
            { label: "من نحن", href: "#" },
            { label: "الوظائف", href: "#" },
            { label: "المدوّنة", href: "#" },
            { label: "تواصل معنا", href: "#" },
          ],
        },
        {
          title: "المصادر",
          links: [
            { label: "التوثيق", href: "#" },
            { label: "مركز المساعدة", href: "#" },
            { label: "الأسئلة الشائعة", href: "#" },
            { label: "حالة الخدمة", href: "https://example.com", external: true },
          ],
        },
        {
          title: "الشؤون القانونية",
          links: [
            { label: "سياسة الخصوصية", href: "#" },
            { label: "شروط الاستخدام", href: "#" },
            { label: "ملفات تعريف الارتباط", href: "#" },
          ],
        },
      ]}
      bottom={<p>{fillTemplate("© {year} {brand}. جميع الحقوق محفوظة.", { year: new Date().getFullYear(), brand })}</p>}
    />
  )
}
