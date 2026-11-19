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

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Step,
    Steps,
    Tab,
    Tabs,
    ComponentPreview,
    ComponentGallery,
    BlockGallery,
    InstallCommand,
    MotifGallery,
    WallRecipe,
    PropsTable,
    Copy,
    ...components,
  } satisfies MDXComponents
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
