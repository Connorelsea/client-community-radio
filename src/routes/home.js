import { getConnection } from "../database.js"

export const type = "GET"

export const route = "/"

export const middleware = [];

export const action = function(req, res) {

	new Promise(function(resolve, reject) {

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

    return new Promise((resolve, reject) => {

        getConnection().query("SELECT * FROM shows", (err, rows) => {
            if (err) reject("error")
            else resolve({ posts: posts, shows: rows })
        })

    })

}).then(object => {

	let shows = []

	for (let i = 0; i < object.shows.length; i++) {
		shows.push({
			id: object.shows[i].id,
			title: object.shows[i].title,
			description: object.shows[i].description,
			date: object.shows[i].date,
			guests: object.shows[i].guests
		})
	}

	return {
		posts: object.posts, shows
	}

}).then(object => {

		let posts = object.posts

		let post_container = { my: [], your: [] }

		post_container.my   = posts.filter(x => x.section === "my")
		post_container.your = posts.filter(x => x.section === "your")

		return {
			posts: post_container,
			shows: object.shows
		}

	}).then(object => {

		res.render("home", {
			title: "A Pause For Thought - Home",
			message: "Hello there!",
			posts: object.posts,
			shows: object.shows
		})

	}).catch(err => {
		console.log("There was an error: " + err)
	})

}
