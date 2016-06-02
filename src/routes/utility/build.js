import * as routes_obj from "../index"

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
      	if (route.type === "POST") router.post(route.route, route.middleware, route.action)
      	else if (route.type === "GET") router.get(route.route, route.middleware, route.action)
      	else console.log("ERROR: UNSUPPORTED TYPE STRING FOR ROUTE")
    }
}
