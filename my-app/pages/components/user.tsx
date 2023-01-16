type UserProps = {
    user: any
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