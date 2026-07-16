import { ExternalLink, Github, GitPullRequest, Gamepad, Chart, Ball } from './Icons'
import { projects, openSourceContributions, type ProjectIcon } from '../data/projects'

const coverIcons: Record<ProjectIcon, typeof Gamepad> = {
  gamepad: Gamepad,
  chart: Chart,
  ball: Ball,
}

export function Projects() {
  return (
    <section id="projects" className="px-6 py-16">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-3xl lg:text-4xl italic mb-10">Projects</h2>

        <div className="space-y-6">
          {projects.map((project) => {
            const CoverIcon = coverIcons[project.icon]
            return (
              <div key={project.title} className="border border-border rounded-lg p-6 bg-card/60">
                <div
                  className={`w-full rounded-md overflow-hidden mb-4 bg-secondary flex items-center justify-center ${
                    project.image ? 'h-56 border border-border' : 'h-32'
                  }`}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      className="object-cover object-top w-full h-full"
                    />
                  ) : (
                    <CoverIcon className="w-10 h-10 text-primary" />
                  )}
                </div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <div className="flex items-center gap-3 shrink-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        aria-label={`View ${project.title} live`}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        aria-label={`View ${project.title} on GitHub`}
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
            )
          })}
        </div>

        <h3 className="text-2xl italic mb-6 mt-16">Open Source Contributions</h3>

        <div className="space-y-4">
          {openSourceContributions.map((contribution) => (
            <div
              key={contribution.title}
              className="border border-border rounded-lg p-5 bg-card/40 flex gap-4"
            >
              <div className="shrink-0 w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary">
                <GitPullRequest className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-lg font-semibold">{contribution.title}</h4>
                  <a
                    href={contribution.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 shrink-0"
                    aria-label={`View ${contribution.title} pull request on GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{contribution.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {contribution.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
