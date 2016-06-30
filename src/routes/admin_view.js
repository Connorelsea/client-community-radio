import { getConnection } from "../database.js"

export const type = "GET"

export const route = "/admin"

export const middleware = [check_auth];

const password = "password"

function check_auth(req, res, next) {
	if (req.query.password === password) {
		next()
	} else {
		console.log("Middleware auth failed")
		res.redirect("/")
	}
}

export const action = function(req, res) {
	res.render("admin", {
		title: "Admin Page",
		header_title: "Admin",
		header_subtitle: "Access Admin Functionality",
		password,
	})
}
