import { ExternalLink, Github, GitPullRequest, Gamepad, Chart, Ball } from './Icons'
import { projects, openSourceContributions, type ProjectIcon, type Project } from '../data/projects'

const coverIcons: Record<ProjectIcon, typeof Gamepad> = {
  gamepad: Gamepad,
  chart: Chart,
  ball: Ball,
}

const sectionLabelClass = 'text-xs font-semibold uppercase text-primary'
const sectionLabelStyle = { letterSpacing: '0.09em' }

const linkClass =
  'group inline-flex items-center gap-1.5 text-foreground border-b border-transparent hover:border-primary hover:text-primary transition-colors duration-[var(--dur-short)]'

function ProjectWindow({ project }: { project: Project }) {
  const CoverIcon = coverIcons[project.icon]

  return (
    <div className="mb-[var(--space-md)] aspect-[16/10] w-full overflow-hidden rounded-[var(--radius)] border border-primary bg-card">
      {project.image ? (
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <CoverIcon className="h-9 w-9 text-primary" />
        </div>
      )}
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="px-6 py-[var(--space-3xl)]">
      <style>{`
        .bento-tile {
          transition: transform var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out);
        }
        .bento-tile:hover,
        .bento-tile:focus-within {
          transform: translateY(-3px);
          box-shadow: 0 16px 32px -16px rgba(0, 0, 0, 0.45);
        }
        @media (prefers-reduced-motion: reduce) {
          .bento-tile,
          .bento-tile:hover,
          .bento-tile:focus-within {
            transform: none;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl">
        <p className={`${sectionLabelClass} mb-[var(--space-lg)]`} style={sectionLabelStyle}>
          Selected work
        </p>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] min-[60rem]:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`bento-tile rounded-[var(--radius)] border border-border bg-card/40 p-[var(--space-lg)] ${
                index === 0 ? 'min-[60rem]:col-span-2' : ''
              }`}
            >
              <ProjectWindow project={project} />

              <h3 className="mb-2 font-display text-xl font-bold">{project.title}</h3>
              <p className="mb-3 text-sm leading-[1.65] text-muted-foreground">{project.description}</p>
              <p className="mb-4 text-xs text-muted-foreground">{project.tags.join(' · ')}</p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <ExternalLink className="h-3.5 w-3.5" />
                    View live
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <Github className="h-3.5 w-3.5" />
                    Source
                  </a>
                )}
              </div>
            </article>
          ))}

          <article className="bento-tile rounded-[var(--radius)] border border-border bg-card/40 p-[var(--space-lg)] min-[60rem]:col-span-2">
            <p className={`${sectionLabelClass} mb-[var(--space-md)]`} style={sectionLabelStyle}>
              Open source
            </p>

            <div className="space-y-[var(--space-lg)]">
              {openSourceContributions.map((contribution) => (
                <div key={contribution.title}>
                  <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="font-display text-lg font-bold">{contribution.title}</h4>
                    <a
                      href={contribution.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`shrink-0 text-sm ${linkClass}`}
                    >
                      <GitPullRequest className="h-3.5 w-3.5" />
                      Pull request
                    </a>
                  </div>
                  <p className="mb-1.5 text-sm leading-[1.65] text-muted-foreground">{contribution.description}</p>
                  <p className="text-xs text-muted-foreground">{contribution.tags.join(' · ')}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
