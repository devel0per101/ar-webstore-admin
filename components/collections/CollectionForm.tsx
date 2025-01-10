"use client" // This makes the code run in the user's browser.

import { zodResolver } from "@hookform/resolvers/zod" // Importing Zod to validate form data.
import { useForm } from "react-hook-form"  // Importing hook for handling forms in React.
import { z } from "zod"  // Zod is used for data validation.
import { useRouter } from "next/navigation"; // Importing router to navigate after form submission.


import { Separator } from "../ui/separator"  // import a component to separate sections of the page visually.
import { Button } from "@/components/ui/button"  // This imports the button component for submitting the form.
import {     // Importing various form components like labels, controls, and error messages.
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";   
import { Input } from "@/components/ui/input";  // Importing input fields for the form.
import { Textarea } from "../ui/textarea";  // Importing a text area field for description.
import ImageUpload from "../custom ui/ImageUpload"; // Importing a custom component for image upload.
import { useState } from "react";  // // Importing useState for managing form loading state.
import toast from "react-hot-toast";  // Importing toast for notifications (success/error messages).

const formSchema = z.object({    // Defining the structure of the form using Zod.
  title: z.string().min(2).max(20),  // Title must be a string between 2 and 20 characters.
  description: z.string().min(2).max(500).trim(),  // Description must be a string between 2 and 500 characters.
  image: z.string()  // Image must be a string (URL or file path).
})

const CollectionForm = () => { 
  const router = useRouter();  // Using router to navigate after form submission.

  const  [loading, setLoading] = useState(false);  // Using state to track if the form is loading.

  const form = useForm<z.infer<typeof formSchema>>({  // Setting up the form using react-hook-form and validating it with Zod.
    resolver: zodResolver(formSchema), 
    defaultValues: { // Default values for the form fields.
      title: "",
      description: "",
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {   // Function to handle form submission.
   try {
    setLoading(true);  // Set loading to true when submitting.
    const res = await fetch("/api/collections",{ // Sending a POST request to create a new collection.
      method: "POST",
      body: JSON.stringify(values), // Sending form values in the request body.
    });
     if (res.ok) {
      setLoading(false);  // Stop loading if the submission was successful.
      toast.success("Collection created");  // Show success message.
      router.push("/collections");         // Redirect to collections page after success.
     }

   } catch (err) {
    console.log("[collection_POST]", err);  // Log errors if something goes wrong.
    toast.error("Something went wrong! Please try again."); // Show error message if something fails.
   }
  
  };

  return (
    <div className="p-10"> {/* Adding padding around the form */}
      <p className="text-heading2-bold">Create Collection</p> {/* Title of the page */}
      <Separator className="bg-grey-1 mt-4 mb-7" /> {/* A separator line between title and form */}
      <Form {...form}>  {/* Wrapping the form inside the Form component */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">  {/* Handling form submit */}

          {/* Title Input */}
          <FormField 
            control={form.control}
            name="title"              
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Textarea */}
          <FormField               
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField               
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">  {/* Submit and Discard Buttons */}
            <Button type="submit" className="bg-blue-1 text-white">Submit</Button>
            <Button type="button" onClick={() => router.push("/collections")}className="bg-blue-1 text-white">Discard</Button> {/* Discard button to navigate back */}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
