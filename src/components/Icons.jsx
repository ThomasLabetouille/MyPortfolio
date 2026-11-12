// Petites icônes dessinées en SVG, toutes au même trait.
const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export function IconMenu() {
  return <svg {...base} width={22} height={22}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}
export function IconClose() {
  return <svg {...base} width={22} height={22}><path d="M6 6l12 12M18 6L6 18" /></svg>;
}
export function IconDownload() {
  return <svg {...base}><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>;
}
export function IconExternal() {
  return <svg {...base} width={16} height={16}><path d="M9 6h9v9M18 6L7 17" /></svg>;
}
export function IconBack() {
  return <svg {...base}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>;
}
