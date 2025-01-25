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
const removeFood = async(req,res) => {
    try {
        const food = await foodModel.findById(req.body._id);
        
        // Check if the food item exists
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error("Error deleting image:", err);
            }
        });

        await foodModel.findByIdAndDelete(req.body._id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}


export {addFood,listFood,removeFood}