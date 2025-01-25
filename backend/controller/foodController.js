import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item 

const  addFood = async (req,res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    let image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        image: image_filename
        
    })

    try {
        await food.save();
        res.json({success:true,message: "Food added successfully"})
    } catch (error) {
        console.error(error);
        res.json({success:false,message: "Error adding food"})
    }

}

// all food list
const listFood= async(req,res)=>{
    try {
        const foods = await foodModel.find({})
        res.json({success: true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success: false,message:"Error"})
        
    }
}

//remove 
const removeFood = async (req, res) => {
  try {
    // Validate request body
    if (!req.body._id) {
      return res
        .status(400)
        .json({ success: false, message: "Food ID is required" });
    }

    // Find the food item
    const food = await foodModel.findById(req.body._id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    // Delete the associated image file
    const imagePath = `uploads/${food.image}`;
    if (fs.existsSync(imagePath)) {
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.error("Error deleting image:", err);
        // Decide whether to proceed with deleting the database entry
        // For example, you can return an error if the image deletion fails
        // return res.status(500).json({ success: false, message: "Error deleting image" });
      }
    } else {
      console.warn("Image file not found:", imagePath);
    }

    // Delete the food item from the database
    await foodModel.findByIdAndDelete(req.body._id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Error in removeFood:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export {addFood,listFood,removeFood}