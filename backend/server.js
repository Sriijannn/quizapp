// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const internalRoutes = require("./routes/internal");

const app = express();
const options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html"],
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now());
  },
};

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
app.use(express.static(path.join(__dirname, "./public"), options));

// All other routes should redirect to the index.html

// Use the authentication routes
app.use("/api/auth", authRoutes);
app.use("/dashboard/api", dashboardRoutes);
app.use("/internal/api", internalRoutes);

app.route("/*").get((req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
