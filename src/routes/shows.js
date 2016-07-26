import { getConnection } from "../database.js"

export const type = "GET"

export const route = "/shows"

export const middleware = [];

export const action = function(req, res) {

	new Promise((resolve, reject) => {

		getConnection().query("SELECT * FROM shows", (err, rows) => {

			if (err) {
				reject(err)
			} else {
				resolve(rows)
			}

		})

	}).then(shows => {
		res.render("shows", {
			title: "A Pause For Thought - Shows",
			header_title: "Shows",
			header_subtitle: "Log of past shows",
			shows: shows
		})
	})

}
