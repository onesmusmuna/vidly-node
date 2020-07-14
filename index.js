const express = require("express");
const mongoose = require("mongoose");

const homeRouter = require("./routes/home.js");
const genresRouter = require("./routes/genres.js");

// the 4 line below, makes the deprecation warnings go away, especially we i use findByIdAndUpdate
// Do this before creating a connection
// https://mongoosejs.com/docs/deprecations.html
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose
  .connect("mongodb://localhost:27017/genre", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(`Failed to connect to MongoDB... ${err}`));

const app = express();

app.use(express.json());
app.use("/api/genres", genresRouter);
app.use("/", homeRouter);

app.listen(3000, () => console.log("sever running @ port 3000"));
