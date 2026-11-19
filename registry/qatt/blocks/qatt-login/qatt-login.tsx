"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { fillTemplate } from "@/registry/qatt/lib/qatt-utils"
import { Button } from "@/registry/qatt/ui/button"
import { Input } from "@/registry/qatt/ui/input"
import { QattDivider } from "@/registry/qatt/ui/qatt-divider"
import { QattFrame } from "@/registry/qatt/ui/qatt-frame"
import { QattPattern } from "@/registry/qatt/ui/qatt-pattern"

/** UI strings. Arabic defaults come verbatim from Heritage copy (blocks.qatt-login.*). */
const DEFAULT_LABELS = {
  email: "البريد الإلكتروني",
  emailPlaceholder: "name@example.com",
  password: "كلمة المرور",
  showPassword: "إظهار كلمة المرور",
  hidePassword: "إخفاء كلمة المرور",
  capsLock: "زرّ الأحرف الكبيرة مفعَّل.",
  remember: "تذكّرني",
  forgot: "نسيت كلمة المرور؟",
  submit: "دخول",
  submitting: "جارٍ الدخول…",
  divider: "أو",
  provider: "المتابعة عبر {provider}",
  noAccount: "ليس لديك حساب؟",
  signUp: "أنشئ حسابًا",
  panelTitle: "مرحبًا بعودتكم",
  panelBody: "المجلس كما تركتموه، وكلّ شيءٍ في مكانه.",
  emailRequired: "أدخلوا البريد الإلكتروني.",
  emailInvalid: "أدخلوا بريدًا إلكترونيًا صحيحًا، مثل name@example.com.",
  passwordRequired: "أدخلوا كلمة المرور.",
  passwordShort: "يجب ألّا تقلّ كلمة المرور عن {min} أحرف.",
  errorSummary: "تعذّر تسجيل الدخول",
}

export type QattLoginLabels = typeof DEFAULT_LABELS

export interface QattLoginProps extends Omit<React.ComponentProps<"section">, "title" | "onSubmit"> {
  title?: string
  description?: string
  onSubmit?: (data: { email: string; password: string; remember: boolean }) => void | Promise<void>
  providers?: { id: string; label: string; icon?: React.ReactNode; onClick?: () => void }[]
  forgotHref?: string
  signUpHref?: string
  /** Server-side errors (e.g. wrong credentials -> form; never say which field was wrong). */
  errors?: { email?: string; password?: string; form?: string }
  /** Minimum password length for client-side validation. */
  minPasswordLength?: number
  labels?: Partial<QattLoginLabels>
}

