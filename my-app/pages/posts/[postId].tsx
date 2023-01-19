import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

type PostProps = {
    post: {
        id: number
        title: string
    }
}

const Post = ({ post }: PostProps) => {
    
    const router = useRouter()
    
    if (router.isFallback) {
        console.log("loading complete !")
        return <h1>Loading...</h1>
    }

    return (
        <div key={post.id}>
            <p>{post.id} {post.title}</p>
        </div>
    )
}
export default Post

export const getStaticPaths: GetStaticPaths = async () => {

    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await response.json()

    const paths = data.map((post: any) => {
        return {
            params: {
                postId: `${post.id}`,
            }
        }
    })

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
    ], fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (context: any) => {
    const { params } = context
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
    const data = await response.json()

    return {
        props: {
            post: data,
        }
    }
}