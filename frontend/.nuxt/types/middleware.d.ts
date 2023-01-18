import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/iquit/Desktop/_/Reagan_Corp. /Reagan/frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}