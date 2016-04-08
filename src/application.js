import express from "express"
import { buildRoutes } from "./routes/utility/build"
import database from "./database.js"

let app = express()

// Set up router
let router = express.Router()
buildRoutes(router)
app.use(router)

// Set up jade rendering
app.set("view engine", "jade")

// Connect to the database and launch the server
database.connect().then(function(value) {

    if (value.success === false) {
        console.log("Error: Program unable to run")
    } else {
        app.listen(3000, function() {
            console.log("Server running on port 3000.")
        })
    }

})
