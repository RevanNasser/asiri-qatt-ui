/**
 * UI strings. Arabic text is copied verbatim from docs/agents/heritage/site-copy.ar.md
 * (keys match that file). Never write new Arabic copy here; ask the Heritage agent.
 */
export const ar = {
  "nav.brand": "قَطّ",
  "nav.docs": "التوثيق",
  "nav.components": "المكوّنات",
  "nav.search.placeholder": "ابحث في التوثيق…",
  "nav.theme.light": "الوضع الفاتح",
  "nav.theme.dark": "الوضع الداكن",
  "nav.theme.system": "حسب النظام",
  "nav.theme": "السمة",
  "nav.menu.open": "افتح القائمة",
  "nav.menu.close": "أغلق القائمة",
  "nav.skip": "تخطَّ إلى المحتوى",
  "nav.onThisPage": "في هذه الصفحة",
  "nav.editPage": "حرِّر هذه الصفحة",
  "nav.prev": "السابق",
  "nav.next": "التالي",
  "home.hero.eyebrow": "سجلّ مكوّنات مفتوح المصدر لـ shadcn/ui",
  "home.hero.title": "واجهاتٌ عربية بروح القطّ العسيري",
  "home.hero.subtitle":
    "مكوّناتٌ وكتلٌ جاهزة تُكتب من اليمين إلى اليسار أولًا، ونقوشٌ أصيلة الإلهام مستوحاة من فنّ نساء عسير في تزيين جدران المجالس.",
  "home.hero.cta.primary": "ابدأ الآن",
  "home.hero.cta.secondary": "تصفّح المكوّنات",
  "home.hero.install.label": "ثبِّت السمة بأمرٍ واحد",
  "docs.tab.preview": "معاينة",
  "docs.tab.code": "الشيفرة",
  "docs.props.name": "الخاصية",
  "docs.props.type": "النوع",
  "docs.props.default": "الافتراضي",
  "docs.props.description": "الوصف",
  "docs.copy": "نسخ",
  "docs.copied": "تم النسخ",
  "docs.install.cli": "سطر الأوامر",
  "empty.search.title": "لم نجد ما تبحثون عنه",
  "error.404.title": "الصفحة غير موجودة",
  "error.404.cta": "العودة إلى الرئيسية",
  "seo.home.title": "قَطّ — مكوّنات عربية لـ shadcn/ui مستوحاة من القط العسيري",
  "seo.home.description":
    "سجلّ مكوّنات وكتل مفتوح المصدر لـ shadcn/ui، عربيٌّ أولًا ومن اليمين إلى اليسار، بنقوشٍ أصيلة مستوحاة من فن القط العسيري.",
} as const

export type CopyKey = keyof typeof ar

export function t(key: CopyKey): string {
  return ar[key]
}
