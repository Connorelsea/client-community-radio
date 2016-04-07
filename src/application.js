import express from "express"
import { buildRoutes } from "./routes/utility/build"
import database from "./database.js"

let app = express()

let router = express.Router()
buildRoutes(router)
app.use(router)

database.connect()

app.listen(3000, function() {
    console.log("Server running on port 3000.")
})