import express from "express"
import { buildRoutes } from "./routes/utility/build"
import { createConnection, connect } from "./database.js"
import bodyParser from "body-parser"

let app = express()

// Set up jade rendering
app.set("view engine", "jade")

app.use(express.static("res"))
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

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

	app.listen(process.env.PORT || 3000, function() {
		console.log("Application running")
	})

}).catch(err => {
	console.log("Error launching app: " + err)
})
