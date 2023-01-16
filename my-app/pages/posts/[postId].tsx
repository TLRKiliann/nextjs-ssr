type PostProps = {
    post: any
}

function Post({ post }: PostProps) {
    return (
        <div key={post.id}>
            <p>{post.id} {post.title}</p>
        </div>
    )
}

export default Post

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {postId: "1"},
            },
            {
                params: {postId: "2"},
            },
            {
                params: {postId: "3"},
            },
    ], fallback: false,
    }
}

export async function getStaticProps(context: any) {
    const { params } = context
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
    const data = await response.json()

    return {
        props: {
            post: data,
        }
    }
}