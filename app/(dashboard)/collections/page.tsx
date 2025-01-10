"use client";    // Tells Next.js to treat this component as a client-side component.

import { columns } from "@/components/collections/CollectionColumns";   // Imports column definitions for the data table.
import { DataTable } from "@/components/custom ui/DataTable"; // Imports the DataTable component to display the collections.
import { Button } from "@/components/ui/button";  // Imports a button component to create a new collection.
import { Separator } from "@/components/ui/separator"; // Imports a separator component to visually separate content.
import { Plus } from "lucide-react"; // Imports the Plus icon to add visual appeal to the "Create Collection" button.
import { useEffect, useState } from "react"; // Imports hooks to handle data and updates when the page loads.


const Collections = () => {    // Creates the "Collections" page.
  const [loading, setLoading] = useState(true);    // Creates a loading state to track if collections are being loaded.
  const [collections, setCollections] = useState([]);     // Creates a state to store the list of collections.

  const getCollections = async () => {      // Fetches the collections data from the server.
    try {
      const res = await fetch("/api/collections", {   // Sends a request to get collections from the server.
        method: "GET",
      });
      const data = await res.json();       // Converts the server response into a readable format.
      setCollections(data);         // Updates the state with the fetched collections.
      setLoading(false);         // Marks loading as finished after getting the data.
    } catch (err) { 
      console.log("[collections_GET]", err);  // Logs an error if something goes wrong when fetching data.
    }
  };

  useEffect(() => {
    getCollections();        // Logs an error if something goes wrong when fetching data.
  }, []);

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify between">
       <p className="text-heading2-bold">Collections</p>  {/* Displays the title "Collections" */}
        <Button className="bg-blue-1 text-white">
          <Plus className="h-4 w-4 mr-2"/>   {/* Shows the Plus icon */}
          Create Collection
       </Button>
      </div>
      <Separator className="bg-grey-1 my-4"/>  {/* Adds a line to separate sections */}
      <DataTable columns={columns} data={collections} searchKey="title"/>  {/* Displays collections in a table where you can search by title */}
    </div>
  );
};

export default Collections;  // Makes the Collections page available for use in the app.

