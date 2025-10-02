import { useState, useEffect } from 'react'

export function Navigation() {
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'blog', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'about', label: 'SOBRE MÍ' },
    { id: 'projects', label: 'PROYECTOS' },
    { id: 'blog', label: 'BLOG' },
    { id: 'contact', label: 'CONTACTO' },
  ]

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="bg-card/30 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,200,255,0.15)]">
        <ul className="flex flex-col gap-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`text-sm tracking-wider transition-all duration-300 block ${
                  activeSection === item.id
                    ? 'text-primary border-l-2 border-primary pl-4 drop-shadow-[0_0_8px_rgba(0,200,255,0.8)]'
                    : 'text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_8px_rgba(0,200,255,0.5)] pl-4'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

