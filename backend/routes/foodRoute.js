import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controller/foodController.js";

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify the directory to save the file
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // use the original file name
  }
});

const upload = multer({ storage: storage });

const foodRouter = express.Router();

// Use the upload middleware for the addFood route
foodRouter.post("/add", upload.single('image'), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;