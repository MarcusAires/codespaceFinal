type UserRole = "guest" | "member" | "admin"

type User = {
    username: string
    role: UserRole
}

const users: User[] = [
    {username:"joao", role:"member"},
    {username:"joaosiclano", role:"admin"},
    {username:"joaofulano", role:"guest"},
]

function fetchUserDetails(username:string) : User{
    const user = users.find(user => user.username === username)
    if(!user){
        throw new Error (`user with username ${username} not found`)
    }
    return user
}

