const express = require("express");
const path = require("path");
const notes = require("./Develop/routes/index");
const { clog } = require("./Develop/middleware/clog");

const PORT = process.env.PORT || 3001;

const app = express();

//* Import custom middleware
app.use(clog);

//* Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//? app.use('/api', api);?
app.use("/", notes);

app.use(express.static(path.join(__dirname, "/Develop", "public")));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
