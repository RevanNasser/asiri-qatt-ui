import { Copy } from "@/components/site/copy"
import { localePath, type Lang } from "@/lib/i18n"
import { copyFor, fill } from "@/lib/site-copy"
import { QattFooter } from "@/registry/qatt/blocks/qatt-footer/qatt-footer"

/** Site footer: the qatt-footer block, dogfooded with footer.* copy. */
export function SiteFooter({ lang = "ar" }: { lang?: Lang }) {
  const { t } = copyFor(lang)
  return (
    <QattFooter
      brand={t("nav.brand")}
      tagline={t("footer.tagline")}
      heritageNote={t("footer.heritage")}
      navLabel={t("blocks.qatt-footer.nav")}
      externalLabel={t("blocks.qatt-footer.external")}
      columns={[
        {
          title: t("footer.col.docs"),
          links: [
            { label: t("docs.gettingStarted.title"), href: localePath(lang, "/docs/getting-started") },
            { label: t("docs.components.title"), href: localePath(lang, "/docs/components") },
            { label: t("docs.blocks.title"), href: localePath(lang, "/docs/blocks") },
            { label: t("docs.theme.title"), href: localePath(lang, "/docs/theme") },
            { label: t("docs.patterns.title"), href: localePath(lang, "/docs/patterns") },
          ],
        },
        {
          title: t("footer.col.project"),
          // TODO(repo-url): footer.link.license / changelog / contribute and the community column
          // (nav.github) need the public repository URL.
          links: [{ label: t("footer.link.about"), href: localePath(lang, "/about") }],
        },
      ]}
      bottom={
        <>
          <p>{fill(t("footer.copyright"), { year: new Date().getFullYear() })}</p>
          <p>
            <Copy lang={lang} k="footer.license" vars={{ license: "<bdi>MIT</bdi>" }} />{" "}
            <Copy lang={lang} k="footer.builtWith" />
          </p>
        </>
      }
    />
  )
}
