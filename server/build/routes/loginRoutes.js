"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        return next(); // This doesnt actually return anthing.
        return; // Not returning anything
    }
    res.status(403);
    res.send("AAAHHHHH AHHHHHH AAHHHHHH.....You didn't say the magic word.");
}
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n    <form method=\"POST\"> \n      <div>\n        <label>Email</label>\n        <input name=\"email\"/>\n      </div>\n      <div>\n        <label>Password</label>\n        <input name=\"password\" type=\"password\"/>\n        <button> Submit </button>\n      </div>\n    </form>\n  \n  ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === "justin" && password === "password") {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send("Invalid email or password");
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div> You are logged in </div>\n        <a href=\"/logout\"> Logout </a>\n      </div>\n    ");
    }
    else {
        res.send("\n    <div>\n      <div> You are not logged in </div>\n      <a href=\"/login\"> Login </a>\n    </div>\n  ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send("Welcome to the good route");
});
