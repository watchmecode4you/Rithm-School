class shoppingList {
    constructor() {
        this.items = [
            {
                id: "i1",
                name: "bag",
                price: 29
            },
            {
                id: "i2",
                name: "shoes",
                price: 49
            },
            {
                id: "i4",
                name: "jacket",
                price: 79
            },
            {
                id: "i5",
                name: "hoodie",
                price: 59
            },
            {
                id: "i6",
                name: "beanie",
                price: 19
            },
        ]
    }

    get getItems() {
        return this.items
    }

    updateItem(id, price){
        let searchedItemIndex = this.items.findIndex((item) => {
            return item.id === id 
        })
        return this.items[searchedItemIndex].price = price
    }

    addItem(name, price) {
        this.items.push({ id: `i${this.items.length+1}`, name: name, price: price})
    }

    searchItem(id){
        let searchedItemIndex = this.items.findIndex((item) => {
            return item.id === id
        })
        return this.items[searchedItemIndex]
    }

    deleteItem(id){
        let searchedItemIndex = this.items.findIndex((item) => {
            return item.id === id
        })
        return this.items.splice([searchedItemIndex],1)
    }
}

module.exports = shoppingList