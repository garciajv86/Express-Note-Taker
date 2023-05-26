const router = require('express').Router();
const routes = require('./homePage.js');
const notesRoutes = require('./notes.js');


router.use('/', routes);
router.use('/notes', notesRoutes);

module.exports = router;