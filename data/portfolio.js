// Edit via /keystatic or data/content/portfolio/index.json.
import data from './content/portfolio/index.json'

export const portfolio = data.items.map((item) => {
  const entry = { name: item.name, detail: item.detail }
  if (item.logo) entry.logo = item.logo
  if (item.size && item.size !== 'default') entry.size = item.size
  if (item.colorMode && item.colorMode !== 'default') entry.colorMode = item.colorMode
  return entry
})
