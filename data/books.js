// Edit via /keystatic or data/content/books/index.json.
import data from './content/books/index.json'

export const books = data.items.map((b) => {
  const book = {
    slug: b.slug,
    title: b.title,
    author: b.author,
    cover: b.cover,
    quote: b.quote,
    spineColor: b.spineColor,
  }
  if (b.spineTextColor) book.spineTextColor = b.spineTextColor
  return book
})
