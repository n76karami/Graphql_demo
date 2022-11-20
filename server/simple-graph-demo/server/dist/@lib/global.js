"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _fs = require("fs");

var dbDir = _path["default"].join(process.cwd(), '/src/db');

if (!(0, _fs.existsSync)(dbDir)) {
  (0, _fs.mkdirSync)(dbDir);
}

global.print = console.log;