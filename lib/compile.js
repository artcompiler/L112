"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compiler = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* Copyright (c) 2016, Art Compiler LLC */


var _share = require("./share.js");

var _d = require("d3");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(0, _share.reserveCodeRange)(1000, 1999, "compile");
_share.messages[1001] = "Node ID %1 not found in pool.";
_share.messages[1002] = "Invalid tag in node with Node ID %1.";
_share.messages[1003] = "No async callback provided.";
_share.messages[1004] = "No visitor method defined for '%1'.";

var transform = function () {
  var table = {
    "TABLE": tbl,
    "THEAD": thead,
    "TBODY": tbody,
    "TR": tr,
    "TH": th,
    "TD": td,
    "LOGO-WIDTH": logoWidth,
    "WIDTH": width,
    "HEIGHT": height,
    "STACK-CHART": stackChart,
    "TREEMAP-CHART": treemapChart,
    "PROG": program,
    "EXPRS": exprs,
    "STR": str,
    "NUM": num,
    "IDENT": ident,
    "BOOL": bool,
    "LIST": list,
    "RECORD": record,
    "BINDING": binding,
    "ADD": add,
    "MUL": mul,
    "VAL": val,
    "KEY": key,
    "LEN": len,
    "STYLE": styleV1,
    "CONCAT": concat,
    "ARG": arg,
    "IN": inData,
    "LAMBDA": lambda,
    "PAREN": paren,
    "APPLY": apply,
    "MAP": map
  };
  var nodePool = void 0;
  var version = void 0;
  function getVersion(pool) {
    return pool.version ? +pool.version : 0;
  }
  function transform(code, data, resume) {
    nodePool = code;
    version = getVersion(code);
    return visit(code.root, data, resume);
  }
  function error(str, nid) {
    return {
      str: str,
      nid: nid
    };
  }
  function visit(nid, options, resume) {
    (0, _share.assert)(typeof resume === "function", (0, _share.message)(1003));
    // Get the node from the pool of nodes.
    var node = void 0;
    if ((typeof nid === "undefined" ? "undefined" : _typeof(nid)) === "object") {
      node = nid;
    } else {
      node = nodePool[nid];
    }
    (0, _share.assert)(node, (0, _share.message)(1001, [nid]));
    (0, _share.assert)(node.tag, (0, _share.message)(1001, [nid]));
    (0, _share.assert)(typeof table[node.tag] === "function", (0, _share.message)(1004, [JSON.stringify(node.tag)]));
    return table[node.tag](node, options, resume);
  }
  // BEGIN VISITOR METHODS
  function tbl(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "table",
        args: val1
      });
    });
  };
  function thead(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "thead",
        args: val1
      });
    });
  };
  function tbody(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "tbody",
        args: val1
      });
    });
  };
  function tr(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "tr",
        args: val1
      });
    });
  };
  function th(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "th",
        args: val1
      });
    });
  };
  function td(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume([].concat(err1), {
        type: "td",
        args: val1
      });
    });
  };
  function logoWidth(node, options, resume) {
    visit(node.elts[0], options, function (err, val0) {
      visit(node.elts[1], options, function (err, val1) {
        val1.logoWidth = val0;
        resume([], val1);
      });
    });
  }
  function width(node, options, resume) {
    visit(node.elts[0], options, function (err, val0) {
      visit(node.elts[1], options, function (err, val1) {
        val1.width = val0;
        resume([], val1);
      });
    });
  }
  function height(node, options, resume) {
    visit(node.elts[0], options, function (err, val0) {
      visit(node.elts[1], options, function (err, val1) {
        val1.height = val0;
        resume([], val1);
      });
    });
  }
  function packChart(node, options, resume) {
    visit(node.elts[0], options, function (err0, val0) {
      var data = stratify(val0);
      resume([].concat(err0), {
        type: "pack-chart",
        args: {
          data: data
        }
      });
    });
  }
  function renderCategory(data) {
    var categoryName = data.name;
    var children = data.children;
    var products = [];
    children.forEach(function (child) {
      products.push({
        "type": "tr",
        "args": [{
          "type": "td",
          "style": {
            "borderWidth": "0px",
            "padding": "0px 0 5"
          },
          "args": [{
            "type": "a",
            "style": {
              "color": "#333"
            },
            "attrs": {
              "href": child.url
            },
            "args": [{
              "type": "div",
              "style": {
                "background": "#FFF",
                "borderWidth": "1px",
                "padding": "10 10",
                "borderColor": "#cccece",
                "borderStyle": "solid",
                "borderRadius": "5px"
              },
              "args": [{
                "type": "img",
                "style": {
                  "margin": "0 5 0 0",
                  "width": "20",
                  "height": "20"
                },
                "attrs": {
                  "src": child.logo
                }
              }, {
                "type": "str",
                "style": {
                  "margin": "12px 0"
                },
                "value": child.name
              }]
            }]
          }]
        }]
      });
    });
    return {
      "type": "col-2",
      "style": {
        "padding": "5px"
      },
      "args": [{
        "type": "div",
        "style": {
          "background": "#f6f6f6",
          "borderWidth": "1",
          "borderColor": "#cccece",
          "borderStyle": "solid",
          "borderRadius": "5px",
          "padding": "5px"
        },
        "args": [{
          "type": "table",
          "style": {
            "marginBottom": "0"
          },
          "args": [{
            "type": "thead",
            "args": [{
              "type": "tr",
              "args": [{
                "type": "th",
                "style": {
                  "borderWidth": "0px",
                  "padding": "5px 2px 10px"
                },
                "args": [{
                  "type": "str",
                  "style": {
                    "fontSize": "12"
                  },
                  "value": categoryName.toUpperCase()
                }]
              }]
            }]
          }, {
            "type": "tbody",
            "args": products
          }]
        }]
      }]
    };
  };
  function renderCompany(data) {
    if (!data.name || !data.children) {
      return {};
    }
    var companyName = data.name;
    var companyLogo = data.logo;
    var children = data.children;
    var categories = [];
    children.sort(function (a, b) {
      return b.children.length - a.children.length;
    });
    children.forEach(function (child) {
      categories.push(renderCategory(child));
    });
    return {
      "type": "container-fluid",
      "style": {
        "margin": "10 4"
      },
      "args": [{
        "type": "row",
        "style": {
          "margin": "4"
        },
        "args": [{
          "type": "col",
          "args": [{}]
        }, {
          "type": "col-4",
          "args": [{
            "type": "str",
            "style": {
              "fontSize": "13",
              "fontWeight": "600"
            },
            "value": "POWERED BY "
          }, {
            "type": "img",
            "style": {
              "margin": "0 0 2",
              "height": "22"
            },
            "attrs": {
              "src": "https://static.chief.io/static/logo/logo-sm.png"
            }
          }]
        }, {
          "type": "col",
          "args": [{}]
        }]
      }, {
        "type": "row",
        "style": {
          "margin": "4"
        },
        "args": [{
          "type": "col-12",
          "style": {
            "margin": "0",
            "padding": "0"
          },
          "args": [{
            "type": "img",
            "style": {
              "margin": "0 5 10 5",
              "width": "30",
              "height": "30"
            },
            "attrs": {
              "src": companyLogo
            }
          }, {
            "type": "str",
            "style": {
              "margin": "5",
              "fontSize": "30",
              "fontWeight": "400"
            },
            "value": companyName
          }]
        }]
      }, {
        "type": "row",
        "style": {
          "margin": "4"
        },
        "args": categories
      }]
    };
  }
  function stackChart(node, options, resume) {
    var data = options.data instanceof Array && options.data || [options.data];
    var root = renderCompany(data[0]);
    resume([], {
      type: "stack-chart",
      root: root
    });
  }
  function treemapChart(node, options, resume) {
    var data = options.data instanceof Array && options.data || [options.data];
    var root = stratify(data);
    resume([], {
      type: "treemap-chart",
      args: {
        data: root
      }
    });
  }
  function str(node, options, resume) {
    var val = node.elts[0];
    resume([], val);
  }
  function num(node, options, resume) {
    var val = node.elts[0];
    resume([], +val);
  }
  function ident(node, options, resume) {
    var val = node.elts[0];
    resume([], val);
  }
  function bool(node, options, resume) {
    var val = node.elts[0];
    resume([], !!val);
  }
  function concat(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      var str = "";
      if (val1 instanceof Array) {
        val1.forEach(function (v) {
          str += v;
        });
      } else {
        str = val1.toString();
      }
      resume(err1, str);
    });
  }
  function paren(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      resume(err1, val1);
    });
  }
  function list(node, options, resume) {
    if (node.elts && node.elts.length > 1) {
      visit(node.elts[0], options, function (err1, val1) {
        node = {
          tag: "LIST",
          elts: node.elts.slice(1)
        };
        list(node, options, function (err2, val2) {
          var val = [].concat(val2);
          val.unshift(val1);
          resume([].concat(err1).concat(err2), val);
        });
      });
    } else if (node.elts && node.elts.length > 0) {
      visit(node.elts[0], options, function (err1, val1) {
        var val = [val1];
        resume([].concat(err1), val);
      });
    } else {
      resume([], []);
    }
  }
  function inData(node, options, resume) {
    // If there is input data, then use it, otherwise use default data.
    if (node.elts.length === 0) {
      // No args, so use the given data or empty.
      var data = options.data ? options.data : [];
      resume([], data);
    } else {
      visit(node.elts[0], options, function (err1, val1) {
        if (false) {
          err1 = err1.concat(error("Argument must be a number.", node.elts[0]));
        }
        var data = options.data && Object.keys(options.data).length != 0 ? options.data : val1;
        resume([].concat(err1), data);
      });
    }
  }
  function arg(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      var key = val1;
      if (false) {
        err1 = err1.concat(error("Argument must be a number.", node.elts[0]));
      }
      resume([].concat(err1), options.args[key]);
    });
  }
  function args(node, options, resume) {
    resume([], options.args);
  }
  function lambda(node, options, resume) {
    // Return a function value.
    visit(node.elts[0], options, function (err1, val1) {
      visit(node.elts[1], options, function (err2, val2) {
        resume([].concat(err1).concat(err2), val2);
      });
    });
  }
  function apply(node, options, resume) {
    // Apply a function to arguments.
    visit(node.elts[1], options, function (err1, val1) {
      // args
      options.args = [val1];
      visit(node.elts[0], options, function (err0, val0) {
        // fn
        resume([].concat(err1).concat(err0), val0);
      });
    });
  }
  function map(node, options, resume) {
    // Apply a function to arguments.
    visit(node.elts[1], options, function (err1, val1) {
      // args
      var errs = [];
      var vals = [];
      val1.forEach(function (val) {
        options.args = [val];
        visit(node.elts[0], options, function (err0, val0) {
          vals.push(val0);
          errs = errs.concat(err0);
        });
      });
      resume(errs, vals);
    });
  }
  function binding(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      visit(node.elts[1], options, function (err2, val2) {
        resume([].concat(err1).concat(err2), { key: val1, val: val2 });
      });
    });
  }
  function record(node, options, resume) {
    if (node.elts && node.elts.length > 1) {
      visit(node.elts[0], options, function (err1, val1) {
        node = {
          tag: "RECORD",
          elts: node.elts.slice(1)
        };
        record(node, options, function (err2, val2) {
          val2[val1.key] = val1.val;
          resume([].concat(err1).concat(err2), val2);
        });
      });
    } else if (node.elts && node.elts.length > 0) {
      visit(node.elts[0], options, function (err1, val1) {
        var val = {};
        val[val1.key] = val1.val;
        resume([].concat(err1), val);
      });
    } else {
      resume([], {});
    }
  }
  function exprs(node, options, resume) {
    if (node.elts && node.elts.length > 1) {
      visit(node.elts[0], options, function (err1, val1) {
        node = {
          tag: "EXPRS",
          elts: node.elts.slice(1)
        };
        exprs(node, options, function (err2, val2) {
          var val = [].concat(val2);
          val.unshift(val1);
          resume([].concat(err1).concat(err2), val);
        });
      });
    } else if (node.elts && node.elts.length > 0) {
      visit(node.elts[0], options, function (err1, val1) {
        var val = [val1];
        resume([].concat(err1), val);
      });
    } else {
      resume([], []);
    }
  }
  function program(node, options, resume) {
    if (!options) {
      options = {};
    }
    visit(node.elts[0], options, function (err, val) {
      // Return the value of the last expression.
      resume(err, val.pop());
    });
  }
  function key(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      var key = val1;
      if (false) {
        err1 = err1.concat(error("Argument must be a number.", node.elts[0]));
      }
      visit(node.elts[1], options, function (err2, val2) {
        var obj = val2;
        if (false) {
          err2 = err2.concat(error("Argument must be a number.", node.elts[1]));
        }
        resume([].concat(err1).concat(err2), Object.keys(obj)[key]);
      });
    });
  }
  function val(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      var key = val1;
      if (false) {
        err1 = err1.concat(error("Argument must be a number.", node.elts[0]));
      }
      visit(node.elts[1], options, function (err2, val2) {
        var obj = val2;
        if (false) {
          err2 = err2.concat(error("Argument must be a number.", node.elts[1]));
        }
        resume([].concat(err1).concat(err2), obj[key]);
      });
    });
  }
  function len(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      var obj = val1;
      if (false) {
        err1 = err1.concat(error("Argument must be a number.", node.elts[0]));
      }
      resume([].concat(err1), obj.length);
    });
  }
  function add(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      val1 = +val1;
      if (isNaN(val1)) {
        err1 = err1.concat(error("Argument must be a number.", node.elts[0]));
      }
      visit(node.elts[1], options, function (err2, val2) {
        val2 = +val2;
        if (isNaN(val2)) {
          err2 = err2.concat(error("Argument must be a number.", node.elts[1]));
        }
        resume([].concat(err1).concat(err2), val1 + val2);
      });
    });
  }
  function mul(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      val1 = +val1;
      if (isNaN(val1)) {
        err1 = err1.concat(error("Argument must be a number.", node.elts[0]));
      }
      visit(node.elts[1], options, function (err2, val2) {
        val2 = +val2;
        if (isNaN(val2)) {
          err2 = err2.concat(error("Argument must be a number.", node.elts[1]));
        }
        resume([].concat(err1).concat(err2), val1 * val2);
      });
    });
  }
  function style(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      visit(node.elts[1], options, function (err2, val2) {
        resume([].concat(err1).concat(err2), {
          value: val1,
          style: val2
        });
      });
    });
  }
  function styleV1(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      visit(node.elts[1], options, function (err2, val2) {
        resume([].concat(err1).concat(err2), {
          style: val1,
          value: val2
        });
      });
    });
  }
  return transform;
}();
var render = function () {
  function escapeXML(str) {
    return String(str).replace(/&(?!\w+;)/g, "&amp;").replace(/\n/g, " ").replace(/\\/g, "\\\\").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function render(val, options, resume) {
    // Do some rendering here.
    resume([], val);
  }
  return render;
}();
var unpack = function unpack(name, data) {
  var kids = [];
  if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === "object") {
    Object.keys(data).forEach(function (k) {
      if (k !== "type" && k !== "logo") {
        var kid = {
          name: k,
          type: data[k].type,
          logo: data[k].logo
        };
        kid["children"] = unpack((data[k].type === "category" || data[k].type === "business") && k, data[k]);
        kids.push(kid);
      }
    });
    // if (name) {
    //   kids.push({
    //     name: name,
    //     type: "label",
    //   });
    // }
  }
  return kids.length && kids || undefined;
};
function stratifyNode(root, _ref) {
  var type = _ref.type,
      name = _ref.name,
      url = _ref.url,
      logo = _ref.logo,
      children = _ref.children,
      category = _ref.category,
      industry = _ref.industry;

  if (!root[name]) {
    root[name] = {
      type: type,
      //      name: name,
      logo: logo
    };
  }
  if (children) {
    children.forEach(function (data) {
      stratifyNode(root[name], data);
    });
  }
  return root;
}

function stratify(data) {
  var root = {};
  data.forEach(function (d) {
    stratifyNode(root, d);
  });
  root = {
    name: "root",
    children: unpack(null, root)
  };
  return root;
};
var compiler = exports.compiler = function () {
  exports.version = "v1.0.0";
  exports.compile = function compile(code, data, resume) {
    try {
      var options = {
        data: data
      };
      transform(code, options, function (err, val) {
        if (err.length) {
          resume(err, val);
        } else {
          render(val, options, function (err, val) {
            resume(err, val);
          });
        }
      });
    } catch (x) {
      console.log("ERROR with code");
      console.log(x.stack);
      resume(["Compiler error"], {
        score: 0
      });
    }
  };
}();