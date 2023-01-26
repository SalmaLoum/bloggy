const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bloggyRoutes = require('./bloggyRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/bloggy', bloggyRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
