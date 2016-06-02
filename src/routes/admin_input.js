import { getConnection } from "../database.js"

export const type = "POST"

export const route = "/admin/:target/:action"

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

	const target = req.params.target
	const action = req.params.action

	new Promise((resolve, reject) => {

		if (target === "post") {

			/*
			 * POST : SUBMIT
			 * This submits a post using the form body data
			 * sent to this route
			 */
			if (action === "submit") {

				const poster = req.body.poster
				const tags = req.body.tags
				const title = req.body.title
				const body = req.body.body
				const description = req.body.description

				const post = {
					poster, tags, title, body, description, section: "my"
				}

				const query = `INSERT INTO blog SET ? `

				getConnection().query(query, post, (err, rows) => {
					res.redirect("/")
					return true
				})
			}

		}

	})

}
