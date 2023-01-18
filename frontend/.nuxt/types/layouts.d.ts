import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "/Users/iquit/Desktop/_/Reagan_Corp. /Reagan/frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}