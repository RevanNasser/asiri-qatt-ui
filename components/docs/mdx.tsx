import defaultMdxComponents from "fumadocs-ui/mdx"
import { Step, Steps } from "fumadocs-ui/components/steps"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import type { MDXComponents } from "mdx/types"

import { ComponentPreview } from "@/components/docs/component-preview"
import { BlockGallery, ComponentGallery } from "@/components/docs/gallery"
import { InstallCommand } from "@/components/docs/install-command"
import { MotifGallery, WallRecipe } from "@/components/docs/motif-gallery"
import { PropsTable } from "@/components/docs/props-table"
import { Copy } from "@/components/site/copy"
import type { Lang } from "@/lib/i18n"

type Props<T extends (p: never) => unknown> = Parameters<T>[0]

/** MDX components; the docs components are bound to the page's language. */
export function getMDXComponents(components?: MDXComponents, lang: Lang = "ar") {
  return {
    ...defaultMdxComponents,
    Step,
    Steps,
    Tab,
    Tabs,
    ComponentPreview: (p: Props<typeof ComponentPreview>) => <ComponentPreview lang={lang} {...p} />,
    ComponentGallery: (p: Props<typeof ComponentGallery>) => <ComponentGallery lang={lang} {...p} />,
    BlockGallery: (p: Props<typeof BlockGallery>) => <BlockGallery lang={lang} {...p} />,
    InstallCommand: (p: Props<typeof InstallCommand>) => <InstallCommand lang={lang} {...p} />,
    MotifGallery: (p: Props<typeof MotifGallery>) => <MotifGallery lang={lang} {...p} />,
    WallRecipe,
    PropsTable: (p: Props<typeof PropsTable>) => <PropsTable lang={lang} {...p} />,
    Copy: (p: Omit<Props<typeof Copy>, "lang">) => <Copy lang={lang} {...p} />,
    ...components,
  } satisfies MDXComponents
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
