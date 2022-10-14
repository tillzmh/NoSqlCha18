const router = require('express').Router();
const thought = require('./thought');
const users = require('./users');

router.use('/thought', thought)
router.use('/users', users);

module.exports = router;