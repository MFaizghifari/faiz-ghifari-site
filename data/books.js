// Edit via /keystatic or data/content/books/index.json.
import data from './content/books/index.json'

// Keystatic's fields.image stores the full public URL path in the JSON
// (e.g. "/books/items/0/cover.jpg"), so we use it directly — no publicPath
// prepending needed here.

export const books = data.items.map((b) => {
  const book = {
    slug: b.slug,
    title: b.title,
    author: b.author,
    cover: b.cover || '',
    quote: b.quote,
    spineColor: b.spineColor,
  }
  if (b.spineTextColor) book.spineTextColor = b.spineTextColor
  return book
})
