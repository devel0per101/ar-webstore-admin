import mongoose from "mongoose";

let isConnected: boolean = false;  // Keep track if MongoDB is connected

export const connectToDB = async (): Promise<void> => {  // Function to connect to MongoDB
    mongoose.set("strictQuery", true)     // Turn on strict mode for queries


    if (isConnected) {     // If already connected, stop the function here
        console.log("MongoDB is already connected");
        return;
    }
    
    try {
        await mongoose.connect(process.env.MONGODB_URL || "", {  // Try to connect to MongoDB using the URL in environment variable
            dbName: "Webstore_Admin" // Use this specific database
        })

        isConnected = true;  // If connected, set isConnected to true
        console.log("MongoDB is connected");
    } catch (err) {
        console.log(err)    // If there is an error, log it
    }
}       