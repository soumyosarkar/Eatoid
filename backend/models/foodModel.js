import mongoose from "mongoose";


const foodSchema = new mongoose.Schema({
    name: {type:String, required:true},
    price: {type:Number, required:true},
    category: {type:String, required:true},
    image: {type:String, required:true},
    description: {type:String, required:true},
    // quantity: Number,
    // sold: Number,
    // created_at: { type: Date, default: Date.now }
})

const foodModel =mongoose.model.food || mongoose.model("food",foodSchema)




export default foodModel;


