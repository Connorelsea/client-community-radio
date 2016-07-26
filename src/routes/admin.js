import { getConnection } from "../database.js"

export const type = "GET"

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

			console.log("TARGET POST in ADMIN.js")

			/*
			 * POST : SUBMIT
			 * This shows the form for manual creation of a
			 * new blog post
			 */
			if (action === "create") {

				res.render("form", {
					title: "A Pause For Thought - Blog Creation",
					header_title: "Create Blog Post",
					header_subtitle: "Admin Panel: Submit an Official Blog Post",
					form: {
						submit_link: `/admin/post/submit?password=${password}`,
						elements: [
							{
								type: "input",
								name: "title",
								desc: "Title:The title of your blog post." },
							{
								type: "input",
								name: "poster",
								desc: "Author:The name of the author of your blog post." },
							{
								type: "input",
								name: "tags",
								desc: "Tags:Tags that represent topics this post falls under. Represent the tags as a comma-separated list." },
							{
								type: "textarea",
								name: "description",
								desc: "Description:A brief description of this post that will be listed publically. Consider putting an excerpt of the first few sentences as the description." },
							{
								type: "textarea",
								name: "body",
								desc: "Body:This the body/content/writing of your post" },
						]
					}
				})

			}

			if (action === "view") {

			}

			if (action === "approve") {
				const id = req.query.id

				const query = `UPDATE blog SET approved=1 WHERE id=${id};`

				console.log("QUERY: " + query)

				getConnection().query(query, (err, rows) => {
					console.log("REDIRECT")
					res.redirect("/admin?password=password")
					return true
				})
			}

			if (action === "remove") {
				const id = req.query.id

				const query = `DELETE FROM blog WHERE id=${id};`

				console.log("QUERY: " + query)

				getConnection().query(query, (err, rows) => {
					console.log("REDIRECT")
					res.redirect("/admin?password=password")
					return true
				})
			}

		}

		if (target === "links") {

			if (action === "edit") {

			  new Promise((resolve, reject) => {

			    getConnection().query(
			      `SELECT * FROM pages 
			      WHERE name = 'links'`,
			      (err, rows) => {

			        if (err) {
			          reject(err)
			        } else {
			          resolve(rows[0].text)
			        }

			      }
			    )

			  }).then(text => {

			  	console.log("DEFAULT VALUE: " + text)

			  	res.render("form", {
						title: "A Pause For Thought - Edit Links",
						header_title: "Edit Links",
						header_subtitle: "Admin Panel: Edit Link Content",
						form: {
							submit_link: `/admin/links/edit?password=${password}`,
							elements: [
								{
									type: "textarea",
									name: "text",
									desc: "Page Content: In the text box below, you can change the content of the links page. This uses an online writing 'syntax' called Markdown Language. To learn how to write links and other elements of a page, visit http://www.markdowntutorial.com/ for more details.",
									defaultValue: text, },
							]
						}
					})

			  })

			}

		}

		if (target === "show") {

			if (action === "create") {

				res.render("form", {
					title: "A Pause For Thought - Show Creation",
					header_title: "Create Show",
					header_subtitle: "Admin Panel: Submit an Official Show",
					form: {
						submit_link: `/admin/show/submit?password=${password}`,
						elements: [
							{
								type: "input",
								name: "title",
								desc: "Title:The title of this show. Making this too long may cause display issues. Remember you can expand on the show details in the description." },
							{
								type: "input",
								name: "link",
								desc:"YouTube Link: Open your YouTube video. Under it, click the 'Share' tab. After 'youtu.be/', there should be a code with seemingly random characters. Paste those characters into this text box below.", },
							{
								type: "input",
								name: "guests",
								desc: "Guests:Guests that appear on the show. Represent the guests as a comma-separated list. For example, \"Tom Perry, Paul Rand, Susan Bethany\"" },
							{
								type: "input",
								name: "month",
								desc: "Month:The full name of the month that this show aired. Such as 'May' or 'June'.",
							},
							{
								type: "input",
								name: "day",
								desc: "Day:The number of the day that this show aired. Such as '5' or '1'. Leave off the 'th' or 'st', etc."
							},
							{
								type: "input",
								name: "year",
								desc: "Year:The full year that this show aired. Such as '2015' or '2016'."
							},
							{
								type: "textarea",
								name: "description",
								desc: "Description:A brief description of this show that will be listed publically." 
							},
						]
					}
				})

			}

		}

		if (target === "schedule") {

			if (action === "edit") {

			  new Promise((resolve, reject) => {

			    getConnection().query(
			      `SELECT * FROM pages 
			      WHERE name = 'schedule'`,
			      (err, rows) => {

			        if (err) {
			          reject(err)
			        } else {
			          resolve(rows[0].text)
			        }

			      }
			    )

			  }).then(text => {

					res.render("form", {
						title: "A Pause For Thought - Schedule Creation",
						header_title: "Edit Schedule Content",
						header_subtitle: "Admin Panel: Edit Schedule Content",
						form: {
							submit_link: `/admin/post/submit?password=${password}`,
							elements: [
								{
									type: "textarea",
									name: "content",
									desc: "Page Content: In the text box below, you can change the content of the schedule page. This uses an online writing 'syntax' called Markdown Language. To learn how to write links and other elements of a page, visit http://www.markdowntutorial.com/ for more details.",
									defaultValue: text },
							]
						}
					})

			  })

			}

		}

	})

}
