const express = require('express');
const router = express.Router();
const qs = require('query-string');
const eta = require('eta');

const { body,validationResult } = require('express-validator');

const getUserFromReq = (req) => {
    return req.token && req.token.user || null;
}

router.get("/", function (req, res) {
    res.render("template", {
        title: "Docker NodeJS Template!",
        body: "Hello, World!",
    });
})

module.exports = router;