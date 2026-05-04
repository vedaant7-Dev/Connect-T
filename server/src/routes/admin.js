"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
router.post("/admin/login", function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    if (username === "vedant@7connectT" &&
        password === "vedant7@node.js") {
        return res.json({
            success: true,
            message: "Admin login success",
        });
    }
    return res.status(401).json({
        success: false,
        message: "Invalid credentials",
    });
});
exports.default = router;
