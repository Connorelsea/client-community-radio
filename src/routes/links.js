import { getConnection } from "../database.js"
import marked from "marked"

export const type = "GET"

export const route = "/links"

export const middleware = [];

export const action = function(req, res) {

  new Promise((resolve, reject) => {

    const query = `SELECT * FROM pages WHERE name='links'`

    getConnection().query(query, (err, rows) => {

      if (err) {
        reject(err)
      } else {
        resolve(rows[0])
      }

    })

  }).then(content => {

    const text = marked(content.text)

    res.render("links", {
      title: "A Pause For Thought - Links",
      header_title: "Important Links",
      header_subtitle: `A Collection of Relevant and Important Links`,
      text: text,
    })
  })

}
