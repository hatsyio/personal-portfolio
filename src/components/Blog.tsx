import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

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
            <Link key={post.slug} to={`/blog/${post.slug}`}>
              <div className="group bg-card/40 backdrop-blur-xl border border-primary/20 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(255,0,200,0.2)] transition-all duration-300 cursor-pointer rounded-lg overflow-hidden">
                <div className="relative w-full h-48 overflow-hidden border-b border-primary/20">
                  <img
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-accent group-hover:drop-shadow-[0_0_10px_rgba(255,0,200,0.5)] transition-all duration-300">
                    {post.title}
                  </h3>
                  <p className="text-base text-muted-foreground mb-4">{post.excerpt}</p>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

