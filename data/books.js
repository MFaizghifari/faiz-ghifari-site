// Edit via /keystatic or data/content/books/index.json.
import data from './content/books/index.json'

// Must match `publicPath` in keystatic.config.js → books.schema.items.cover
const COVER_PUBLIC_PATH = '/books/'

export const books = data.items.map((b) => {
  const book = {
    slug: b.slug,
    title: b.title,
    author: b.author,
    // fields.image stores just the filename ("range.jpg"); prepend publicPath
    // so next/image gets a proper absolute URL like "/books/range.jpg".
    cover: b.cover ? `${COVER_PUBLIC_PATH}${b.cover}` : '',
    quote: b.quote,
    spineColor: b.spineColor,
  }
  if (b.spineTextColor) book.spineTextColor = b.spineTextColor
  return book
})
