const sectionLabelClass = 'text-xs font-semibold uppercase text-primary'
const sectionLabelStyle = { letterSpacing: '0.09em' }

const accentPhrase = 'font-semibold text-primary'

export function About() {
  return (
    <section id="about" className="px-6 py-[var(--space-2xl)]">
      <div className="mx-auto w-full max-w-[58ch]">
        <p className={`${sectionLabelClass} mb-[var(--space-lg)]`} style={sectionLabelStyle}>
          About
        </p>

        <div className="space-y-6 font-body text-lg leading-[1.65] text-muted-foreground">
          <p>
            I&rsquo;m a <span className={accentPhrase}>software engineer</span> who likes building small, useful
            things — web tools, automations, and the occasional bot. Right now that means working at Carto during
            the day, and tinkering with side projects like a game-picker and a personal finance tracker in my
            spare time.
          </p>

          <div className="overflow-hidden rounded-[var(--radius)] border border-primary bg-card">
            <img
              src="/hometown.jpeg"
              alt="My hometown"
              width="800"
              height="400"
              className="h-full max-h-72 w-full object-cover"
            />
          </div>

          <p>
            Outside of code, I&rsquo;m a fairly <span className={accentPhrase}>practical idealist</span>: I love a
            good video game, a cold beer, and finding the next dish worth crossing town for. I also share my home
            with a couple of very soft cats.
          </p>
        </div>
      </div>
    </section>
  )
}
