const { Router } = require("express");
const { unlink } = require("fs-extra");
const path = require("path")

const router = Router();

const Book = require("../models/Book")

router.get("/", async (req, res) => {
    const books = await Book.find();
    res.json(books);
}); 

router.post("/", async (req, res) => {
    const { author, title, isbn} = req.body;
    const imagePath = "/uploads/" + req.file.filename;
    const newBook = new Book({author, title, isbn, imagePath});
    await newBook.save();
    res.send("Book saved");
})

router.delete("/:id", async (req, res) => {
    const bookDeleted = await Book.findByIdAndDelete(req.params.id);
    unlink(path.resolve("./back-end/public" + bookDeleted.imagePath));
    res.send("Book deleted:" + bookDeleted);
})

module.exports = router;