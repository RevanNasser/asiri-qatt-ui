import { DoorOpenIcon, HeadsetIcon, LayoutGridIcon } from "lucide-react"

import { MajlisWelcome } from "@/registry/qatt/blocks/majlis-welcome/majlis-welcome"
import { QattPattern } from "@/registry/qatt/ui/qatt-pattern"

// Sample content from Heritage copy (blocks.majlis-welcome.*); replace with yours.
export default function MajlisWelcomePage() {
  return (
    <MajlisWelcome
      eyebrow="حيّاكم"
      title="أهلًا بكم، البيت بيتكم"
      body="في بيوت عسير، يحظى مجلس الضيوف بعنايةٍ خاصة، فتزيّن المرأة جدرانه بالقطّ وتدعو قريباتها ليشاركنها الرسم، فيلقى الضيفَ جدارٌ صُنع بالمودّة. على هذا المعنى أعددنا لكم هذه المساحة: مكانٌ يستقبلكم بالترحاب، ويضع بين أيديكم ما تحتاجونه في يسرٍ وهدوء."
      points={[
        {
          title: "تبدأون في دقائق",
          body: "لا إعداد معقّدًا ولا خطوات زائدة، فالمكان مهيّأٌ قبل وصولكم.",
          icon: <DoorOpenIcon />,
        },
        {
          title: "كلّ شيءٍ في متناولكم",
          body: "ما تحتاجونه حاضرٌ قريب، مرتّبٌ في مكانه، فلا تبحثون عنه طويلًا.",
          icon: <LayoutGridIcon />,
        },
        {
          title: "نحن قريبون منكم",
          body: "فريق الدعم يجيبكم بالعربية، ويتابع معكم حتى تُقضى حاجتكم.",
          icon: <HeadsetIcon />,
        },
      ]}
      cta={{ label: "تفضّلوا بالدخول", href: "#" }}
      note="الزخرفة مستوحاة من القطّ العسيري، فنّ نساء عسير في تزيين الجدران الداخلية للبيوت."
      media={
        <QattPattern
          preset="full"
          scale="sm"
          surface="gypsum"
          className="size-full"
          role="img"
          aria-label="جدارٌ مزخرف بأشرطةٍ ومثلثاتٍ مستوحاة من القطّ العسيري"
        />
      }
    />
  )
}
