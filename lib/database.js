"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require("mysql");

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var host = "localhost";
var user = "mysql";
var password = "";
var database = "radio";

var connection = _mysql2.default.createConnection({
    host: host, user: user, password: password, database: database
});

var connect = function connect() {

    connection.connect(function (err) {

        if (err) {
            console.log("MySQL: Connection error");
        } else {
            console.log("MySQL: Connected successfully");
        }
    });
};

var getConnection = function getConnection() {
    return connection;
};

exports.default = {
    connection: connection, connect: connect, getConnection: getConnection
};