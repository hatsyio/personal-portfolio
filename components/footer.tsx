export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6 lg:px-20">
      <div className="max-w-4xl w-full lg:ml-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Josep Pascual Badia. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground">Construido con Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
