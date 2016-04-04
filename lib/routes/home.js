"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var type = exports.type = "GET";

var route = exports.route = "/";

var middleware = exports.middleware = [];

var action = exports.action = function action(req, res) {
    res.send("Home");
};