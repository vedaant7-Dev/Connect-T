"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var health_1 = require("./health");
var admin_1 = require("./admin");
var router = (0, express_1.Router)();
router.use(health_1.default);
router.use(admin_1.default);
exports.default = router;
