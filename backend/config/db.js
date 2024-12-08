import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://eatoid:eatoid000@cluster0.b6ruz.mongodb.net/eatoid')
    .then(()=>console.log("DB Connected"))
    
}