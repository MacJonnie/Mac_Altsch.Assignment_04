const express = require("express");
const logger = require("./logger")
const authorsRoute = require("./authors_route")

const app = express();

app.use(express.json());
app.use(logger);

app.use("/authors", authorsRoute);

app.get("/", (req, res) => {
  res.send("Welcome to my collection");
});

app.all("*", (req, res) => {
  res.status(404).jsonp({ message: "Page not found" });
});

app.listen(8900, () => {
  console.log("Server is running on port 3000: Express.js");
});