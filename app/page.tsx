import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import StorySection from './components/StorySection'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <StorySection />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
