import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

// This would typically come from a CMS or markdown files
const blogPosts: Record<string, { title: string; date: string; content: string }> = {
  "reflexiones-open-source-jhipster": {
    title: "Reflexiones sobre Open Source y JHipster",
    date: "Marzo 15, 2024",
    content: `
      <p>Contribuir al ecosistema de JHipster ha sido una de las experiencias más enriquecedoras de mi carrera como desarrollador. No solo he aprendido sobre desarrollo colaborativo, sino también sobre la importancia de la comunidad en el software open source.</p>
      
      <h2>¿Qué es JHipster?</h2>
      <p>JHipster es un generador de aplicaciones modernas que combina Spring Boot, Angular/React/Vue, y otras tecnologías para crear aplicaciones web completas. Su filosofía de "convención sobre configuración" acelera significativamente el desarrollo.</p>
      
      <h2>Mi Experiencia Contribuyendo</h2>
      <p>Desde que empecé a contribuir, he trabajado en mejoras de documentación, corrección de bugs, y nuevas funcionalidades. Cada pull request es una oportunidad de aprendizaje y de contribuir a una herramienta que miles de desarrolladores usan diariamente.</p>
      
      <h2>Lecciones Aprendidas</h2>
      <ul>
        <li><strong>Comunidad:</strong> El open source se trata de personas trabajando juntas hacia un objetivo común</li>
        <li><strong>Calidad:</strong> El código debe ser no solo funcional, sino mantenible y bien documentado</li>
        <li><strong>Paciencia:</strong> Los procesos de revisión pueden ser largos, pero son esenciales para la calidad</li>
        <li><strong>Comunicación:</strong> La comunicación clara es tan importante como el código</li>
      </ul>
      
      <h2>El Impacto del Open Source</h2>
      <p>Contribuir a proyectos open source no solo beneficia a la comunidad, sino que también mejora tus propias habilidades técnicas y de comunicación. Es una inversión en tu crecimiento profesional y en el ecosistema tecnológico.</p>
    `,
  },
  "creando-bots-twitter-python": {
    title: "Creando Bots de Twitter con Python",
    date: "Febrero 28, 2024",
    content: `
      <p>Construir pokemon-war-bot fue un proyecto que combinó mi pasión por la programación con mi amor por los videojuegos. Fue un viaje técnico lleno de desafíos y aprendizajes sobre APIs, automatización y creatividad.</p>
      
      <h2>La Idea Inicial</h2>
      <p>Todo comenzó con una idea simple: crear un bot que simulara batallas de Pokémon en Twitter. Los usuarios podrían desafiar al bot, y este respondería con movimientos basados en la lógica del juego original.</p>
      
      <h2>Desafíos Técnicos</h2>
      <p>Integrar la API de Twitter, manejar la lógica de batallas, y crear una interfaz intuitiva fueron solo algunos de los retos. Cada uno me enseñó algo nuevo sobre desarrollo de software.</p>
      
      <h2>Tecnologías Utilizadas</h2>
      <ul>
        <li><strong>Python:</strong> Para la lógica del bot y manejo de datos</li>
        <li><strong>Twitter API v2:</strong> Para interactuar con la plataforma</li>
        <li><strong>SQLite:</strong> Para almacenar información de Pokémon y usuarios</li>
        <li><strong>Heroku:</strong> Para el despliegue y hosting</li>
      </ul>
      
      <h2>Lecciones Aprendidas</h2>
      <p>Este proyecto me enseñó sobre la importancia de la documentación de APIs, el manejo de rate limits, y cómo hacer que la tecnología sea accesible y divertida para los usuarios finales.</p>
      
      <h2>El Resultado</h2>
      <p>El bot no solo funcionó técnicamente, sino que creó una pequeña comunidad de usuarios que disfrutaban de las batallas. Fue una prueba de que la programación puede ser tanto funcional como entretenida.</p>
    `,
  },
  "tecnologia-videojuegos-creatividad": {
    title: "Tecnología, Videojuegos y Creatividad",
    date: "Enero 10, 2024",
    content: `
      <p>Los videojuegos han influido profundamente en mi forma de programar y ver la tecnología. No es solo entretenimiento; es una fuente constante de inspiración y aprendizaje que se refleja en mi trabajo diario.</p>
      
      <h2>La Intersección entre Juego y Código</h2>
      <p>Los videojuegos son sistemas complejos que requieren programación elegante, optimización de rendimiento, y diseño de experiencias de usuario. Cada juego que juego me enseña algo sobre cómo estructurar código y resolver problemas.</p>
      
      <h2>Lecciones de Diseño</h2>
      <p>Los videojuegos me han enseñado sobre la importancia de la usabilidad, la retroalimentación visual, y la progresión gradual de complejidad. Estos principios se aplican directamente al desarrollo de software.</p>
      
      <h2>Creatividad y Resolución de Problemas</h2>
      <ul>
        <li><strong>Pensamiento Lateral:</strong> Los puzzles en videojuegos desarrollan habilidades de resolución de problemas</li>
        <li><strong>Iteración Rápida:</strong> Los juegos indie muestran cómo iterar y mejorar rápidamente</li>
        <li><strong>Experiencia del Usuario:</strong> La inmersión en juegos enseña sobre diseño centrado en el usuario</li>
        <li><strong>Optimización:</strong> Los juegos AAA demuestran técnicas avanzadas de optimización</li>
      </ul>
      
      <h2>Inspiración para Proyectos</h2>
      <p>Muchos de mis proyectos personales nacen de ideas que surgen mientras juego. Desde bots de Twitter inspirados en Pokémon hasta visualizaciones de datos inspiradas en interfaces de juegos, la creatividad fluye en ambas direcciones.</p>
      
      <h2>El Futuro de la Tecnología</h2>
      <p>Los videojuegos están a la vanguardia de la tecnología: realidad virtual, inteligencia artificial, y gráficos en tiempo real. Seguir esta industria me mantiene actualizado con las últimas tendencias tecnológicas.</p>
    `,
  },
}

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen px-6 lg:px-20 py-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`${process.env.NODE_ENV === 'production' ? '/personal-portfolio' : ''}/#blog`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">{post.title}</h1>
          <p className="text-muted-foreground mb-12">{post.date}</p>

          <div
            className="text-muted-foreground leading-relaxed [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-foreground [&>h2]:mt-12 [&>h2]:mb-4 [&>p]:mb-6 [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>li]:mb-2 [&>strong]:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  )
}
