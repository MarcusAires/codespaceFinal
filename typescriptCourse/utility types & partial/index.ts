type User = {
    id:number
    username:string
    role:"member" | "contributor" | "admin"
}

const users: User[] = [
    {id: 1, username:"joao", role: "member"},
    {id: 2, username:"joaonla", role: "contributor"},
    {id: 3, username:"joadasdaso", role: "admin"},
    {id: 4, username:"joadasdaso", role: "member"},
];

function updateUser(id: number, updates: any){
    const foundUser = users.find(user => user.id === id)
    if(!foundUser) {
        console.error("User not found!")
        return
    }
    
    Object.assign(foundUser, updates)
}

updateUser(1,{username:"chabau"});
updateUser(4,{role:"contributor"});

console.log(users)



