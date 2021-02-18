const express = require("express")
const application = express()
const router = express.Router()
const shoppingList = require("./shopping_list") 


application.use(express.urlencoded({extended: false}))
application.use(express.json())
application.use(router)

let list = new shoppingList()

router.get('/', (req, res, next) => {
    res.send("This is the webpage.")
})

router.get('/items', (req, res, next) =>{
    res.send(list.getItems)
})


router.get('/items/:id', (req, res, next) => {
    res.send(list.searchItem(req.params.id))
})

router.post('/items', (req, res, next) => {
    list.addItem(req.body.name, req.body.price)
    res.send(list.getItems)
})

router.patch('/items/:id', (req, res, next) => {
    list.updateItem(req.params.id, req.body.price)
    res.send(list.getItems)
})

router.delete('/items/:id', (req, res, next) => {
    list.deleteItem(req.params.id)
    res.send(list.getItems)
})

application.listen("3000", () => {console.log("Listenning to the app on port 3000")})