type nextProps = {
    name: string
    email: string
}

type UserProps = {
    user: nextProps
}

function User ({ user }: UserProps) {
    return (
        <>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </>
    )
}
export default User