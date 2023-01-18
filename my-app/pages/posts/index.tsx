import Link from "next/link"
import { isPropertySignature } from "typescript"

function PostList({ posts }: any) {
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

export async function getStaticProps() {
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
