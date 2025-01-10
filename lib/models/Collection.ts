import mongoose from "mongoose";
    
const collectionSchema = new mongoose.Schema({  // Defines the schema for the "Collection" model
    title: {
       type: String, // Data type is a string
       required: true,  // Title is a required field
       unique: true,  // Title must be unique
    },
    description: String, // Description is optional and a string
    image: {
       type: String, // Image URL is a string
       required: true, // Image URL is a string
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId, // Refers to the "Product" model
            ref: "Product",  // References the "Product" model
        }
    ],
    createdAt: {
        type: Date, // Stores the creation date
        default: Date.now, // Sets default to the current date
    },
    updatedAt: {
        type: Date, // Stores the last updated date
        default: Date.now, // Sets default to the current date
    }
}) 

const Collection = mongoose.models.Collection || mongoose.model("Collection", collectionSchema); // Creates or uses the existing "Collection" model

export default Collection; // Exports the Collection model