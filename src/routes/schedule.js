import { getConnection } from "../database.js"
import marked from "marked"

export const type = "GET"

export const route = "/schedule"

export const middleware = [];

export const action = function(req, res) {

	new Promise((resolve, reject) => {

		getConnection().query("SELECT * FROM pages WHERE name = 'schedule'", (err, rows) => {

			console.log(rows)

			if (err) {
				reject(err)
			} else {
				resolve(rows)
			}

		})

	}).then(shows => {

		const text = marked(shows[0].text)

		res.render("schedule", {
			title: "A Pause For Thought - Schedule",
			header_title: "Schedule",
			header_subtitle: "Upcoming Shows and Dates",
			text: text
		})

	})

}
