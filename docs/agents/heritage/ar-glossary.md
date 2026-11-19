# المسرد العربي — Qatt UI (قَطّ)

This glossary is written in Modern Standard Arabic. Its tone is warm without overdoing it, close to the language of Asiri hospitality: "حيّاكم"، "مرحبًا بكم"، "على الرحب".
The identifier (`id`) stays in English as-is in code and commands. The display name and description are for the interface and the docs.

## (أ) أسماء عناصر السجل

### الهوية والزخرفة

| id | الاسم المعروض | وصف بسطر واحد |
|---|---|---|
| `qatt-theme` | سمة قَطّ | ألوانٌ مستوحاة من أصباغ عسير الطبيعية على أرضيّة الجصّ الأبيض، بوضعَين فاتح وداكن. |
| `qatt-pattern` | نقش قَطّ | خلفيةٌ زخرفية متكرّرة من أشرطةٍ ومثلثاتٍ ومعيّنات، مستلهمة من مفردات القطّ العسيري. |
| `qatt-border` | إطار مُزخرف | حدٌّ زخرفي يحيط بالعناصر، بمثلثاته وخطوطه المتوازية. |
| `qatt-divider` | فاصل قَطّ | شريطٌ أفقي يفصل بين الأقسام كما يقسم «القطّ» جدار المجلس. |
| `qatt-frame` | إطار القوس | إطارٌ على هيئة قوسٍ يحتضن الصور والمحتوى. |
| `qatt-corner` | زاوية الختمة | زخرفةٌ مربّعة توضع في الزوايا والأطراف، على هيئة «الختمة» التي تُختم بها اللوحة. |

### المكوّنات الأساسية

| id | الاسم المعروض | وصف بسطر واحد |
|---|---|---|
| `button` | زر | زرٌّ بأحجامٍ وأنماطٍ متعدّدة، يستجيب للمسة واللوحة والفأرة. |
| `badge` | شارة | وسمٌ صغير يُبرز حالةً أو تصنيفًا بلمحةٍ واحدة. |
| `card` | بطاقة | حاويةٌ أنيقة تجمع العنوان والمحتوى والإجراءات في مكانٍ واحد. |
| `tabs` | تبويبات | تنقّلٌ بين أقسامٍ متجاورة دون مغادرة الصفحة. |
| `dialog` | نافذة حوار | نافذةٌ تعلو الصفحة لتأكيد إجراءٍ أو إدخال بيانات. |
| `sheet` | لوحة جانبية | لوحةٌ تنزلق من طرف الشاشة وتحترم اتجاه القراءة. |
| `accordion` | أكورديون | أقسامٌ قابلة للطيّ والبسط، تُظهر ما تحتاجه حين تحتاجه. |
| `input` | حقل إدخال | حقلٌ نصّي واضح يدعم الكتابة من اليمين إلى اليسار. |
| `select` | قائمة اختيار | قائمةٌ منسدلة لاختيار قيمةٍ من بين خيارات. |
| `sonner` | إشعار منبثق | تنبيهٌ قصير يظهر برفق ثم يمضي، ليُخبرك بما تمّ. |
| `tooltip` | تلميح | نصٌّ موجز يظهر عند المرور أو التركيز ليوضّح ما خفي. |
| `breadcrumb` | مسار التنقّل | يُريك موضعك في الموقع ويعيدك إلى ما سبق بخطوة. |
| `pagination` | ترقيم الصفحات | تنقّلٌ بين صفحات المحتوى الطويل. |
| `avatar` | صورة رمزية | صورة المستخدم أو أحرفه الأولى في دائرةٍ أنيقة. |
| `separator` | فاصل | خطٌّ رفيع يفصل بين العناصر أفقيًا أو عموديًا. |

### الكتل (Blocks)

| id | الاسم المعروض | وصف بسطر واحد |
|---|---|---|
| `qatt-hero` | الواجهة الرئيسية | واجهةٌ افتتاحية بعنوانٍ بارز وشريطٍ زخرفي ودعوةٍ إلى البدء. |
| `majlis-welcome` | ترحيب المجلس | قسم ترحيبٍ دافئ يستقبل الزائر كما يُستقبل الضيف في المجلس. |
| `qatt-feature-grid` | شبكة المزايا | عرضٌ منظّم للمزايا في شبكةٍ من البطاقات بأيقوناتها. |
| `qatt-stats` | الأرقام والإحصاءات | أرقامٌ بارزة تحكي الإنجاز بإيجاز. |
| `qatt-testimonials` | آراء العملاء | شهاداتٌ واقتباسات ممّن جرّبوا وأحبّوا. |
| `qatt-pricing` | جدول الأسعار | خطط الأسعار جنبًا إلى جنب مع إبراز الخطة المقترحة. |
| `qatt-cta` | دعوة إلى العمل | شريطٌ ختامي يدعو الزائر إلى الخطوة التالية. |
| `qatt-footer` | تذييل الصفحة | تذييلٌ بالروابط وحقوق النشر وشريط «الكفّ» الزخرفي. |
| `qatt-login` | تسجيل الدخول | نموذج دخولٍ مرحِّب بلوحةٍ زخرفية جانبية. |
| `qatt-404` | صفحة غير موجودة | صفحة خطأ 404 لطيفة تعيد الزائر إلى الطريق. |

### الأدوات المساعدة

