type User = {
    username:string
    role:"guest" | "member" | "admin" 
}

type UserRole = "guest" | "member" | "admin"

let userRole : UserRole = "member"


