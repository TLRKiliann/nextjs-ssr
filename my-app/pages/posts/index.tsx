import Link from "next/link"

type PostListProps = {
    posts: any
}

function PostList({ posts }: PostListProps) {
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
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await response.json()

    return {
        props: {
            posts: data.slice(0, 3)
        }
    }
}