const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mukulgupta:Bg0X5PwVhA1zFXNR@namastenode.d6l0q.mongodb.net/devTinder"
  );
};
module.exports = connectDB;
