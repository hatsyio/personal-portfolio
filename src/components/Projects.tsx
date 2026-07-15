import { ExternalLink, Github } from './Icons'
import { projects } from '../data/projects'

export function Projects() {
  return (
    <section id="projects" className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-3xl lg:text-4xl italic mb-10">Projects</h2>

        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.title} className="border border-border rounded-lg p-6 bg-card/60">
              {project.image && (
                <div className="w-full h-40 rounded-md overflow-hidden mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={project.vercelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    aria-label={`Open ${project.title} on Vercel`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      aria-label={`View ${project.title} source on GitHub`}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-base text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
