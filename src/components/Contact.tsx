import { Github, Twitter, Mail, Linkedin } from './Icons'

const links = [
  { label: 'Email', value: 'contact@joseppascual.com', href: 'mailto:contact@joseppascual.com', Icon: Mail },
  { label: 'GitHub', value: '@hatsyio', href: 'https://github.com/hatsyio', Icon: Github },
  { label: 'X (Twitter)', value: '@hatsyio', href: 'https://x.com/hatsyio', Icon: Twitter },
  {
    label: 'LinkedIn',
    value: 'josep-pascual-badia',
    href: 'https://www.linkedin.com/in/josep-pascual-badia-14a199a2/',
    Icon: Linkedin,
  },
]

export function Contact() {
  return (
    <section id="contact" className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-3xl lg:text-4xl italic mb-10">Contact</h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Got a question or want to collaborate on something? Reach out through any of these — always happy to
          hear about new projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="group flex items-center gap-4 p-5 border border-border rounded-lg bg-card/60 hover:border-primary/60 transition-colors duration-300"
            >
              <Icon className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{label}</h3>
                <p className="text-sm text-muted-foreground">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

