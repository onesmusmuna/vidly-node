const express = require("express");
const mongoose = require("mongoose");

const homeRouter = require("./routes/home.js");
const genreRouter = require("./routes/genre.js");
const movieRouter = require("./routes/movie.js");
const customerRouter = require("./routes/customer.js");
const rentalsRouter = require("./routes/rental.js");
const userRouter = require("./routes/User.js");
const authRouter = require("./routes/auth.js");

require("dotenv").config();
const app = express();

mongoose
  .connect("mongodb://localhost:27017/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(`Failed to connect to MongoDB... ${err}`));

app.use(express.json());
app.use("/", homeRouter);
app.use("/api/genres", genreRouter);
app.use("/api/movies", movieRouter);
app.use("/api/customers", customerRouter);
app.use("/api/rentals", rentalsRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => console.log("sever running @ port 3000"));

// obed pass 7923
