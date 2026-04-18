// Edit via /keystatic or data/content/topics/index.json.
import data from './content/topics/index.json'

export const topics = data.items.map((t) => ({ title: t.title, blurb: t.blurb }))
