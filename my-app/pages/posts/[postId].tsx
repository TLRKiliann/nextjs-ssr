type SubProps = {
    id: number
    title: string
    posts: any
}

type PostProps = {
    post: SubProps
    id: number
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
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await response.json()

    const paths = data.map((post: PostProps) => {
        return {
            params: {
                postId: `${post.id}`,
            }
        }
    })

    return {
        paths/*: [
            {
                params: {postId: "1"},
            },
            {
                params: {postId: "2"},
            },
            {
                params: {postId: "3"},
            },
    ]*/, fallback: false,
    }
}

type ParamsProps = {
    postId: number
}

type ContextProps = {
    context: object
    params: ParamsProps
}

export async function getStaticProps(context: ContextProps) {
    const { params } = context
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
    const data = await response.json()

    return {
        props: {
            post: data,
        }
    }
}