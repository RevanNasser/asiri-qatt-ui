import { createMDX } from "fumadocs-mdx/next"

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Lets a second build/server run beside another one (e.g. NEXT_DIST_DIR=.next-e2e for tests).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // This project has a large MDX/component surface. A persistent webpack cache can grow until a
  // small local disk makes otherwise healthy preview routes return 500. Keep development cacheless;
  // production builds retain Next's normal optimisations.
  webpack(config, { dev }) {
    if (dev) config.cache = false
    return config
  },
  async redirects() {
    return [{ source: "/docs", destination: "/docs/getting-started", permanent: false }]
  },
  async headers() {
    return [
      {
        // Static shadcn registry (built by `shadcn build` into public/r).
        source: "/r/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=300, s-maxage=3600" },
        ],
      },
    ]
  },
}

export default withMDX(config)
