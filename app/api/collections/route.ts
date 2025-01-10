import { connectToDB } from "@/lib/mongoDB";    // Imports the function to connect to the MongoDB database.
import { NextRequest, NextResponse } from "next/server";   // Imports Next.js functions for handling HTTP requests and responses.
 
import Collection from "@/lib/models/Collection";  // Imports the Collection model to interact with the collections in the database.
import { auth } from "@clerk/nextjs/server";   // Imports Clerk's auth function to check if the user is logged in.

export const POST = async (req: NextRequest) => {     // This handles the POST request to create a new collection.
    try {
        const { userId } = auth()           // Gets the user ID to check if the user is authenticated.

        if(!userId) {
            return new NextResponse("Unathorized", { status:403 })  // If user is not logged in, return an "Unauthorized" response.
        }

        await connectToDB() // Connects to the database.

        const { title, description, image } = await req.json()   // Extracts title, description, and image from the incoming request.
        
        const existingCollection = await Collection.findOne({ title }) // Checks if a collection with the same title already exists.

        if (existingCollection) {  // If the collection exists, return a "Collection already exists" response.
           return new NextResponse("Collection already exists", { status:400 })  
        }

        if (!title || !image) {    // If title or image is missing, return an error.
            return new NextResponse("Title and image are required", { status:400 })
        }

        const newCollection = await Collection.create({  // Creates a new collection with the provided details.
            title,
            description,
            image,
        })

        await newCollection.save()  // Saves the new collection to the database.

        return NextResponse.json(newCollection, { status:200 })   // Returns the new collection as a response.
    } catch (err) {
        console.log("[collections_POST]", err)  // Logs any errors that occur during the POST request.
        return new NextResponse("Internal Server Error", { status:500 }) // Returns a 500 error if something goes wrong.
    }
}

export const GET = async (req: NextRequest) => { // This handles the GET request to retrieve all collections.
    try {
      await connectToDB() // Connects to the database.
  
      const collections = await Collection.find().sort({ createdAt: "desc" }) // Retrieves all collections, sorted by creation date in descending order.
  
      return NextResponse.json(collections, { status: 200 }) // Returns the collections as a JSON response.
    } catch (err) {
      console.log("[collections_GET]", err)        // Logs any errors that occur during the GET request.
      return new NextResponse("Internal Server Error", { status: 500 })        // Returns a 500 error if something goes wrong.
    }
  }
  
  export const dynamic = "force-dynamic";  // Tells Next.js to always generate a dynamic response for this page.