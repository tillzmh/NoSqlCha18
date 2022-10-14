const router = require('express').Router();
const apiRoutes = require('./api/index');


router.use('/api', apiRoutes);

router.use((res) => {
    res.status(404).send('404 Not Found');
});

module.exports = router;

