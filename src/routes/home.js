import { connection } from "../database.js"

export const type = "GET"

export const route = "/"

export const middleware = [];

export const action = function(req, res) {

	connection.query("SELECT * FROM blog", (err, rows) => {
		if (err) {
			console.log(err)
		} else {
			console.log(rows)
		}
	})
		
		
	res.render("home", {
		title: "A Pause For Thought - Home",
		message: "Hello there!"
	})
}