import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { PageLayout } from '~/components/layout/page'
import { prisma } from '~/lib/db'

import { Post } from '.prisma/client'

const HomePage = ({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout>
      <h1>Posts</h1>
      {posts.map((p) => {
        return (
          <div key={p.id}>
            <h2>{p.title}</h2>
            <p>{p.content}</p>
          </div>
        )
      })}
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps<{
  posts: Array<
    Omit<Post, 'createdAt' | 'updatedAt'> & {
      createdAt: string
      updatedAt: string
    }
  >
}> = async () => {
  const rawPosts = await prisma.post.findMany()
  return {
    props: {
      posts: rawPosts.map((p) => ({
        ...p,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString()
      }))
    }
  }
}

export default HomePage
