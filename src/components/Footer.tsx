export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="px-6 pt-[var(--space-2xl)] pb-[var(--space-xl)]">
      <div className="max-w-[65ch] mx-auto">
        <div className="border-t border-border pt-6 flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© {year} Josep Pascual Badia</p>
          <span
            aria-hidden="true"
            className="inline-block h-4 w-4 rounded-full bg-primary shrink-0"
            style={{ transform: 'rotate(-8deg)' }}
          />
        </div>
      </div>
    </footer>
  )
}
