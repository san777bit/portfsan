import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Footer from './components/Footer/Footer'
import ContactModal from './components/ContactModal/ContactModal'
import { ModalProvider } from './context/ModalContext'

export default function App() {
  return (
    <ModalProvider>
      <Header />
      <main>
        <Hero />
        <Skills />
        <Projects />
      </main>
      <Footer />
      <ContactModal />
    </ModalProvider>
  )
}
