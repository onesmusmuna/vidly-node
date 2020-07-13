const express = require("express");

const homeRouter = require("./routes/home.js");
const genresRouter = require("./routes/genres.js");

const app = express();

app.use(express.json());
app.use("/api/genres", genresRouter);
app.use("/", homeRouter);

app.listen(3000, () => console.log("sever running @ port 3000"));
