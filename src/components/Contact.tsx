import { Github, Linkedin, Mail, Twitter } from './Icons'

const channels = [
  { href: 'mailto:contact@joseppascual.com', label: 'Email', Icon: Mail, external: false },
  { href: 'https://github.com/hatsyio', label: 'GitHub', Icon: Github, external: true },
  { href: 'https://x.com/hatsyio', label: 'X', Icon: Twitter, external: true },
  { href: 'https://www.linkedin.com/in/josep-pascual-badia-14a199a2/', label: 'LinkedIn', Icon: Linkedin, external: true },
]

const sectionLabelClass = 'text-xs font-semibold uppercase text-primary'
const sectionLabelStyle = { letterSpacing: '0.09em' }

function ContactTile({ href, label, Icon, external }: Readonly<(typeof channels)[number]>) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex min-h-[44px] items-center gap-3 rounded-[var(--radius)] border border-border bg-card/40 px-[var(--space-lg)] py-[var(--space-md)] text-foreground transition-colors duration-[var(--dur-short)] hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <Icon className="h-5 w-5 shrink-0 text-current transition-colors duration-[var(--dur-short)]" />
      <span className="font-medium">{label}</span>
    </a>
  )
}

export function Contact() {
  return (
    <section id="contact" className="px-6 py-[var(--space-2xl)]">
      <div className="mx-auto w-full max-w-[58ch]">
        <p className={`${sectionLabelClass} mb-[var(--space-lg)]`} style={sectionLabelStyle}>
          Contact
        </p>

        <p className="mb-[var(--space-lg)] font-body text-lg leading-[1.65] text-muted-foreground">
          Got a question or want to collaborate on something? Reach out.
        </p>

        <div className="grid grid-cols-1 gap-[var(--space-md)] min-[40rem]:grid-cols-2">
          {channels.map((channel) => (
            <ContactTile key={channel.label} {...channel} />
          ))}
        </div>
      </div>
    </section>
  )
}
