export function Hero() {
  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden px-6 py-[var(--space-3xl)] md:py-[var(--space-4xl)]">
      <style>{`
        @keyframes hero-reveal {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-reveal {
          animation: hero-reveal var(--dur-long) var(--ease-out) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-reveal {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="absolute -top-20 -right-16 h-64 w-64 rotate-[10deg] bg-primary md:h-80 md:w-80"
      />

      <div className="relative z-10 mx-auto w-full max-w-[65ch]">
        <img
          src="/developer-profile-photo.jpg"
          alt="Josep Pascual Badia"
          width="88"
          height="88"
          className="mb-[var(--space-lg)] h-20 w-20 -rotate-[7deg] rounded-full border-2 object-cover md:h-24 md:w-24"
          style={{ borderColor: 'var(--primary)' }}
        />

        <h1 className="hero-reveal font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.02] font-extrabold tracking-tight text-balance uppercase">
          Practical idealist, occasional coder.
        </h1>

        <p className="mt-[var(--space-lg)] max-w-[60ch] text-lg leading-[1.65] text-muted-foreground">
          I build things, chase good games, and I&rsquo;m always up for trying the next dish worth
          crossing town for.
        </p>
      </div>
    </section>
  )
}
