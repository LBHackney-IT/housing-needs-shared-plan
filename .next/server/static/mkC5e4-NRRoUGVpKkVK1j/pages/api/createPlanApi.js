module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("zyWQ");


/***/ }),

/***/ "DaQf":
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),

/***/ "mEdd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./lib/use-cases/getPlan.js
class GetPlan {
  constructor({
    planGateway
  }) {
    this.planGateway = planGateway;
  }

  async execute({
    id
  }) {
    const plan = await this.planGateway.get({
      id
    });
    if (!plan) return null;
    return {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName
    };
  }

}
// CONCATENATED MODULE: ./lib/use-cases/createPlan.js
class createPlan_GetPlan {
  constructor({
    planGateway
  }) {
    this.planGateway = planGateway;
  }

  async execute({
    firstName,
    lastName
  }) {
    const plan = await this.planGateway.create({
      firstName,
      lastName
    });
    return {
      id: plan.id,
      firstName: plan.firstName,
      lastName: plan.lastName
    };
  }

}
// EXTERNAL MODULE: external "nanoid"
var external_nanoid_ = __webpack_require__("yOjx");

// EXTERNAL MODULE: ./lib/domain/index.js + 2 modules
var domain = __webpack_require__("yPT5");

// CONCATENATED MODULE: ./lib/gateways/planGateway.js


class planGateway_PlanGateway {
  constructor({
    client
  }) {
    this.client = client;
    this.tableName = 'plans';
  }

  async create({
    firstName,
    lastName
  }) {
    if (!firstName) throw new domain["a" /* ArgumentError */]('first name cannot be null.');
    if (!lastName) throw new domain["a" /* ArgumentError */]('last name cannot be null.');
    const id = Object(external_nanoid_["nanoid"])(20);
    const request = {
      TableName: this.tableName,
      Item: {
        id,
        created: new Date(Date.now()).toISOString(),
        firstName,
        lastName
      }
    };
    const result = await this.client.put(request).promise();
    return new domain["b" /* Plan */](result.Items[0]);
  }

  async get({
    id
  }) {
    if (!id) throw new domain["a" /* ArgumentError */]('id cannot be null.');
    const request = {
      TableName: this.tableName,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      }
    };
    const result = await this.client.query(request).promise();
    if (result.Items.length === 0) return null;
    return new domain["b" /* Plan */](result.Items[0]);
  }

}
// EXTERNAL MODULE: external "aws-sdk"
var external_aws_sdk_ = __webpack_require__("DaQf");
var external_aws_sdk_default = /*#__PURE__*/__webpack_require__.n(external_aws_sdk_);

// CONCATENATED MODULE: ./lib/dependencies.js




const config = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'foo',
  secretAccessKey: 'bar'
};
const client = new external_aws_sdk_default.a.DynamoDB.DocumentClient({
  config
});
const planGateway = new planGateway_PlanGateway({
  client
});
const getPlan = new GetPlan({
  planGateway
});
const createPlan = new createPlan_GetPlan({
  planGateway
});
/* harmony default export */ var dependencies = __webpack_exports__["a"] = ({
  getPlan,
  createPlan
});

/***/ }),

/***/ "yOjx":
/***/ (function(module, exports) {

module.exports = require("nanoid");

/***/ }),

/***/ "yPT5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ ArgumentError; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ Plan; });

// CONCATENATED MODULE: ./lib/domain/argumentError.js
class ArgumentError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ArgumentError);
    }

    this.name = 'ArgumentError';
    this.date = new Date();
  }

}
// CONCATENATED MODULE: ./lib/domain/plan.js
class Plan {
  constructor({
    id,
    created,
    firstName,
    lastName
  }) {
    this.id = id;
    this.created = created;
    this.firstName = firstName;
    this.lastName = lastName;
  }

}
// CONCATENATED MODULE: ./lib/domain/index.js




/***/ }),

/***/ "zyWQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_dependencies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("mEdd");
/* harmony import */ var _lib_domain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("yPT5");


/* harmony default export */ __webpack_exports__["default"] = (async (req, res) => {
  if (req.method === 'POST') {
    try {
      const result = await _lib_dependencies__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].execute({
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });
      res.status(200).json(result);
    } catch (err) {
      //log error here
      if (err instanceof _lib_domain__WEBPACK_IMPORTED_MODULE_1__[/* ArgumentError */ "a"]) {
        return res.status(400).json({
          error: `could not create plan`
        });
      }

      res.status(500).json({
        error: `could not create plan with firstName=${req.body.firstName}, lastName=${req.body.lastName}`
      });
    }
  }
});

/***/ })

/******/ });