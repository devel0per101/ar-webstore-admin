import { NextRequest, NextResponse } from "next/server"; // Imports Next.js functions to handle server-side requests and responses.
import { auth } from "@clerk/nextjs/server";  // Imports Clerk's auth function to verify user identity.

import { connectToDB } from "@/lib/mongoDB";  // Imports the function to connect to the MongoDB database.
import Collection from "@/lib/models/Collection";  // Imports the Collection model to interact with the collections in the database.

export const DELETE = async (    // This is a DELETE request handler to delete a collection.
    req: NextRequest, { params }: { params: { collectionId: string } }   
) => {
    try {
        const { userId } = auth(); // Gets the user ID from Clerk to check if the user is logged in.

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });  // If no user is logged in, send "Unauthorized" response.
        }

        await connectToDB(); // Connects to the database.

        await Collection.findByIdAndDelete(params.collectionId);   // Deletes the collection with the given collectionId from the database.
        return new NextResponse("Collection is deleted", { status: 200 });  // Sends a success message with status 200.
    } catch (err) {
        console.log("[collectionId_DELETE]", err);   // Logs any error that occurs during the delete operation.
        return new NextResponse("Internal error", { status: 500 });  // Sends an error message if something goes wrong with status 500.
    }
};  