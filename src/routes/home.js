export const type = "GET"

export const route = "/"

export const middleware = [];

export const action = function(req, res) {
    res.render("home", { title: "Hey!", message: "Hello there!" })
}