import User from './components/user'

type UsersProps = {
    users: any
}

//Call component <User /> from components folder
function UserList({ users }: UsersProps) {
    return (
        <>
            <h1>List of users</h1>
            {users.map((user: any) => {
                return (
                    <div key={user.id}>
                        <User user={user} />
                    </div>
                )
            })}
        </>
    )
}
export default UserList

export async function getStaticProps() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    //console.log(data)
    
    return {
        props: {
            users: data,
        }
    }
}