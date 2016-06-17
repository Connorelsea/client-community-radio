import { getConnection } from "../database.js"

export const type = "GET"

export const route = "/user/:target/:action"

export const middleware = [];

export const action = function(req, res) {

	const target = req.params.target
	const action = req.params.action

	new Promise((resolve, reject) => {

		if (target === "post") {

			/*
			 * POST : SUBMIT
			 * This shows the form for manual creation of a
			 * new blog post
			 */
			if (action === "create") {

				res.render("form", {
					title: "A Pause For Thought - Blog Creation",
					header_title: "Submit Blog Post",
					header_subtitle: "Submit an Official Guest Blog Post for Approval",
					form: {
						submit_link: `/admin/post/submit`,
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
								name: "email",
								desc: "Email:Before a guest blog post is allowed on the site, it must be reviewed for profanity and appropriatness of content. Providing your email allows us to contact you with questions, and let you know if your blog post was accepted." },
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

		}

	})

}
