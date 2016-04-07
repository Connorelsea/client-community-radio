"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _build = require("./routes/utility/build");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var router = _express2.default.Router();
(0, _build.buildRoutes)(router);
app.use(router);

app.listen(3000, function () {
    console.log("Server running on port 3000.");
});