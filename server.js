const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware (allows us to accept req.body data in routes)
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the Travel Green API" })
);

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/actions", require("./routes/actions"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
