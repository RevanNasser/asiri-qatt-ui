import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach, expect } from "vitest"
import * as axeMatchers from "vitest-axe/matchers"

expect.extend(axeMatchers)
afterEach(() => cleanup())

// jsdom lacks matchMedia (used by sonner).
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList
}
