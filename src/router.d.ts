// Auto-generated LayoutName type from vite plugin
import type { LayoutName } from "./layout-types";

// src/router.d.ts
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    layout?: LayoutName;
    layoutProps?: Record<string, unknown>;
  }
}
