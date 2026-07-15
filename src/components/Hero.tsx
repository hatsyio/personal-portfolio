export function Hero() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-secondary">
            <img
              src="/developer-profile-photo.jpg"
              alt="Josep Pascual Badia"
              width="112"
              height="112"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <h1 className="text-4xl lg:text-5xl italic mb-4 text-balance">
          Practical idealist, occasional coder.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
          I build things, chase good games, and I&apos;m always up for trying the next dish worth crossing town for.
        </p>
      </div>
    </section>
  )
}

