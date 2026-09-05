/**
 * Compatibility re-exports — the website reads the live store.
 * app/menu and app/order import from here; data lives in ./cafe-store.
 */
export { MENU_ITEMS, CATEGORIES, toMenuCard } from "./cafe-store";
export type { MenuCategory, MenuItem } from "./cafe-store";
