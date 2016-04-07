"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildRoutes = undefined;

var _index = require("../index");

var routes_obj = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
 * Build Routes
 *
 * Applies appropriate routes to an Express router using data
 * specified about the program's routes in the routes/index file.
*/
var buildRoutes = exports.buildRoutes = function buildRoutes(router) {

    var routes = routes_obj;

    if (routes_obj.default) routes = routes_obj.default;

    for (var key in routes) {
        if (!routes.hasOwnProperty(key)) continue;
        var route = routes[key];
        router.get(route.route, route.middleware, route.action);
    }
};