import { ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'pokemon-war-bot',
    description:
      'Bot en Twitter para batallas de Pokémon desarrollado en Python. Un proyecto divertido que combina la API de Twitter con la mecánica de batallas Pokémon.',
    tags: ['Python', 'Twitter API', 'Bot'],
    link: 'https://github.com/hatsyio/pokemon-war-bot',
    year: '2023',
    image: '/pokemon-battle-bot-twitter-interface.jpg',
  },
  {
    title: 'PersonalWebsite',
    description:
      'Mi sitio web personal desarrollado en JavaScript. Un espacio para compartir mis proyectos y pensamientos con la comunidad.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    link: 'https://github.com/hatsyio/PersonalWebsite',
    year: '2024',
    image: '/modern-personal-website-design.jpg',
  },
  {
    title: 'lv-elections',
    description:
      'Proyecto sobre elecciones desarrollado en HTML. Un experimento para visualizar y analizar datos electorales.',
    tags: ['HTML', 'Data Visualization'],
    link: 'https://github.com/hatsyio/lv-elections',
    year: '2022',
    image: '/election-data-visualization-dashboard.jpg',
  },
  {
    title: 'JHipster Contributions',
    description:
      'Contribuciones al ecosistema de JHipster, un generador de aplicaciones modernas en Java. Ayudando a mejorar las herramientas para desarrolladores.',
    tags: ['Java', 'JHipster', 'Open Source'],
    link: 'https://github.com/jhipster',
    year: '2023-2024',
    image: '/java-development-framework-code.jpg',
  },
]

export function Projects() {
  return (
    <section id="projects" className="min-h-screen flex items-center px-6 lg:px-20 py-20 relative">
      <div className="max-w-4xl w-full lg:ml-32 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-bold mb-12">Proyectos</h2>

        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group bg-card/60 border border-primary/30 hover:border-primary/50 transition-all duration-300 rounded-lg overflow-hidden"
            >
              <div className="relative w-full h-48 overflow-hidden border-b border-primary/20">
                <img
                  src={project.image || '/placeholder.svg'}
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-base text-muted-foreground">{project.description}</p>
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    aria-label={`View ${project.title}`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-accent/30 border border-accent/40 text-accent text-xs font-medium rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{project.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

