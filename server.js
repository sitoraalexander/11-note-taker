var express = require("express");

const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Creating an "express" server
var app = express();

// Sets an initial port
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Provide routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Start server

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
