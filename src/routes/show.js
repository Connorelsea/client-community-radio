import { getConnection } from "../database.js"

export const type = "GET"

export const route = "/show/:id"

export const middleware = [];

export const action = function(req, res) {

  new Promise((resolve, reject) => {

    const query = `SELECT * FROM shows WHERE id = ${req.params.id}`

    getConnection().query(query, (err, rows) => {

      if (err) {
        reject(err)
      } else {
        resolve(rows[0])
      }

    })

  }).then(show => {
    res.render("show", {
      title: show.title,
      header_title: show.title,
      header_subtitle: `Show #${show.id} - A Pause For Thought`,
      show: show,
      route: "apauseforthought.com" + route.replace(":id", req.params.id)
    })
  })

}
