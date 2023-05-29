const router = require("express").Router();
const fs = require("fs");
const uniqueId = require("../helpers/uuid.js");
const path = require("path");

//* --------------------Retrieves the notes-------------------- *//
router.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "..", "db", "db.json"), (err, data) => {
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

//* --------------------Saves new notes-------------------- *//
router.post("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "..", "db", "db.json"), (err, data) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while reading the file" });
      return;
    }
    try {
      const notes = JSON.parse(data);
      const newNote = req.body;

      // Assign a unique ID to the new note
      const newNoteWithId = { ...newNote, id: uniqueId() }; // Assuming you have a function called uniqueId to generate the ID

      notes.push(newNoteWithId);

      // Save the updated notes array back to the JSON file
      fs.writeFile(
        path.join(__dirname, "..", "db", "db.json"),
        JSON.stringify(notes, null, 2),
        (err) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .json({ error: "An error occurred while saving the note." });
            return;
          }

          res.status(201).json(newNoteWithId);
        }
      );
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while parsing the JSON data." });
    }
  });
});

//* --------------------Deletes note-------------------- *//
router.delete("/notes/:id", (req, res) => {
  fs.readFile(path.join(__dirname, "..", "db", "db.json"), (err, data) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while reading the file" });
    }
    try {
      const notes = JSON.parse(data);
      const noteID = req.params.id;

      const index = notes.findIndex((note) => note.id === noteID);

      if (index !== -1) {
        //* Removes the note at the specified index
        notes.splice(index, 1);
        fs.writeFile(
          path.join(__dirname, "..", "db", "db.json"),
          JSON.stringify(notes),
          (err) => {
            if (err) {
              console.error(err);
              res
                .status(500)
                .json({ error: "An error occurred while updating the file" });
            } else {
              //* Successful deletion, no content to return
              res.sendStatus(204);
            }
          }
        );
      } else {
        //* Note with the specified ID was not found
        res.status(404).json({ error: "Note not found" });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while parsing the JSON data." });
    }
  });
});

module.exports = router;
