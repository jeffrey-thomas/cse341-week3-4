import Router from "express";
import { booksRouter } from "./books.js";
import { swaggerRouter } from "./swagger.js";
import { readersRouter } from "./readers.js";

export const router = Router();

router.use("/", swaggerRouter);

router.get("/", (req, res) => {
  //#swagger.tags=['Hello Readers']
  res.send("Hello Readers");
});

router.use("/books", booksRouter);
router.use("/readers",readersRouter);
router.use(swaggerRouter);
