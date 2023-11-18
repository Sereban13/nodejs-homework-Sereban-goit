// mongobd user data:
// login: Sereban, password: mENpfF0l3Ez30PhF

// const DB_HOST =
//   "mongodb+srv://Sereban:mENpfF0l3Ez30PhF@cluster0.vkbil8p.mongodb.net/db-contacts?retryWrites=true&w=majority";

const mongoose = require("mongoose");
const app = require("./app");

// const { DB_HOST } = require("./config.js");
const { DB_HOST } = process.env;
// console.log(process.env);

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(5000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
