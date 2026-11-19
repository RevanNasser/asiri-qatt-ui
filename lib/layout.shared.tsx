import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

import { t } from "@/lib/site-copy"

/** Top navigation (site-ia §1): brand at inline-start, then the section links. */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: <span className="font-heading text-lg font-bold">{t("nav.brand")}</span>, url: "/" },
    links: [
      { text: t("nav.home"), url: "/", active: "url", on: "menu" },
      { text: t("nav.docs"), url: "/docs/getting-started", active: "url" },
      { text: t("nav.components"), url: "/docs/components", active: "nested-url" },
      { text: t("nav.blocks"), url: "/docs/blocks", active: "nested-url" },
      { text: t("nav.theme"), url: "/docs/theme", active: "url" },
      { text: t("nav.about"), url: "/about", active: "url" },
    ],
    // TODO(repo-url): set githubUrl (nav.github) once the public repository exists.
  }
}

/** Fumadocs UI strings, mapped onto existing site-copy keys only. */
export const fumadocsTranslationsAr: Record<string, string> = {
  "Search(search trigger)": t("nav.search.placeholder"),
  "Search(search dialog)": t("nav.search.placeholder"),
  "No results found(search dialog)": t("empty.search.title"),
  "On this page(table of contents)": t("nav.onThisPage"),
  "Next Page(pagination)": t("nav.next"),
  "Previous Page(pagination)": t("nav.prev"),
  "Edit on GitHub(edit page)": t("nav.editPage"),
  "Light(theme switcher)(aria-label)": t("nav.theme.light"),
  "Dark(theme switcher)(aria-label)": t("nav.theme.dark"),
  "System(theme switcher)(aria-label)": t("nav.theme.system"),
  "Theme(site menu)": t("nav.theme"),
  "Toggle Theme(theme switcher)(aria-label)": t("nav.theme.toggle"),
  "Toggle Menu(home layout header)(aria-label)": t("nav.menu.open"),
  "Open Search(search trigger)(aria-label)": t("nav.search.placeholder"),
  "Open Sidebar(aria-label)": t("nav.menu.open"),
  "Open Sidebar(sidebar)(aria-label)": t("nav.menu.open"),
  "Close Sidebar(aria-label)": t("nav.menu.close"),
  "Close Sidebar(sidebar)(aria-label)": t("nav.menu.close"),
  "Skip to Content(skip link)": t("nav.skip"),
  "Copy Text(code block)(aria-label)": t("docs.copy"),
  "Copied Text(code block)(aria-label)": t("docs.copied"),
  "Page Not Found(404 not found page)": t("error.404.title"),
  "Back to Home(404 not found page)": t("error.404.cta"),
  "Prop(type table)": t("docs.props.name"),
  "Default(type table)": t("docs.props.default"),
}
