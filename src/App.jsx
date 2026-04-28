import { lazy, Suspense } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Footer from './components/Footer/Footer'
import { ModalProvider } from './context/ModalContext'

const ContactModal = lazy(() => import('./components/ContactModal/ContactModal'))

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
      <Suspense fallback={null}>
        <ContactModal />
      </Suspense>
    </ModalProvider>
  )
}
