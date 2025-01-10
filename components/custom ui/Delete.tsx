"use client"  // Ensures this code runs on the user's browser.

import { useState } from 'react'; // Importing the `useState` hook to manage local state (like loading).
import { Trash } from 'lucide-react'; // Importing the trash icon from the Lucide library.

import {  // Importing AlertDialog components to create a confirmation dialog for deletion.
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '../ui/button';  // Importing the Button component to trigger the delete action.
import toast from 'react-hot-toast';  // Importing toast for showing success or error messages.

interface DeleteProps {  // Type for the `Delete` component, which takes an `id` as a prop to identify the collection to delete.
  id: string;
}

const Delete: React.FC <DeleteProps> = ({ id }) => {    // The Delete component that receives the collection `id` to be deleted.
  const [loading, setLoading] = useState(false);   // A state variable to track whether the deletion request is loading.

  const onDelete = async () => {      // This function handles the deletion of the collection.
    try {
      setLoading(true)        // Sets the loading state to true when the delete process starts.
      const res = await fetch(`/api/collections/${id}`, {
        method : "DELETE",          // Sends a DELETE request to the server to delete the collection.
      })

      if (res.ok) {          
        setLoading(false)     // Set the loading state to false after the request finishes.
        window.location.href = ("/collections")   // Redirect the user to the collections page after deletion.
        toast.success("Collection deleted")       // Show a success message using toast.
      }
    } catch (err) {       
      console.log(err)       // Log the error in the console.
      toast.error("Something went wrong. Please try again later.") // Show an error message using toast.
    }
  } 
  return (
    <AlertDialog> {/* Creates an alert dialog to confirm the deletion. */}
      <AlertDialogTrigger> {/* Triggers the alert dialog when clicked. */}
        <Button className='bg-red-1 text-white'>  {/* Button that starts the delete process with a trash icon. */}
          <Trash className='h-4 w-4' />           {/* Trash icon inside the button. */}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1"> {/* Content of the confirmation dialog. */}
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">Are you absolutely sure?</AlertDialogTitle> {/* Title asking the user for confirmation. */}
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your collection.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>  {/* Footer of the dialog with buttons */}
          <AlertDialogCancel>Cancel</AlertDialogCancel> {/* Button to cancel the deletion. */}
          <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>Delete</AlertDialogAction> {/* Button to confirm the deletion and trigger the onDelete function. */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;  // Export the Delete component for use elsewhere in the application.
