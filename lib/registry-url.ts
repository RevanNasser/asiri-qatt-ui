/** Public origin the registry is served from (no trailing slash). See decision D-003. */
export function resolveRegistryUrl(env: NodeJS.ProcessEnv = process.env): string {
  const explicit = env.REGISTRY_URL?.trim()
  if (explicit) return explicit.replace(/\/+$/, "")
  // Vercel preview deployments: make each preview a self-consistent registry.
  if (env.VERCEL_ENV === "preview" && env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  return "http://localhost:4000"
}
