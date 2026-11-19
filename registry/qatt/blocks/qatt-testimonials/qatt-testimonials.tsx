import * as React from "react"
import { QuoteIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { fillTemplate } from "@/registry/qatt/lib/qatt-utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/qatt/ui/avatar"
import { Card } from "@/registry/qatt/ui/card"
import { QattMotifTile } from "@/registry/qatt/ui/qatt-pattern"

export interface QattTestimonial {
  /** Write Arabic quotes with «…» inside the text. */
  quote: string
  name: string
  role?: string
  avatar?: string
}

export interface QattTestimonialsProps extends Omit<React.ComponentProps<"section">, "title"> {
  title: string
  items: QattTestimonial[]
  layout?: "grid" | "single"
  /** Alt text template for avatar images, e.g. "صورة {name}". */
  avatarAlt?: string
  note?: string
}

const TONES = ["red", "blue", "yellow"] as const

function Testimonial({
  item,
  index,
  large,
  avatarAlt,
}: {
  item: QattTestimonial
  index: number
  large?: boolean
  avatarAlt: string
}) {
  return (
    <Card variant="painted" className="h-full">
      <figure className="m-0 flex h-full flex-col gap-4 px-(--card-spacing)">
        <span aria-hidden="true" className="relative inline-grid size-12 place-items-center self-start">
          <QattMotifTile motif="sankroli" className="absolute inset-0 size-full opacity-30" />
          <QuoteIcon className="relative size-6 text-primary rtl:-scale-x-100" />
        </span>
        <blockquote className={cn("m-0 flex-1", large ? "font-heading text-2xl leading-relaxed" : "text-base")}>
          <p>{item.quote}</p>
        </blockquote>
        <figcaption className="flex items-center gap-3">
          <Avatar>
            {item.avatar && <AvatarImage src={item.avatar} alt={fillTemplate(avatarAlt, { name: item.name })} />}
            <AvatarFallback tone={TONES[index % TONES.length]}>{item.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="flex flex-col text-sm">
            <span className="font-semibold">{item.name}</span>
            {item.role && <span className="text-muted-foreground">{item.role}</span>}
          </span>
        </figcaption>
      </figure>
    </Card>
  )
}

/** «آراء العملاء»: figure/blockquote/figcaption cards with a decorative quote mark over sankroli. */
function QattTestimonials({
  title,
  items,
  layout = "grid",
  avatarAlt = "{name}",
  note,
  className,
  ...props
}: QattTestimonialsProps) {
  const id = React.useId()
  const single = layout === "single"
  return (
    <section aria-labelledby={id} data-slot="qatt-testimonials" className={cn("w-full", className)} {...props}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6">
        <h2 id={id} className="font-heading text-3xl font-bold">
          {title}
        </h2>
        {single ? (
          items[0] && (
            <div className="mx-auto w-full max-w-3xl">
              <Testimonial item={items[0]} index={0} large avatarAlt={avatarAlt} />
            </div>
          )
        ) : (
          <ul className="grid gap-5 md:grid-cols-3">
            {items.map((item, i) => (
              <li key={item.name}>
                <Testimonial item={item} index={i} avatarAlt={avatarAlt} />
              </li>
            ))}
          </ul>
        )}
        {note && <p className="text-xs text-muted-foreground">{note}</p>}
      </div>
    </section>
  )
}

export { QattTestimonials }
