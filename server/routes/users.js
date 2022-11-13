const express = require('express');
const route = express.Router();
const router = express.Router();

router.get('/', (req, res) => {
    res.json([
        {
            username: "Radhika",
            age: 20
        },
        {
            username: "Zarish",
            age: 19
        }
    ])
});

module.exports = router;