import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Portfolio from '../components/Portfolio.jsx'
import Media from '../components/Media.jsx'
import Topics from '../components/Topics.jsx'
import TravelMap from '../components/TravelMap.jsx'
import Books from '../components/Books.jsx'
import Blog from '../components/Blog.jsx'
import Footer from '../components/Footer.jsx'
import { getAllPosts } from '../lib/posts.js'
import { books } from '../data/books.js'

export default function Home() {
  const posts = getAllPosts()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Media />
        <Portfolio />
        <Topics />
        <TravelMap />
        <Books items={books} />
        <Blog posts={posts} />
      </main>
      <Footer />
    </>
  )
}
