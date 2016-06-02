import { getConnection } from "../database.js"

export const type = "GET"

export const route = "/blog"

export const middleware = [];

export const action = function(req, res) {

	new Promise((resolve, reject) => {

		getConnection().query("SELECT * FROM blog", (err, rows) => {

			if (err) {
				reject(err)
			} else {
				resolve(rows)
			}

		})

	}).then(rows => {

		let posts = []

		for (let i = 0; i < rows.length; i++) {
			
			posts.push({
				id:      rows[i].id,
				poster:  rows[i].poster,
				section: rows[i].section,
				tags:    rows[i].tags.split(","),
				title:   rows[i].title,
				body:    rows[i].body,
				description: rows[i].description,
			})
		}

		return posts

	}).then(posts => {

		res.render("blog", {
			title: "A Pause For Thought - Blog",
			header_title: "Blog",
			header_subtitle: "Thoughts from Myself and Viewers",
			posts: posts
		})

	})

}
