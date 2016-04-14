import { getConnection } from "../database.js"

export const type = "GET"

export const route = "/"

export const middleware = [];

let q = function(resolve, reject) {

	getConnection().query("SELECT * FROM blog", (err, rows) => {

		if (err) {
			console.log("Query Error: " + err)
			reject(err)
		} else {
			resolve(rows)
		}

	})

}

export const action = function(req, res) {

	new Promise(q).then(rows => {

		let posts = []

		for (let i = 0; i < rows.length; i++) {
			posts.push({
				id:      rows[i].id,
				poster:  rows[i].poster,
				section: rows[i].section,
				tags:    rows[i].tags.split(","),
				title:   rows[i].title,
				body:    rows[i].body
			})
		}

		return posts

	}).then(posts => {

		let post_container = { my: [], your: [] }

		post_container.my   = posts.filter(x => x.section === "my")
		post_container.your = posts.filter(x => x.section === "your")

		return post_container

	}).then(posts => {

		res.render("home", {
			title: "A Pause For Thought - Home",
			message: "Hello there!",
			posts: posts
		})

	}).catch(err => {
		console.log("There was an error: " + err)
	})

}