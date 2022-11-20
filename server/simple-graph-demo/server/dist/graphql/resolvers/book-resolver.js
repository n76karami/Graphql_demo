"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterBooksByAuthorID = exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _generateNumericString = _interopRequireDefault(require("../../@lib/utils/generateNumericString"));

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var dbDirectory = _path["default"].join(process.cwd(), '/src/db/book');

if (!(0, _fs.existsSync)(dbDirectory)) {
  (0, _fs.mkdirSync)(dbDirectory);
}

var generateID = function generateID() {
  return "".concat(new Date().getTime()).concat((0, _generateNumericString["default"])(6));
};

var getBooks = function getBooks() {
  return (0, _fs.readdirSync)(dbDirectory).map(function (item) {
    return JSON.parse((0, _fs.readFileSync)(_path["default"].join(dbDirectory, item), {
      encoding: "utf8"
    }));
  });
};

var getBookById = function getBookById(_id) {
  return JSON.parse((0, _fs.readFileSync)(_path["default"].join(dbDirectory, "".concat(_id, ".txt")), {
    encoding: "utf8"
  }));
};

var _createBook = function createBook(data) {
  var book = _objectSpread(_objectSpread({
    _id: generateID()
  }, data), {}, {
    createdAt: new Date().toISOString()
  });

  (0, _fs.writeFileSync)(_path["default"].join(dbDirectory, "".concat(book._id, ".txt")), JSON.stringify(book), "utf8");
};

var _editBook = function editBook(_id, data) {
  var thisBook = getBookById(_id);
  thisBook.title = data.title;
  (0, _fs.writeFileSync)(_path["default"].join(dbDirectory, "".concat(_id, ".txt")), JSON.stringify(thisBook), "utf8");
};

var filterBooksByAuthorID = function filterBooksByAuthorID(authorId) {
  return getBooks().filter(function (item) {
    return item.authorId === authorId;
  });
};

exports.filterBooksByAuthorID = filterBooksByAuthorID;
var _default = {
  Query: {
    getBooks: getBooks,
    getBook: function getBook(_, _ref) {
      var _id = _ref._id;
      return getBookById(_id);
    }
  },
  Mutation: {
    createBook: function createBook(_, data) {
      _createBook(data);

      return {
        msg: 'ok',
        status: 200
      };
    },
    editBook: function editBook(_, _ref2) {
      var _id = _ref2._id,
          title = _ref2.title;

      try {
        _editBook(_id, {
          title: title
        });

        return {
          msg: 'ok',
          status: 200
        };
      } catch (error) {
        throw error;
      }
    }
  }
};
exports["default"] = _default;