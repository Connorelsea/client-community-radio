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

			console.log("TARGET POST in admin_INPUT.js")

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

		if (target === "show") {
			if (action === "submit") {

				const title  = req.body.title
				const link   = req.body.link
				const guests = req.body.guests
				const month  = req.body.month
				const day    = req.body.day
				const year   = req.body.year
				const description = req.body.description

				const show = {
					title, link, guests, month, day, year, description
				}

				const query = `INSERT INTO shows SET ?`

				getConnection().query(query, show, (err, rows) => {
					res.redirect("/shows")
					return true
				})

			}
		}

		if (target === "links") {
			if (action === "edit") {
				const text = req.body.text
				console.log(text)

				const query = `UPDATE pages SET text='${text}' WHERE name='links'`

				getConnection().query(query, (err, rows) => {
					res.redirect("/links")
					return true
				})
			}
		}

	})

}
