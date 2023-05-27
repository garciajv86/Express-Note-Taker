const router = require("express").Router();
const routes = require("./homePage.js");
const notesRoute = require("./notes.js");
const fs = require("fs");

router.use("/notes", notesRoute);
router.use("/", routes);

//* Retrieves the notes
router.get("/api/notes", (req, res) => {
  fs.readFile("./Develop/db/db.json", (err, data) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: `An error occurred while reading the file.` });
      return;
    }
    try {
      const notes = JSON.parse(data);
      res.json(notes);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: `An error occurred while parsing the JSON data.` });
    }
  });
});

//* Saves new notes

//* Deletes note

module.exports = router;
