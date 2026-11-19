import { Copy } from "@/components/site/copy"
import { fill, t } from "@/lib/site-copy"
import { QattFooter } from "@/registry/qatt/blocks/qatt-footer/qatt-footer"

/** Site footer: the qatt-footer block, dogfooded with footer.* copy. */
export function SiteFooter() {
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
            { label: t("docs.gettingStarted.title"), href: "/docs/getting-started" },
            { label: t("docs.components.title"), href: "/docs/components" },
            { label: t("docs.blocks.title"), href: "/docs/blocks" },
            { label: t("docs.theme.title"), href: "/docs/theme" },
            { label: t("docs.patterns.title"), href: "/docs/patterns" },
          ],
        },
        {
          title: t("footer.col.project"),
          // TODO(repo-url): footer.link.license / changelog / contribute and the community column
          // (nav.github) need the public repository URL.
          links: [{ label: t("footer.link.about"), href: "/about" }],
        },
      ]}
      bottom={
        <>
          <p>{fill(t("footer.copyright"), { year: new Date().getFullYear() })}</p>
          <p>
            <Copy k="footer.license" vars={{ license: "<bdi>MIT</bdi>" }} /> <Copy k="footer.builtWith" />
          </p>
        </>
      }
    />
  )
}
