/**
 * Public origin the registry is served from (no trailing slash). See decision D-003.
 * It is baked into the built registry files and install commands at build time:
 * 1. `REGISTRY_URL` — explicit override (set it in the host's environment for production).
 * 2. Vercel production — the project's production domain (custom domain when one is attached).
 * 3. Vercel preview — the preview's own URL, so each preview is a self-consistent registry.
 * 4. Local development — http://localhost:4000 (`pnpm registry:serve`).
 */
export function resolveRegistryUrl(env: NodeJS.ProcessEnv = process.env): string {
  const explicit = env.REGISTRY_URL?.trim()
  if (explicit) return explicit.replace(/\/+$/, "")
  const host = (name: string) =>
    env[name]
      ?.trim()
      .replace(/^https?:\/\//, "")
      .replace(/\/+$/, "")
  if (env.VERCEL_ENV === "production") {
    const production = host("VERCEL_PROJECT_PRODUCTION_URL") || host("VERCEL_URL")
    if (production) return `https://${production}`
  }
  if (env.VERCEL_ENV === "preview") {
    const preview = host("VERCEL_URL")
    if (preview) return `https://${preview}`
  }
  return "http://localhost:4000"
}
