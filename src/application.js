import express from "express"
import { buildRoutes } from "./routes/utility/build"
import { createConnection, connect } from "./database.js"

let app = express()

// Set up jade rendering
app.set("view engine", "jade")

// Connect to the database and launch the server
connect().then(function(value) {

  if (value.success === false) {

  	console.log("Error: Program unable to run")
		return false

  } else {

		// Set up router
		let router = express.Router()
		buildRoutes(router)
		app.use(router)
    return true

  }

}).then(val => {

	app.listen(3000, function() {
		console.log("Application running on port 3000")
	})

}).catch(err => {
	console.log("Error launching app: " + err)
})
