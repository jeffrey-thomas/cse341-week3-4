import { dbInit, getDbClient } from "../data/database.js";
import { ObjectId } from "mongodb";

await dbInit();
const mongo = getDbClient();

export const booksController = {
  getAll: async (req, res) => {
    //#swagger.tags=['Books']
    const result = await mongo.db("cse341").collection("books").find();
    result.toArray().then((books) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(books);
    });
  },

  getSingle: async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const result = await mongo
      .db("cse341")
      .collection("books")
      .find({ _id: bookId });
    result.toArray().then((books) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(books[0]);
    });
  },

  getByIsbn: async (req,res)=> {
    //#swagger.tags=['Books']
    const isbn = req.params.isbn;
    const result = await mongo.db("cse341").collection("books").find({isbn:isbn});
    result.toArray().then((books) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(books[0]);
      });
  },

  createBook: async (req, res) => {
    //#swagger.tags=['Books']
    const book = {
      isbn: req.body.isbn,
      title: req.body.title,
      author:req.body.author,
      publisher: req.body.publisher,
      year: req.body.year,
      edition:req.body.edition,
      format: req.body.format,
    };

    const response = await mongo
      .db("cse341")
      .collection("books")
      .insertOne(book);

    //Check database response
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "An error occurred while inserting the book.",
        );
    }
  },

  updateBook: async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);

    const book = {
        isbn: req.body.isbn,
        title: req.body.title,
        author:req.body.author,
        publisher: req.body.publisher,
        year: req.body.year,
        edition:req.body.edition,
        format: req.body.format,
    };

    const response = await mongo
      .db("cse341")
      .collection("books")
      .replaceOne({ _id: bookId }, book);

    //Check database response
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "An error occurred while updating the book.",
        );
    }
  },

  deleteBook: async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);

    const response = await mongo
      .db("cse341")
      .collection("books")
      .deleteOne({ _id: bookId });

    //check mongo respose
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "An error occurred while deleting the book.",
        );
    }
  },
};
