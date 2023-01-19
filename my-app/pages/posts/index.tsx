import Link from "next/link"
import { GetStaticProps } from "next"

type PostListProps = {
    posts: {
        map(arg0: (post: any) => JSX.Element): import("react").ReactNode
        id: number
        title: string
    }
}

const PostList = ({ posts }: PostListProps) => {
    return (
        <div>
            {posts.map((post: any) => (
                <div key={post.id}>
                    <Link href={`/posts/${post.id}`} passHref>
                        <p>{post.id} {post.title}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}
export default PostList

export const getStaticProps: GetStaticProps = async () => {
    console.log("generate or re-generate")
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await response.json()

    return {
        props: {
            posts: data,
        },
        revalidate: 10,
    }
}
