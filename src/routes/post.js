import { getConnection } from "../database.js"

export const type = "GET"

export const route = "/blog/:post"

export const middleware = [];

export const action = function(req, res) {

	new Promise((resolve, reject) => {

		getConnection().query(
			`SELECT * FROM blog 
			WHERE id = ${req.params.post}`,
			(err, rows) => {

				if (err) {
					reject(err)
				} else {
					resolve(rows)
				}

			}
		)

	}).then(posts => {

		const post = posts[0]

		res.render("blog_post", {
			title: "A Pause For Thought - Post",
			header_title: `${post.title}`,
			header_subtitle: `Written By ${post.poster}`,
			post: post
		})

	})

}
