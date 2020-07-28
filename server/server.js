if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const app = express();

require("./database");

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/auth", require("./routes/auth"));
app.use("/goals", require("./routes/goals"));
app.use("/users", require("./routes/users"));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
