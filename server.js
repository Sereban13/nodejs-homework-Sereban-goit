// mongobd user data:
// login: Sereban, password: mENpfF0l3Ez30PhF

const mongoose = require("mongoose");
const app = require("./app");

const DbHost =
  "mongodb+srv://Sereban:mENpfF0l3Ez30PhF@cluster0.vkbil8p.mongodb.net/contacts_manager?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DbHost)
  .then(() => {
    app.listen(8000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
