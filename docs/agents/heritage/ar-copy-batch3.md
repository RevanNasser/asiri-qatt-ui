# Arabic copy — batch 3 (ornaments + blocks): key index

The text lives in `site-copy.ar.md` and `site-copy.en.md` under "Batch 3", with the same keys in both.

- **Demo defaults** (`blocks.<id>.*`): pass these as the block's default props. All names, quotes, prices and figures are fictional samples.
- **Doc pages** (`docs.<id>.intro/usage/rtl/a11y`, plus `heritage`/`nameNote` where present): `intro` goes under the title. `usage` goes under `docs.section.usage`. `rtl` goes under `docs.section.rtl`. `a11y` goes under `docs.section.a11y`. Show `heritage` notes as a callout.
- **Prop rows** (`docs.props.<id>.<prop>`): one row per prop in component-specs.md. `docs.props.qatt-divider.decorative` and `.className` already exist from batch 2 and are not repeated here.
- **Motif labels** (`docs.motifs.<id>.name/desc[/note]`): use them in the motif pickers and the patterns page. For `stepped`, always show `docs.patterns.extensionLabel` (D-020). For `sawtooth`, show `docs.patterns.descriptiveLabel`. Always show the `banat` note (D-021) and the `amshat` note.
- `{x}` marks a placeholder.

