import { getConnection } from "../database.js"

export const type = "GET"

export const route = "/admin/posts"

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

  new Promise((resolve, reject) => {

    getConnection().query(
      `SELECT * FROM blog 
      WHERE approved = 0`,
      (err, rows) => {

        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }

      }
    )

  }).then(posts => {

    res.render("admin_posts", {
      title: "Admin - Unapproved Posts",
      header_title: "Admin Post Log",
      header_subtitle: "Approve and Un-Approve Posts",
      posts: posts,
    })

  })

}
