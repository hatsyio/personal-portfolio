import { Github, Twitter, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 lg:px-20 relative overflow-hidden">
      <div className="max-w-4xl w-full relative z-10">
        <div className="mb-8 flex justify-center lg:justify-start">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/40">
            <Image
              src={`${process.env.NODE_ENV === 'production' ? '/personal-portfolio' : ''}/developer-profile-photo.jpg`}
              alt="Josep Pascual Badia"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        </div>

        <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-balance">Josep Pascual Badia</h1>
        <p className="text-xl lg:text-2xl text-primary mb-8 font-light">Developer & Creator</p>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-12">
          Soy un desarrollador apasionado por la tecnología y la creatividad. Me considero un idealista práctico que
          disfruta tanto de escribir código como de jugar videojuegos. También me encanta la buena comida, una cerveza
          fría y, por supuesto, los gatos.
        </p>

        <div className="flex gap-6">
          <Link
            href="https://github.com/hatsyio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </Link>
          <Link
            href="https://x.com/hatsyio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Twitter"
          >
            <Twitter className="w-6 h-6" />
          </Link>
          <Link
            href="mailto:contact@joseppascual.com"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  )
}
