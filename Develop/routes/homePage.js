const router = require('express').Router();
const path = require('path');

//* GET Route for homepage
router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../", "public", "index.html"))
);



// Export the router
module.exports = router;