| id | الاسم المعروض | وصف بسطر واحد |
|---|---|---|
| `qatt-utils` | أدوات قَطّ | دوالّ مساعدة لدمج الأصناف وتنسيق الأرقام والتواريخ بالعربية. |
| `use-direction` | خطّاف الاتجاه | خطّافٌ يكشف اتجاه الصفحة (يمين/يسار) لتتكيّف المكوّنات معه. |

> **Note on `qatt-frame`:** D-006 settled the name as «إطار القوس». «المحاريب» is still used, with its source, as the name of the traditional *motif*; it is never the name of a UI component.

## (ب) مصطلحات الواجهة الموحّدة

| English | العربية | Note |
|---|---|---|
| Button | زر | |
| Card | بطاقة | |
| Dialog | نافذة حوار | |
| Tabs | تبويبات | Singular: تبويب |
| Sheet | لوحة جانبية | |
| Tooltip | تلميح | |
| Toast / Notification | إشعار | |
| Component | مكوّن | Plural: مكوّنات |
| Block | كتلة | Plural: كُتَل |
| Pattern (decorative) | نقش | Plural: نقوش. Use «نمط» for a code/design pattern |
| Theme | سمة | |
| Registry | سجلّ المكوّنات | |
| Preview | معاينة | |
| Code | الشيفرة | Not «الكود» in formal copy |
| Installation | التثبيت | |
| Install | ثبِّت | Imperative in buttons |
| Usage | الاستخدام | |
| Examples | أمثلة | |
| Props / Properties | الخصائص | |
| Default value | القيمة الافتراضية | |
| Type | النوع | |
| Required | مطلوب | |
| Optional | اختياري | |
| Variant | نمط | e.g. «نمط ثانوي» |
| Size | الحجم | |
| Copy | نسخ | |
| Copied | تم النسخ | |
| Copy code | انسخ الشيفرة | |
| Light mode | الوضع الفاتح | |
| Dark mode | الوضع الداكن | |
| System | حسب النظام | |
| Toggle theme | بدّل السمة | |
| Right-to-left (RTL) | من اليمين إلى اليسار | Abbreviation in tables: RTL |
| Left-to-right (LTR) | من اليسار إلى اليمين | |
| Direction | الاتجاه | |
| Documentation | التوثيق | |
| Getting started | البدء | |
| Introduction | مقدّمة | |
| Search | بحث | |
| Search docs… | ابحث في التوثيق… | |
| No results | لا توجد نتائج | |
| Menu | القائمة | |
| Close | إغلاق | |
| Open | فتح | |
| Cancel | إلغاء | |
| Confirm | تأكيد | |
| Save | حفظ | |
| Submit | إرسال | |
| Continue | متابعة | |
| Back | رجوع | |
| Next | التالي | |
| Previous | السابق | |
| Home | الرئيسية | |
| Loading… | جارٍ التحميل… | Write «جارٍ» with tanween |
| Error | خطأ | |
| Try again | أعد المحاولة | |
| Accessibility | سهولة الوصول | |
| Keyboard | لوحة المفاتيح | |
| Customization | التخصيص | |
| Colors | الألوان | |
| Typography | الخطوط الطباعية | D-022: avoids confusion with painted lines (الخطوط) |
| Spacing | المسافات | |
| Dependencies | الاعتماديات | |
| Command | الأمر | |
| Terminal | الطرفية | |
| Source | المصدر | |
| Sources | المصادر | |
| Open source | مفتوح المصدر | |
| License | الترخيص | |
| Contribute | ساهِم | |
| Changelog | سجلّ التغييرات | |
| View on GitHub | اعرضه على GitHub | Keep brand names in Latin script |
| Inspired by | مستوحى من | |
| On this page | في هذه الصفحة | |
| Edit this page | حرِّر هذه الصفحة | |
| Email | البريد الإلكتروني | |
| Password | كلمة المرور | |
| Sign in | تسجيل الدخول | |
| Sign up | إنشاء حساب | |

**Style rules:**
- Address the reader in the plural masculine-neutral form in long copy («ثبِّتوا»). Buttons use the short singular imperative («انسخ»، «ثبِّت»).
- Use the Arabic comma «،» and the Arabic question mark «؟». Do not add a space before them.
- Keep brand and technical names (shadcn/ui, Tailwind, React, npm) in Latin script, and isolate them with `<bdi>` or `dir="ltr"` inside RTL text.
- Do not stack diacritics. Add them only where they prevent ambiguity («قَطّ»، «القطّاطة»).

## (ج) اصطلاح الأرقام

**Recommendation: use Western digits (0-9) as the default throughout the interface and the code**, with an option to show Arabic-Indic digits (٠-٩) in decorative copy and in the `qatt-stats` block via a `numerals` setting.

**Why:**
1. **Code and commands.** Version numbers, sizes, commands (`npx shadcn add …`) and CSS values must be copyable and correct. Arabic-Indic digits break copying and running them.
2. **Local practice.** Government and commercial sites and apps in Saudi Arabia increasingly use Western digits in their Arabic interfaces, and both systems are familiar to the Saudi reader. *(This is an observation from the project team and is not backed by a cited statistical source.)*
3. **Consistency.** One system across the site avoids mixing «٤٠٤» on one page with «404» on another.
4. **Accessibility and search.** Screen readers and search engines handle Western digits more consistently in mixed-language content.

**Implementation:** `Intl.NumberFormat('ar-SA-u-nu-latn')` for the default and `ar-SA-u-nu-arab` for the optional mode. Note that `ar-SA` without an extension may produce Arabic-Indic digits in some environments, so always pin the `nu` extension.
