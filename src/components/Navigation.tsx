import { useState, useEffect } from 'react'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const item of navItems) {
        const element = document.getElementById(item.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-[var(--space-md)] sm:px-4">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-1 rounded-full border border-border bg-background/70 px-3 py-2 shadow-lg shadow-black/20 backdrop-blur-md sm:flex-row sm:justify-between sm:gap-4 sm:px-5 sm:py-2.5"
      >
        <span className="font-display text-sm font-bold tracking-tight whitespace-nowrap sm:text-base">
          Josep Pascual Badia
        </span>
        <ul className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`inline-block whitespace-nowrap rounded-full px-2 py-1 text-xs transition-colors duration-[var(--dur-short)] sm:px-3 sm:text-sm ${
                  activeSection === item.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
