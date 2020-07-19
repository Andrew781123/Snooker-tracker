const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.on("error", () =>
  console.error("Cannot connect to database")
);
mongoose.connection.once("open", function () {
  console.log("connected to database");
});
