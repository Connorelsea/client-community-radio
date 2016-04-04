import * as routes_obj from "./routes/index"

/*
 * Build Routes
 *
 * Applies appropriate routes to an Express router using data
 * specified about the program's routes in the routes/index file.
*/
export const buildRoutes = function(router) {

    let routes = routes_obj;

    if (routes_obj.default) routes = routes_obj.default

    for (let key in routes) {
        if (!routes.hasOwnProperty(key)) continue
        let route = routes[key]
        router.get(route.route, route.middleware, route.action)
    }
}