| key | target |
|---|---|
| `docs.motifs.kaff.name` | motif picker / patterns page |
| `docs.motifs.kaff.desc` | motif picker / patterns page |
| `docs.motifs.qatt-lines.name` | motif picker / patterns page |
| `docs.motifs.qatt-lines.desc` | motif picker / patterns page |
| `docs.motifs.mathalith-makhamis.name` | motif picker / patterns page |
| `docs.motifs.mathalith-makhamis.desc` | motif picker / patterns page |
| `docs.motifs.rukun.name` | motif picker / patterns page |
| `docs.motifs.rukun.desc` | motif picker / patterns page |
| `docs.motifs.banat.name` | motif picker / patterns page |
| `docs.motifs.banat.desc` | motif picker / patterns page |
| `docs.motifs.banat.note` | motif picker / patterns page (always shown, D-021) |
| `docs.motifs.balsanah.name` | motif picker / patterns page |
| `docs.motifs.balsanah.desc` | motif picker / patterns page |
| `docs.motifs.amshat.name` | motif picker / patterns page |
| `docs.motifs.amshat.desc` | motif picker / patterns page |
| `docs.motifs.amshat.note` | motif picker / patterns page (always shown) |
| `docs.motifs.taadheeq.name` | motif picker / patterns page |
| `docs.motifs.taadheeq.desc` | motif picker / patterns page |
| `docs.motifs.mahareeb.name` | motif picker / patterns page |
| `docs.motifs.mahareeb.desc` | motif picker / patterns page |
| `docs.motifs.sankroli.name` | motif picker / patterns page |
| `docs.motifs.sankroli.desc` | motif picker / patterns page |
| `docs.motifs.shabakah.name` | motif picker / patterns page |
| `docs.motifs.shabakah.desc` | motif picker / patterns page |
| `docs.motifs.hanash.name` | motif picker / patterns page |
| `docs.motifs.hanash.desc` | motif picker / patterns page |
| `docs.motifs.khatmah.name` | motif picker / patterns page |
| `docs.motifs.khatmah.desc` | motif picker / patterns page |
| `docs.motifs.sawtooth.name` | motif picker / patterns page (with docs.patterns.descriptiveLabel) |
| `docs.motifs.sawtooth.desc` | motif picker / patterns page |
| `docs.motifs.stepped.name` | motif picker / patterns page (with docs.patterns.extensionLabel, D-020) |
| `docs.motifs.stepped.desc` | motif picker / patterns page |
| `docs.motifs.variant.5` | variant picker |
| `docs.motifs.variant.alternate` | variant picker |
| `docs.motifs.variant.lattice` | variant picker |
| `docs.motifs.variant.wave` | variant picker |
| `docs.motifs.traditionalLabel` | motif badge |
| `docs.motifs.slots` | motif card |
| `docs.motifs.defaultColors` | motif card |
| `docs.patterns.preset.full` | qatt-pattern preset label |
| `docs.patterns.preset.fullNote` | qatt-pattern preset caption |
| `docs.qatt-pattern.intro` | content/docs/components/qatt-pattern.mdx (intro) |
| `docs.qatt-pattern.usage` | content/docs/components/qatt-pattern.mdx (usage) |
| `docs.qatt-pattern.rtl` | content/docs/components/qatt-pattern.mdx (rtl) |
| `docs.qatt-pattern.a11y` | content/docs/components/qatt-pattern.mdx (a11y) |
| `docs.qatt-pattern.heritage` | content/docs/components/qatt-pattern.mdx (callout) |
| `docs.props.qatt-pattern.motif` | content/docs/components/qatt-pattern.mdx props: motif |
| `docs.props.qatt-pattern.variant` | props: variant |
| `docs.props.qatt-pattern.colors` | props: colors |
| `docs.props.qatt-pattern.ground` | props: ground |
| `docs.props.qatt-pattern.scale` | props: scale |
| `docs.props.qatt-pattern.opacity` | props: opacity |
| `docs.props.qatt-pattern.fade` | props: fade |
| `docs.props.qatt-pattern.as` | props: as |
| `docs.props.qatt-pattern.surface` | props: surface |
| `docs.props.qatt-pattern.preset` | props: preset |
| `docs.qatt-border.intro` | content/docs/components/qatt-border.mdx (intro) |
| `docs.qatt-border.usage` | content/docs/components/qatt-border.mdx (usage) |
| `docs.qatt-border.rtl` | content/docs/components/qatt-border.mdx (rtl) |
| `docs.qatt-border.a11y` | content/docs/components/qatt-border.mdx (a11y) |
| `docs.props.qatt-border.side` | props: side |
| `docs.props.qatt-border.motif` | props: motif |
| `docs.props.qatt-border.variant` | props: variant |
| `docs.props.qatt-border.colors` | props: colors |
| `docs.props.qatt-border.thickness` | props: thickness |
| `docs.props.qatt-border.caps` | props: caps |
| `docs.props.qatt-border.inset` | props: inset |
| `docs.props.qatt-border.animate` | props: animate |
| `docs.props.qatt-border.surface` | props: surface |
| `docs.qatt-divider.intro` | content/docs/components/qatt-divider.mdx (intro) |
| `docs.qatt-divider.usage` | content/docs/components/qatt-divider.mdx (usage) |
| `docs.qatt-divider.rtl` | content/docs/components/qatt-divider.mdx (rtl) |
| `docs.qatt-divider.a11y` | content/docs/components/qatt-divider.mdx (a11y) |
| `docs.props.qatt-divider.motif` | props: motif |
| `docs.props.qatt-divider.variant` | props: variant |
| `docs.props.qatt-divider.colors` | props: colors |
| `docs.props.qatt-divider.thickness` | props: thickness |
| `docs.props.qatt-divider.orientation` | props: orientation |
| `docs.props.qatt-divider.label` | props: label |
| `docs.props.qatt-divider.animate` | props: animate |
| `docs.props.qatt-divider.surface` | props: surface |
| `docs.qatt-frame.intro` | content/docs/components/qatt-frame.mdx (intro) |
| `docs.qatt-frame.nameNote` | content/docs/components/qatt-frame.mdx (callout) |
| `docs.qatt-frame.usage` | content/docs/components/qatt-frame.mdx (usage) |
| `docs.qatt-frame.rtl` | content/docs/components/qatt-frame.mdx (rtl) |
| `docs.qatt-frame.a11y` | content/docs/components/qatt-frame.mdx (a11y) |
| `docs.props.qatt-frame.shape` | props: shape |
| `docs.props.qatt-frame.outline` | props: outline |
| `docs.props.qatt-frame.colors` | props: colors |
| `docs.props.qatt-frame.base` | props: base |
| `docs.props.qatt-frame.caps` | props: caps |
| `docs.props.qatt-frame.ratio` | props: ratio |
| `docs.props.qatt-frame.caption` | props: caption |
| `docs.props.qatt-frame.animate` | props: animate |
| `docs.props.qatt-frame.surface` | props: surface |
| `docs.qatt-corner.intro` | content/docs/components/qatt-corner.mdx (intro) |
| `docs.qatt-corner.usage` | content/docs/components/qatt-corner.mdx (usage) |
| `docs.qatt-corner.rtl` | content/docs/components/qatt-corner.mdx (rtl) |
| `docs.qatt-corner.a11y` | content/docs/components/qatt-corner.mdx (a11y) |
| `docs.props.qatt-corner.position` | props: position |
| `docs.props.qatt-corner.motif` | props: motif |
| `docs.props.qatt-corner.colors` | props: colors |
| `docs.props.qatt-corner.size` | props: size |
| `docs.props.qatt-corner.offset` | props: offset |
| `blocks.sampleNote` | shown under every block preview |
| `blocks.qatt-hero.eyebrow` | qatt-hero eyebrow |
| `blocks.qatt-hero.title` | qatt-hero title (h1) |
| `blocks.qatt-hero.subtitle` | qatt-hero subtitle |
| `blocks.qatt-hero.primary` | qatt-hero primaryCta.label |
| `blocks.qatt-hero.secondary` | qatt-hero secondaryCta.label |
| `blocks.qatt-hero.install.label` | qatt-hero install.label |
| `blocks.qatt-hero.media.alt` | qatt-hero media alt |
| `blocks.majlis-welcome.eyebrow` | majlis-welcome eyebrow |
| `blocks.majlis-welcome.title` | majlis-welcome title |
| `blocks.majlis-welcome.body` | majlis-welcome body |
| `blocks.majlis-welcome.points.1.title` | majlis-welcome points[0].title |
| `blocks.majlis-welcome.points.1.body` | majlis-welcome points[0].body |
| `blocks.majlis-welcome.points.2.title` | majlis-welcome points[1].title |
| `blocks.majlis-welcome.points.2.body` | majlis-welcome points[1].body |
| `blocks.majlis-welcome.points.3.title` | majlis-welcome points[2].title |
| `blocks.majlis-welcome.points.3.body` | majlis-welcome points[2].body |
| `blocks.majlis-welcome.cta` | majlis-welcome cta.label |
| `blocks.majlis-welcome.note` | majlis-welcome small attribution line under the frieze |
| `blocks.majlis-welcome.media.alt` | majlis-welcome media alt (placeholder; describe your real image) |
| `blocks.qatt-feature-grid.title` | qatt-feature-grid title |
| `blocks.qatt-feature-grid.subtitle` | qatt-feature-grid subtitle |
| `blocks.qatt-feature-grid.f1.title` | features[0].title |
| `blocks.qatt-feature-grid.f1.body` | features[0].body |
| `blocks.qatt-feature-grid.f2.title` | features[1].title |
| `blocks.qatt-feature-grid.f2.body` | features[1].body |
| `blocks.qatt-feature-grid.f3.title` | features[2].title |
| `blocks.qatt-feature-grid.f3.body` | features[2].body |
| `blocks.qatt-feature-grid.f4.title` | features[3].title |
| `blocks.qatt-feature-grid.f4.body` | features[3].body |
| `blocks.qatt-feature-grid.f5.title` | features[4].title |
| `blocks.qatt-feature-grid.f5.body` | features[4].body |
| `blocks.qatt-feature-grid.f6.title` | features[5].title |
| `blocks.qatt-feature-grid.f6.body` | features[5].body |
| `blocks.qatt-feature-grid.more` | link text when a feature has href (visually hidden suffix optional) |
| `blocks.qatt-stats.title` | qatt-stats title |
| `blocks.qatt-stats.s1.label` | stats[0] value 12500, suffix + |
| `blocks.qatt-stats.s2.label` | stats[1] value 98, suffix % |
| `blocks.qatt-stats.s3.label` | stats[2] value 1200, suffix + |
| `blocks.qatt-stats.s4.label` | stats[3] value 99.9, suffix % |
| `blocks.qatt-stats.sampleNote` | qatt-stats caption under the row |
| `blocks.qatt-testimonials.title` | qatt-testimonials title |
| `blocks.qatt-testimonials.t1.quote` | items[0].quote |
| `blocks.qatt-testimonials.t1.name` | items[0].name |
| `blocks.qatt-testimonials.t1.role` | items[0].role |
| `blocks.qatt-testimonials.t2.quote` | items[1].quote |
| `blocks.qatt-testimonials.t2.name` | items[1].name |
| `blocks.qatt-testimonials.t2.role` | items[1].role |
| `blocks.qatt-testimonials.t3.quote` | items[2].quote |
| `blocks.qatt-testimonials.t3.name` | items[2].name |
| `blocks.qatt-testimonials.t3.role` | items[2].role |
| `blocks.qatt-testimonials.avatarAlt` | avatar alt template |
| `blocks.qatt-testimonials.sampleNote` | qatt-testimonials caption |
| `blocks.qatt-pricing.title` | qatt-pricing title |
| `blocks.qatt-pricing.subtitle` | qatt-pricing subtitle |
| `blocks.qatt-pricing.currency` | currency (after the number in Arabic: 99 ر.س) |
| `blocks.qatt-pricing.period.label` | period toggle aria-label |
| `blocks.qatt-pricing.period.monthly` | period.monthly |
| `blocks.qatt-pricing.period.yearly` | period.yearly |
| `blocks.qatt-pricing.period.yearlyHint` | badge next to yearly |
| `blocks.qatt-pricing.perMonth` | after price |
| `blocks.qatt-pricing.perYear` | after price (yearly) |
| `blocks.qatt-pricing.free` | price when 0 |
| `blocks.qatt-pricing.starter.name` | plans[0].name |
| `blocks.qatt-pricing.starter.description` | plans[0].description |
| `blocks.qatt-pricing.starter.f1` | plans[0].features |
| `blocks.qatt-pricing.starter.f2` | plans[0].features |
| `blocks.qatt-pricing.starter.f3` | plans[0].features |
| `blocks.qatt-pricing.starter.f4` | plans[0].features |
| `blocks.qatt-pricing.starter.cta` | plans[0].cta.label (price 0) |
| `blocks.qatt-pricing.growth.name` | plans[1].name (highlighted, price 99) |
| `blocks.qatt-pricing.growth.description` | plans[1].description |
| `blocks.qatt-pricing.growth.f1` | plans[1].features |
| `blocks.qatt-pricing.growth.f2` | plans[1].features |
| `blocks.qatt-pricing.growth.f3` | plans[1].features |
| `blocks.qatt-pricing.growth.f4` | plans[1].features |
| `blocks.qatt-pricing.growth.f5` | plans[1].features |
| `blocks.qatt-pricing.growth.cta` | plans[1].cta.label |
| `blocks.qatt-pricing.growth.badge` | plans[1].badge |
| `blocks.qatt-pricing.enterprise.name` | plans[2].name |
| `blocks.qatt-pricing.enterprise.price` | plans[2].price (string) |
| `blocks.qatt-pricing.enterprise.description` | plans[2].description |
| `blocks.qatt-pricing.enterprise.f1` | plans[2].features |
| `blocks.qatt-pricing.enterprise.f2` | plans[2].features |
| `blocks.qatt-pricing.enterprise.f3` | plans[2].features |
| `blocks.qatt-pricing.enterprise.f4` | plans[2].features |
| `blocks.qatt-pricing.enterprise.f5` | plans[2].features |
| `blocks.qatt-pricing.enterprise.cta` | plans[2].cta.label |
| `blocks.qatt-pricing.ctaAria` | accessible name of each plan button |
| `blocks.qatt-pricing.included` | sr-only beside check icon |
| `blocks.qatt-pricing.notIncluded` | sr-only beside dash icon |
| `blocks.qatt-cta.title` | qatt-cta title |
| `blocks.qatt-cta.body` | qatt-cta body |
| `blocks.qatt-cta.primary` | primary.label |
| `blocks.qatt-cta.secondary` | secondary.label |
| `blocks.qatt-footer.brand` | brand (placeholder) |
| `blocks.qatt-footer.tagline` | tagline |
| `blocks.qatt-footer.heritageNote` | heritageNote |
| `blocks.qatt-footer.nav` | nav aria-label |
| `blocks.qatt-footer.col.product` | columns[0].title |
| `blocks.qatt-footer.link.features` | columns[0] |
| `blocks.qatt-footer.link.pricing` | columns[0] |
| `blocks.qatt-footer.link.updates` | columns[0] |
| `blocks.qatt-footer.link.roadmap` | columns[0] |
| `blocks.qatt-footer.col.company` | columns[1].title |
| `blocks.qatt-footer.link.about` | columns[1] |
| `blocks.qatt-footer.link.careers` | columns[1] |
| `blocks.qatt-footer.link.blog` | columns[1] |
| `blocks.qatt-footer.link.contact` | columns[1] |
| `blocks.qatt-footer.col.resources` | columns[2].title |
| `blocks.qatt-footer.link.docs` | columns[2] |
| `blocks.qatt-footer.link.help` | columns[2] |
| `blocks.qatt-footer.link.faq` | columns[2] |
| `blocks.qatt-footer.link.status` | columns[2] |
| `blocks.qatt-footer.col.legal` | columns[3].title |
| `blocks.qatt-footer.link.privacy` | columns[3] |
| `blocks.qatt-footer.link.terms` | columns[3] |
| `blocks.qatt-footer.link.cookies` | columns[3] |
| `blocks.qatt-footer.copyright` | bottom |
| `blocks.qatt-footer.external` | sr-only after external links |
| `blocks.qatt-login.title` | title (h1/h2) |
| `blocks.qatt-login.description` | description |
| `blocks.qatt-login.email.label` | email label |
| `blocks.qatt-login.email.placeholder` | email placeholder (ltr) |
| `blocks.qatt-login.password.label` | password label |
| `blocks.qatt-login.password.show` | visibility toggle label (aria-pressed=false) |
| `blocks.qatt-login.password.hide` | visibility toggle label (aria-pressed=true) |
| `blocks.qatt-login.capsLock` | hint under password |
| `blocks.qatt-login.remember` | checkbox |
| `blocks.qatt-login.forgot` | forgotHref link |
| `blocks.qatt-login.submit` | submit button |
| `blocks.qatt-login.submitting` | submit loading state |
| `blocks.qatt-login.divider` | between form and providers |
| `blocks.qatt-login.provider` | providers[].label template |
| `blocks.qatt-login.noAccount` | before signUpHref |
| `blocks.qatt-login.signUp` | signUpHref link |
| `blocks.qatt-login.panel.title` | decorative panel heading |
| `blocks.qatt-login.panel.body` | decorative panel text |
| `blocks.qatt-login.error.email.required` | errors.email |
| `blocks.qatt-login.error.email.invalid` | errors.email |
| `blocks.qatt-login.error.password.required` | errors.password |
| `blocks.qatt-login.error.password.short` | errors.password (for {min} 3–10; use «{min} حرفًا» for 11+) |
| `blocks.qatt-login.error.summary` | form alert heading |
| `blocks.qatt-login.error.form.credentials` | errors.form (never say which field) |
| `blocks.qatt-login.error.form.network` | errors.form |
| `blocks.qatt-login.error.form.tooMany` | errors.form |
| `blocks.qatt-login.error.form.unknown` | errors.form |
| `blocks.qatt-login.success` | live-region announcement |
| `blocks.qatt-404.code` | code (bdi) |
| `blocks.qatt-404.title` | title (h1) |
| `blocks.qatt-404.body` | body |
| `blocks.qatt-404.home` | homeLabel |
| `blocks.qatt-404.search` | extra link |
| `blocks.qatt-404.back` | extra link |
| `blocks.qatt-404.report` | extra link |
| `docs.qatt-hero.intro` | content/docs/blocks/qatt-hero.mdx (intro) |
| `docs.qatt-hero.usage` | content/docs/blocks/qatt-hero.mdx (usage) |
| `docs.qatt-hero.rtl` | content/docs/blocks/qatt-hero.mdx (rtl) |
| `docs.qatt-hero.a11y` | content/docs/blocks/qatt-hero.mdx (a11y) |
| `docs.props.qatt-hero.eyebrow` | qatt-hero props: eyebrow |
| `docs.props.qatt-hero.title` | qatt-hero props: title |
| `docs.props.qatt-hero.subtitle` | qatt-hero props: subtitle |
| `docs.props.qatt-hero.primaryCta` | qatt-hero props: primaryCta |
| `docs.props.qatt-hero.secondaryCta` | qatt-hero props: secondaryCta |
| `docs.props.qatt-hero.install` | qatt-hero props: install |
| `docs.props.qatt-hero.motif` | qatt-hero props: motif |
| `docs.props.qatt-hero.align` | qatt-hero props: align |
| `docs.props.qatt-hero.media` | qatt-hero props: media |
| `docs.props.qatt-hero.animate` | qatt-hero props: animate |
| `docs.majlis-welcome.intro` | content/docs/blocks/majlis-welcome.mdx (intro) |
| `docs.majlis-welcome.usage` | content/docs/blocks/majlis-welcome.mdx (usage) |
| `docs.majlis-welcome.rtl` | content/docs/blocks/majlis-welcome.mdx (rtl) |
| `docs.majlis-welcome.a11y` | content/docs/blocks/majlis-welcome.mdx (a11y) |
| `docs.majlis-welcome.heritage` | content/docs/blocks/majlis-welcome.mdx (callout) |
| `docs.majlis-welcome.copyNote` | content/docs/blocks/majlis-welcome.mdx (callout) |
| `docs.props.majlis-welcome.title` | majlis-welcome props: title |
| `docs.props.majlis-welcome.body` | majlis-welcome props: body |
| `docs.props.majlis-welcome.points` | majlis-welcome props: points |
| `docs.props.majlis-welcome.media` | majlis-welcome props: media |
| `docs.props.majlis-welcome.cta` | majlis-welcome props: cta |
| `docs.qatt-feature-grid.intro` | content/docs/blocks/qatt-feature-grid.mdx (intro) |
| `docs.qatt-feature-grid.usage` | content/docs/blocks/qatt-feature-grid.mdx (usage) |
| `docs.qatt-feature-grid.rtl` | content/docs/blocks/qatt-feature-grid.mdx (rtl) |
| `docs.qatt-feature-grid.a11y` | content/docs/blocks/qatt-feature-grid.mdx (a11y) |
| `docs.props.qatt-feature-grid.title` | qatt-feature-grid props: title |
| `docs.props.qatt-feature-grid.subtitle` | qatt-feature-grid props: subtitle |
| `docs.props.qatt-feature-grid.features` | qatt-feature-grid props: features |
| `docs.props.qatt-feature-grid.columns` | qatt-feature-grid props: columns |
| `docs.props.qatt-feature-grid.background` | qatt-feature-grid props: background |
| `docs.qatt-stats.intro` | content/docs/blocks/qatt-stats.mdx (intro) |
| `docs.qatt-stats.usage` | content/docs/blocks/qatt-stats.mdx (usage) |
| `docs.qatt-stats.rtl` | content/docs/blocks/qatt-stats.mdx (rtl) |
| `docs.qatt-stats.a11y` | content/docs/blocks/qatt-stats.mdx (a11y) |
| `docs.props.qatt-stats.title` | qatt-stats props: title |
| `docs.props.qatt-stats.stats` | qatt-stats props: stats |
| `docs.props.qatt-stats.numerals` | qatt-stats props: numerals |
| `docs.props.qatt-stats.background` | qatt-stats props: background |
| `docs.props.qatt-stats.animate` | qatt-stats props: animate |
| `docs.qatt-testimonials.intro` | content/docs/blocks/qatt-testimonials.mdx (intro) |
| `docs.qatt-testimonials.usage` | content/docs/blocks/qatt-testimonials.mdx (usage) |
| `docs.qatt-testimonials.rtl` | content/docs/blocks/qatt-testimonials.mdx (rtl) |
| `docs.qatt-testimonials.a11y` | content/docs/blocks/qatt-testimonials.mdx (a11y) |
| `docs.props.qatt-testimonials.title` | qatt-testimonials props: title |
| `docs.props.qatt-testimonials.items` | qatt-testimonials props: items |
| `docs.props.qatt-testimonials.layout` | qatt-testimonials props: layout |
| `docs.qatt-pricing.intro` | content/docs/blocks/qatt-pricing.mdx (intro) |
| `docs.qatt-pricing.usage` | content/docs/blocks/qatt-pricing.mdx (usage) |
| `docs.qatt-pricing.rtl` | content/docs/blocks/qatt-pricing.mdx (rtl) |
| `docs.qatt-pricing.a11y` | content/docs/blocks/qatt-pricing.mdx (a11y) |
| `docs.props.qatt-pricing.title` | qatt-pricing props: title |
| `docs.props.qatt-pricing.subtitle` | qatt-pricing props: subtitle |
| `docs.props.qatt-pricing.currency` | qatt-pricing props: currency |
| `docs.props.qatt-pricing.period` | qatt-pricing props: period |
| `docs.props.qatt-pricing.plans` | qatt-pricing props: plans |
| `docs.qatt-cta.intro` | content/docs/blocks/qatt-cta.mdx (intro) |
| `docs.qatt-cta.usage` | content/docs/blocks/qatt-cta.mdx (usage) |
| `docs.qatt-cta.rtl` | content/docs/blocks/qatt-cta.mdx (rtl) |
| `docs.qatt-cta.a11y` | content/docs/blocks/qatt-cta.mdx (a11y) |
| `docs.props.qatt-cta.title` | qatt-cta props: title |
| `docs.props.qatt-cta.body` | qatt-cta props: body |
| `docs.props.qatt-cta.primary` | qatt-cta props: primary |
| `docs.props.qatt-cta.secondary` | qatt-cta props: secondary |
| `docs.props.qatt-cta.tone` | qatt-cta props: tone |
| `docs.props.qatt-cta.motif` | qatt-cta props: motif |
| `docs.qatt-footer.intro` | content/docs/blocks/qatt-footer.mdx (intro) |
| `docs.qatt-footer.usage` | content/docs/blocks/qatt-footer.mdx (usage) |
| `docs.qatt-footer.rtl` | content/docs/blocks/qatt-footer.mdx (rtl) |
| `docs.qatt-footer.a11y` | content/docs/blocks/qatt-footer.mdx (a11y) |
| `docs.props.qatt-footer.brand` | qatt-footer props: brand |
| `docs.props.qatt-footer.tagline` | qatt-footer props: tagline |
| `docs.props.qatt-footer.heritageNote` | qatt-footer props: heritageNote |
| `docs.props.qatt-footer.columns` | qatt-footer props: columns |
| `docs.props.qatt-footer.bottom` | qatt-footer props: bottom |
| `docs.props.qatt-footer.kaff` | qatt-footer props: kaff |
| `docs.qatt-login.intro` | content/docs/blocks/qatt-login.mdx (intro) |
| `docs.qatt-login.usage` | content/docs/blocks/qatt-login.mdx (usage) |
| `docs.qatt-login.rtl` | content/docs/blocks/qatt-login.mdx (rtl) |
| `docs.qatt-login.a11y` | content/docs/blocks/qatt-login.mdx (a11y) |
| `docs.props.qatt-login.title` | qatt-login props: title |
| `docs.props.qatt-login.description` | qatt-login props: description |
| `docs.props.qatt-login.onSubmit` | qatt-login props: onSubmit |
| `docs.props.qatt-login.providers` | qatt-login props: providers |
| `docs.props.qatt-login.forgotHref` | qatt-login props: forgotHref |
| `docs.props.qatt-login.signUpHref` | qatt-login props: signUpHref |
| `docs.props.qatt-login.errors` | qatt-login props: errors |
| `docs.qatt-404.intro` | content/docs/blocks/qatt-404.mdx (intro) |
| `docs.qatt-404.usage` | content/docs/blocks/qatt-404.mdx (usage) |
| `docs.qatt-404.rtl` | content/docs/blocks/qatt-404.mdx (rtl) |
| `docs.qatt-404.a11y` | content/docs/blocks/qatt-404.mdx (a11y) |
| `docs.props.qatt-404.code` | qatt-404 props: code |
| `docs.props.qatt-404.title` | qatt-404 props: title |
| `docs.props.qatt-404.body` | qatt-404 props: body |
| `docs.props.qatt-404.homeHref` | qatt-404 props: homeHref |
| `docs.props.qatt-404.homeLabel` | qatt-404 props: homeLabel |
| `docs.props.qatt-404.extra` | qatt-404 props: extra |

## Notes for the Developer

- `majlis-welcome`: component-specs §3.2 lists the site keys `home.story.*` / `home.cta.title`. Those keys stay for the docs home page. The block's own defaults are `blocks.majlis-welcome.*`. Render `blocks.majlis-welcome.note` as a small line under the frieze.
- Show `blocks.sampleNote` (or the block-specific `sampleNote`) under the stats, testimonials and pricing previews, so the sample figures, names and prices are never read as real.
- `qatt-login` error `error.password.short` uses «{min} أحرف», which suits 3 to 10. For 11 or more, use «{min} حرفًا».
- D-026: `docs.props.button.tone` and `docs.button.a11y` (ar + en) no longer mention a green tone.
