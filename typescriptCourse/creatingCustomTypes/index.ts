type Address = {
        street: string
        city: string
        country: string
}

type Person = {
        name: string
        age: number
        isStudent: boolean
        address: Address
}

let person1: Person = {
        name: "marcus",
        age: 28,
        isStudent: true,
        address: {
                street: "123 main street",
                city: "anyknown",
                country: "usa"
        }
}

let person2: Person = {
        name: "sofia",
        age: 8,
        isStudent: true,
        address: {
                street: "123 main street",
                city: "anyknown",
                country: "usa"
        }
}
let person3: Person = {
        name: "daniel",
        age: 8,
        isStudent: true,
        address: {
                street: "123 main street",
                city: "anyknown",
                country: "usa"
        }
}



let people: Person[] = [person1,person2]


