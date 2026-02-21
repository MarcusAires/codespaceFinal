let cashInRegister = 100
let nextOrderId = 1
let nextPizzaId = 1
const orderQueue: Order[] = []

type Pizza = {
    id:number
    name: string
    price: number
}
type Order = {   
    id: number
    pizza: Pizza
    status: "completed" | "ordered"
}
const menu: Pizza[]= [
    {id: nextPizzaId++,name:"Margherita", price:8},
    {id: nextPizzaId++,name:"Pepperoni", price:15},
    {id: nextPizzaId++,name:"Hawaiian", price:9},
    {id: nextPizzaId++,name:"Veggie", price:10},
]

function addNewPizza(pizzaObj: Pizza): void {
    pizzaObj.id = nextPizzaId++
    menu.push(pizzaObj)
}

function placeOrder(pizzaName: string): Order |undefined {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if(!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`)
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder:Order = { id: nextOrderId++, pizza: selectedPizza, status:"ordered" }
    orderQueue.push(newOrder)
    return newOrder
}


// placeOrder("Chicken Bacon Ranch")


function completeOrder(orderId:number): Order | undefined{
    const order = orderQueue.find(order => order.id === orderId)
    if(!order){
        console.error(`${orderId} does not exist in queue`)
        return
    }
    order.status = "completed"
    return order
}

// completeOrder(1)

function getPizzaDetail(identifier : string | number): Pizza | undefined {
    if (typeof identifier === "string") {
        return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase())
    } else if(typeof identifier === "number"){
        return menu.find(pizza => pizza.id === identifier)
    } else{
        throw new TypeError("Parameter `identifier` must be either a string or a number")
    }
}


console.log("Menu:", menu)
// console.log("Cash in register:", cashInRegister )
// console.log("Order queue:", orderQueue)