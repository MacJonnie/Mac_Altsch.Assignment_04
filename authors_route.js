const express = require("express");
const router = express.Router();


const authors = [
  {name: "J.K Rowlins", book: "Harry Potter"},
  {name: "Chris Hemsworth", book: "Twilight"},
  {name: "T.J Omori", book: "Rome"}
];

router.use((req, res, next) => {
    console.log("request from authors");
    console.log("authentication", req.headers["authentication"]);
    console.log("Content-type", req.headers["content-type"]);
    next();
  });
  
router.get("/", (req, res) => {
    console.log("lastLayer middleware");
    res.send(JSON.stringify(authors));
  });
  
router.get("/authorsName", (req, res) => {
    console.log(req.params);
    const author = authors.find(c => c.name === req.body.name);
    if (!author) return res.status(404).send("Resource not found");
    res.send(authors);
  });
  
router.post("/:new", (req, res) => {
    console.log(req.params);
    const author = {
      name: req.body.name,
      book: req.body.book
    };
    authors.push(author);
    res.send(authors);
  });

router.put("/", (req, res) => {
    console.log(req.params);
    const author = authors.find(c => c.name === req.body.name);
    if (!author) return res.status(404).send("Resource not found");
    
    author.book = req.body.book
    res.send(authors);
  });

router.delete("/", (req, res) => {
    const author = authors.find(c => c.name === req.body.name);
    if (!author) return res.status(404).send("Resource not found");

    const index = authors.indexOf(author);
    authors.splice(index, 1);
    res.send(authors);
  });
  

module.exports = router;