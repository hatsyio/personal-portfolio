import { Github, Twitter, Mail, Globe } from './Icons'

export function Contact() {
  return (
    <section id="contact" className="min-h-screen flex items-center px-6 lg:px-20 py-20 relative">
      <div className="max-w-4xl w-full lg:ml-32 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-bold mb-12">Contacto</h2>

        <div className="space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed">
            ¿Tienes alguna pregunta o quieres colaborar en un proyecto? No dudes en contactarme a través de cualquiera
            de estos canales. Siempre estoy abierto a nuevas oportunidades y conversaciones interesantes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="https://github.com/hatsyio"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-card/60 border border-primary/30 rounded-lg hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <Github className="w-8 h-8 text-primary transition-colors duration-300" />
                <div>
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">GitHub</h3>
                  <p className="text-sm text-muted-foreground">@hatsyio</p>
                </div>
              </div>
            </a>

            <a
              href="https://x.com/hatsyio"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-card/60 border border-primary/30 rounded-lg hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <Twitter className="w-8 h-8 text-primary transition-colors duration-300" />
                <div>
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">X (Twitter)</h3>
                  <p className="text-sm text-muted-foreground">@hatsyio</p>
                </div>
              </div>
            </a>

            <a
              href="mailto:contact@joseppascual.com"
              className="group p-6 bg-card/60 border border-primary/30 rounded-lg hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <Mail className="w-8 h-8 text-accent transition-colors duration-300" />
                <div>
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-accent transition-colors">Email</h3>
                  <p className="text-sm text-muted-foreground">contact@joseppascual.com</p>
                </div>
              </div>
            </a>

            <a
              href="https://www.joseppascual.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-card/60 border border-primary/30 rounded-lg hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <Globe className="w-8 h-8 text-accent transition-colors duration-300" />
                <div>
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-accent transition-colors">Website</h3>
                  <p className="text-sm text-muted-foreground">www.joseppascual.com</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

