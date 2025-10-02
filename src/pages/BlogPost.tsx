import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft } from '../components/Icons'
import { blogPosts } from '../data/blogPosts'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return <Navigate to="/#blog" replace />
  }

  return (
    <div className="min-h-screen px-6 lg:px-20 py-20">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/#blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
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

