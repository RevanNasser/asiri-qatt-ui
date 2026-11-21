import type { ReactNode } from "react"

import type { Lang } from "@/lib/i18n"
import { copyFor } from "@/lib/site-copy"

export interface PropRow {
  name: string
  type: string
  default?: string
  description?: ReactNode
}

export function PropsTable({ rows, lang = "ar" }: { rows: PropRow[]; lang?: Lang }) {
  const { t } = copyFor(lang)
  return (
    <div className="not-prose overflow-x-auto" data-slot="props-table">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-start">
            <th scope="col" className="p-2 text-start font-semibold">
              {t("docs.props.name")}
            </th>
            <th scope="col" className="p-2 text-start font-semibold">
              {t("docs.props.type")}
            </th>
            <th scope="col" className="p-2 text-start font-semibold">
              {t("docs.props.default")}
            </th>
            <th scope="col" className="p-2 text-start font-semibold">
              {t("docs.props.description")}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b align-top">
              <td className="p-2">
                <code dir="ltr">{row.name}</code>
              </td>
              <td className="p-2">
                <code dir="ltr">{row.type}</code>
              </td>
              <td className="p-2">{row.default ? <code dir="ltr">{row.default}</code> : "—"}</td>
              <td className="p-2">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
