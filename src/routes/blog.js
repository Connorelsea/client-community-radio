export const type = "GET"

export const route = "/blog"

export const middleware = [];

export const action = function(req, res) {
    res.send("blog");
}