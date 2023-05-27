const router = require("express").Router();
const path = require("path");

//* GET Route for notes page
router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../", "public", "notes.html"))
);

module.exports = router;
