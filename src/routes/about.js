import { getConnection } from "../database.js"

export const type = "GET"

export const route = "/about"

export const middleware = [];

export const action = function(req, res) {
	res.render("about", {
		title: "A Pause For Thought - About",
		header_title: "About",
		header_subtitle: "Our Mission, Purpose, and Place",
	})
}