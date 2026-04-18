// Edit via /keystatic or data/content/media/index.json.
import data from './content/media/index.json'

export const media = data.items.map((item) => {
  const entry = { name: item.name }
  if (item.outlet) entry.outlet = item.outlet
  if (item.href) entry.href = item.href
  return entry
})
