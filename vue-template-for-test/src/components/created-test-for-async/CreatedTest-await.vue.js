define(["exports", "@babel/runtime/regenerator", "@babel/runtime/helpers/asyncToGenerator", "./test"], function (_exports, _regenerator, _asyncToGenerator2, _test) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _regenerator = _interopRequireDefault(_regenerator);
  _asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);
  _test = _interopRequireDefault(_test);
  var __vue_scope_id__ = "undefined";
  var _default = {
    name: "created-test",
    mixins: [_test["default"]],
    data: function data() {
      return {};
    },
    // async created() {
    //   console.log("333333333333");
    //   await new Promise((resolve) => {
    //     console.log("44444444444");
    //     resolve();
    //   }).then(() => {
    //     console.log("6666666666666666");
    //   });
    //   console.log("1010101010101010");
    // },
    mounted: function mounted() {
      this.test1(); //相当于vue内部调用mixins里的created

      this.test2(); //相当于vue内部调用交易页面的created
    },
    methods: {
      test1: function test1() {
        return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log("111111");
                  _context.next = 3;
                  return new Promise(function (resolve) {
                    console.log("test1");
                    resolve();
                  }).then(function () {
                    console.log("test1 then");
                  });

                case 3:
                  console.log(3333333333); //添加事件监听的地方

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },
      test2: function test2() {
        return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  console.log("222222222");
                  _context2.next = 3;
                  return new Promise(function (resolve) {
                    console.log("test2");
                    resolve();
                  }).then(function () {
                    console.log("test2 then");
                  });

                case 3:
                  console.log(444444444444);

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      }
    } // async mounted() {
    //   console.log("======【mounted】333333333333");
    //   await new Promise((resolve) => {
    //     console.log("=====【mounted】44444444444");
    //     resolve();
    //   })
    //     .then(() => {
    //       console.log("=====【mounted】66666666666");
    //     })
    //     .then(() => {
    //       console.log("=====【mounted】8888888888888");
    //     });
    //   console.log("=====【mounted】1010101010101010");
    // },
    // methods: {},
    ,
    _scopeId: undefined,
    template: "\n<div></div>\n"
  };
  _exports["default"] = _default;
});