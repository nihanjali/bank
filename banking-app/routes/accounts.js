const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    res.end("Accounts List");
});

module.exports = router;