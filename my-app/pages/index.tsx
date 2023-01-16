import Link from "next/link"
import { useRouter } from "next/router"

function Home() {
  const router = useRouter()

  function handleUsers() {
    router.push('/users')
  }

  return (
    <>
      <h1>
        Return NextJS pre-rendering
      </h1>
      <label>Go to users</label>
      <button onClick={handleUsers}>
        Enter
      </button>
      <br />
      <Link href="/users">
        Users
      </Link>
      <br />
      <Link href="/posts">
        Posts
      </Link>
    </>
  )
}

export default Home