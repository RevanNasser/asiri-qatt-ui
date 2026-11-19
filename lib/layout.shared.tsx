import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

import { t } from "@/lib/site-copy"

export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: t("nav.brand") },
    // TODO(repo-url): set githubUrl once the public repository exists.
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