/** «تسجيل الدخول»: form at inline-start, decorative sankroli + arch panel at inline-end (hidden on mobile). */
function QattLogin({
  title = "تسجيل الدخول",
  description,
  onSubmit,
  providers,
  forgotHref,
  signUpHref,
  errors,
  minPasswordLength = 8,
  labels: labelsProp,
  className,
  ...props
}: QattLoginProps) {
  const L = { ...DEFAULT_LABELS, ...labelsProp }
  const id = React.useId()
  const [showPassword, setShowPassword] = React.useState(false)
  const [capsLock, setCapsLock] = React.useState(false)
  const [pending, setPending] = React.useState(false)
  const [local, setLocal] = React.useState<{ email?: string; password?: string }>({})
  const emailError = local.email ?? errors?.email
  const passwordError = local.password ?? errors?.password
  const formError = errors?.form

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get("email") ?? "").trim()
    const password = String(data.get("password") ?? "")
    const next: typeof local = {}
    if (!email) next.email = L.emailRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = L.emailInvalid
    if (!password) next.password = L.passwordRequired
    else if (password.length < minPasswordLength)
      next.password = fillTemplate(L.passwordShort, { min: minPasswordLength })
    setLocal(next)
    if (next.email || next.password) {
      event.currentTarget.querySelector<HTMLInputElement>(next.email ? "[name=email]" : "[name=password]")?.focus()
      return
    }
    setPending(true)
    try {
      await onSubmit?.({ email, password, remember: data.get("remember") === "on" })
    } finally {
      setPending(false)
    }
  }

  const field = "grid gap-1.5"
  const errorText = "text-sm text-destructive"

  return (
    <section
      aria-labelledby={`${id}-title`}
      data-slot="qatt-login"
      className={cn("@container w-full", className)}
      {...props}
    >
      <QattDivider motif="rukun" thickness="sm" className="my-0 @2xl:hidden" />
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 @2xl:grid-cols-2 @2xl:items-center">
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-2 text-start">
            <h2 id={`${id}-title`} className="font-heading text-3xl font-bold">
              {title}
            </h2>
            {description && <p className="text-muted-foreground">{description}</p>}
          </header>

          <div role="alert" aria-live="assertive" className="empty:hidden">
            {formError && (
              <div className="rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
                <p className="font-semibold">{L.errorSummary}</p>
                <p>{formError}</p>
              </div>
            )}
          </div>

          <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4" aria-busy={pending || undefined}>
            <div className={field}>
              <label htmlFor={`${id}-email`} className="text-sm font-medium">
                {L.email}
              </label>
              <Input
                id={`${id}-email`}
                name="email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder={L.emailPlaceholder}
                className="placeholder:text-start"
                aria-invalid={emailError ? true : undefined}
                aria-describedby={emailError ? `${id}-email-error` : undefined}
              />
              {emailError && (
                <p id={`${id}-email-error`} className={errorText}>
                  {emailError}
                </p>
              )}
            </div>

            <div className={field}>
              <div className="flex items-center justify-between gap-2">
                <label htmlFor={`${id}-password`} className="text-sm font-medium">
                  {L.password}
                </label>
                {forgotHref && (
                  <a
                    href={forgotHref}
                    className="rounded-sm text-sm text-primary underline-offset-4 outline-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {L.forgot}
                  </a>
                )}
              </div>
              <div className="relative">
                <Input
                  id={`${id}-password`}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  dir="ltr"
                  autoComplete="current-password"
                  className="pe-11"
                  onKeyUp={(e) => setCapsLock(e.getModifierState?.("CapsLock") ?? false)}
                  aria-invalid={passwordError ? true : undefined}
                  aria-describedby={cn(passwordError && `${id}-password-error`, capsLock && `${id}-caps`) || undefined}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="absolute end-1 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? L.hidePassword : L.showPassword}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <EyeOffIcon aria-hidden="true" /> : <EyeIcon aria-hidden="true" />}
                </Button>
              </div>
              {capsLock && (
                <p id={`${id}-caps`} role="status" className="text-sm text-muted-foreground">
                  {L.capsLock}
                </p>
              )}
              {passwordError && (
                <p id={`${id}-password-error`} className={errorText}>
                  {passwordError}
                </p>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="remember" className="size-4 accent-primary" />
              {L.remember}
            </label>

            <Button type="submit" variant="qatt" size="lg" disabled={pending}>
              {pending && <LoaderCircleIcon aria-hidden="true" className="animate-spin motion-reduce:animate-none" />}
              {pending ? L.submitting : L.submit}
            </Button>
          </form>

          {providers && providers.length > 0 && (
            <>
              <QattDivider motif="mathalith-makhamis" label={L.divider} className="my-0" />
              <div className="grid gap-2">
                {providers.map((p) => (
                  <Button key={p.id} type="button" variant="qatt-outline" onClick={p.onClick}>
                    {p.icon}
                    {fillTemplate(L.provider, { provider: p.label })}
                  </Button>
                ))}
              </div>
            </>
          )}

          {signUpHref && (
            <p className="text-sm text-muted-foreground">
              {L.noAccount}{" "}
              <a
                href={signUpHref}
                className="rounded-sm font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {L.signUp}
              </a>
            </p>
          )}
        </div>

        <div aria-hidden="true" className="hidden @2xl:block">
          <QattPattern motif="sankroli" scale="sm" className="rounded-lg p-8">
            <QattFrame outline={3} className="mx-auto w-48">
              <QattPattern motif="balsanah" className="size-full" />
            </QattFrame>
            <div className="mt-4 rounded-md bg-card/90 p-4 text-center">
              <p className="font-heading text-xl font-semibold">{L.panelTitle}</p>
              <p className="text-sm text-muted-foreground">{L.panelBody}</p>
            </div>
          </QattPattern>
        </div>
      </div>
    </section>
  )
}

export { QattLogin }
