import { GaugeIcon, LanguagesIcon, PlugIcon, ShieldCheckIcon, ChartColumnIcon, UsersIcon } from "lucide-react"

import { QattFeatureGrid } from "@/registry/qatt/blocks/qatt-feature-grid/qatt-feature-grid"

// Sample content from Heritage copy (blocks.qatt-feature-grid.*); replace with yours.
export default function QattFeatureGridPage() {
  return (
    <QattFeatureGrid
      title="مزايا صُمّمت لعملكم"
      subtitle="كلّ ميزةٍ هنا لها غايةٌ واضحة، لا زينةً فحسب."
      moreLabel="اعرف المزيد"
      features={[
        {
          title: "سريعٌ بطبعه",
          body: "صفحاتٌ خفيفة تُفتح في لحظتها، حتى على الاتصالات البطيئة.",
          icon: <GaugeIcon />,
          href: "#",
        },
        {
          title: "بياناتكم في أمان",
          body: "تشفيرٌ أثناء النقل والتخزين، وصلاحياتٌ دقيقة لكلّ عضوٍ في الفريق.",
          icon: <ShieldCheckIcon />,
        },
        {
          title: "عملٌ جماعي سلس",
          body: "شاركوا الملفات وعلّقوا عليها وتابعوا تغييراتها معًا في الوقت نفسه.",
          icon: <UsersIcon />,
        },
        {
          title: "تقاريرُ تفهمونها",
          body: "أرقامٌ واضحة ورسومٌ بيانية تجيب عن أسئلتكم دون عناء.",
          icon: <ChartColumnIcon />,
        },
        {
          title: "عربيٌّ من الأساس",
          body: "واجهةٌ من اليمين إلى اليسار، وتواريخ وأرقام تُعرض كما تألفونها.",
          icon: <LanguagesIcon />,
        },
        {
          title: "يتكامل مع أدواتكم",
          body: "اربطوه بالخدمات التي تستعملونها كلّ يوم، في خطواتٍ قليلة.",
          icon: <PlugIcon />,
        },
      ]}
    />
  )
}
