var cashInRegister = 100;
var nextOrderId = 1;
var nextPizzaId = 1;
var orderQueue = [];
var menu = [
    { id: nextPizzaId++, name: "Margherita", price: 8 },
    { id: nextPizzaId++, name: "Pepperoni", price: 15 },
    { id: nextPizzaId++, name: "Hawaiian", price: 9 },
    { id: nextPizzaId++, name: "Veggie", price: 10 },
];
function addNewPizza(pizzaObj) {
    pizzaObj.id = nextPizzaId++;
    menu.push(pizzaObj);
}
addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 15 });
addNewPizza({ name: "Spicy sausage", price: 11 });
function placeOrder(pizzaName) {
    var selectedPizza = menu.find(function (pizzaObj) { return pizzaObj.name === pizzaName; });
    if (!selectedPizza) {
        console.error("".concat(pizzaName, " does not exist in the menu"));
        return;
    }
    cashInRegister += selectedPizza.price;
    var newOrder = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" };
    orderQueue.push(newOrder);
    return newOrder;
}
// placeOrder("Chicken Bacon Ranch")
function completeOrder(orderId) {
    var order = orderQueue.find(function (order) { return order.id === orderId; });
    if (!order) {
        console.error("".concat(orderId, " does not exist in queue"));
        return;
    }
    order.status = "completed";
    return order;
}
// completeOrder(1)
function getPizzaDetail(identifier) {
    if (typeof identifier === "string") {
        return menu.find(function (pizza) { return pizza.name.toLowerCase() === identifier.toLowerCase(); });
    }
    else if (typeof identifier === "number") {
        return menu.find(function (pizza) { return pizza.id === identifier; });
    }
    else {
        throw new TypeError("Parameter `identifier` must be either a string or a number");
    }
}
console.log("Menu:", menu);
// console.log("Cash in register:", cashInRegister )
// console.log("Order queue:", orderQueue)
