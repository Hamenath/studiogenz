import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MovingBanner from './components/MovingBanner'
import About from './components/About'
import StorySection from './components/StorySection'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MovingBanner />
      <About />
      <StorySection />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  )
}
