const router = require("express").Router();
const routes = require("./homePage.js");
const notesRoute = require("./notes.js");
const apiRoute = require("./api.js");

router.use("/api", apiRoute);
router.use("/notes", notesRoute);
router.use("/", routes);

module.exports = router;
