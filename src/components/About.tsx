export function About() {
  return (
    <section id="about" className="px-6 py-16">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-3xl lg:text-4xl italic mb-10">About</h2>

        <div className="space-y-8 text-lg leading-relaxed">
          <p className="text-muted-foreground">
            I&apos;m a software engineer who likes building small, useful things — web tools, automations, and the
            occasional bot. Right now that means working at Carto during the day, and tinkering with side
            projects like a game-picker and a personal finance tracker in my spare time.
          </p>

          <div className="w-full h-64 rounded-lg overflow-hidden">
            <img
              src="/hometown.jpeg"
              alt="My hometown"
              width="800"
              height="400"
              className="object-cover w-full h-full"
            />
          </div>

          <p className="text-muted-foreground">
            Outside of code, I&apos;m a fairly practical idealist: I love a good video game, a cold beer, and
            finding the next dish worth crossing town for. I also share my home with a couple of very soft cats.
          </p>
        </div>
      </div>
    </section>
  )
}

