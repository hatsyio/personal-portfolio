import Image from "next/image"

export function About() {
  return (
    <section id="about" className="min-h-screen flex items-center px-6 lg:px-20 py-20 relative">
      <div className="max-w-4xl w-full lg:ml-32 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-bold mb-12">Sobre mí</h2>

        <div className="space-y-8 text-lg leading-relaxed">
          <p className="text-muted-foreground">
            Ingeniero de software con experiencia en proyectos web y de automatización. Me gusta aprender
            constantemente, explorar nuevas tecnologías y compartir mis proyectos con la comunidad. Disfruto trabajando
            en soluciones que mezclan lo técnico con lo humano.
          </p>

          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-primary/30">
            <Image
              src="/hometown.jpeg"
              alt="Hometown"
              width={800}
              height={400}
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-primary">Lo que hago</h3>
            <p className="text-muted-foreground">
              Actualmente me especializo en construir aplicaciones web modernas usando React, Next.js y TypeScript.
              Contribuyo al ecosistema de JHipster, un generador de aplicaciones modernas en Java, y trabajo en
              proyectos que van desde bots de Twitter hasta sitios web personales.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-accent">Hobbies e Intereses</h3>
            <p className="text-muted-foreground">
              En mi tiempo libre, disfruto jugando videojuegos, explorando nuevas tecnologías, y trabajando en proyectos
              personales. Me encanta la buena comida, una cerveza fría, y pasar tiempo con gatos. Creo en el aprendizaje
              continuo y me gusta experimentar con nuevas herramientas y frameworks.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-primary">Tecnologías</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Python",
                "Java",
                "JHipster",
                "Node.js",
                "Git",
                "HTML",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-primary/20 border border-primary/40 text-primary rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
