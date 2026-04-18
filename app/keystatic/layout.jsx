// Keystatic admin has its own styling/layout — bypass the site's global layout
// so our CSS doesn't interfere with the CMS UI.
export default function KeystaticLayout({ children }) {
  return children
}
