const express = require('express');
const router = express.Router();

// Web Router

router.get('/', (req, res) => {
    res.render('main/call');
});

module.exports = router;