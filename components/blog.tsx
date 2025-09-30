import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const blogPosts = [
  {
    title: "Reflexiones sobre Open Source y JHipster",
    excerpt:
      "Mis experiencias contribuyendo al ecosistema de JHipster y lo que he aprendido sobre el desarrollo colaborativo en proyectos open source.",
    date: "Marzo 15, 2024",
    slug: "reflexiones-open-source-jhipster",
    image: "/open-source-collaboration.png",
  },
  {
    title: "Creando Bots de Twitter con Python",
    excerpt:
      "Un viaje técnico sobre cómo construí pokemon-war-bot y las lecciones aprendidas sobre APIs, automatización y creatividad.",
    date: "Febrero 28, 2024",
    slug: "creando-bots-twitter-python",
    image: "/python-bot-development.jpg",
  },
  {
    title: "Tecnología, Videojuegos y Creatividad",
    excerpt:
      "Pensamientos sobre cómo los videojuegos influyen en mi forma de programar y ver la tecnología. La intersección entre el juego y el código.",
    date: "Enero 10, 2024",
    slug: "tecnologia-videojuegos-creatividad",
    image: "/gaming-technology-creative.jpg",
  },
]

export function Blog() {
  return (
    <section id="blog" className="min-h-screen flex items-center px-6 lg:px-20 py-20 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl w-full lg:ml-32 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 drop-shadow-[0_0_15px_rgba(0,200,255,0.3)]">Blog</h2>

        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          Reflexiones sobre tecnología y desarrollo, experiencias con proyectos open source, opiniones personales,
          cultura y hobbies.
        </p>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="group bg-card/40 backdrop-blur-xl border-primary/20 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(255,0,200,0.2)] transition-all duration-300 cursor-pointer">
                <div className="relative w-full h-48 overflow-hidden rounded-t-lg border-b border-primary/20">
                  <Image
                    src={`${process.env.NODE_ENV === 'production' ? '/personal-portfolio' : ''}${post.image || "/placeholder.svg"}`}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl mb-2 group-hover:text-accent group-hover:drop-shadow-[0_0_10px_rgba(255,0,200,0.5)] transition-all duration-300">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
