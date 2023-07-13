const router = require('express').Router();
const apiRoutes = require('./api');
const blogRoutes = require('./blogRoutes');

router.use('/api', apiRoutes);
router.use('/blog', blogRoutes);

module.exports = router;
