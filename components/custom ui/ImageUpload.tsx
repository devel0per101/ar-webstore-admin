import { CldUploadWidget } from 'next-cloudinary'; // Importing Cloudinary widget to upload images to Cloudinary.
import { Plus, Trash } from 'lucide-react'; // Importing the icons for adding (+) and removing (trash) images.

import { Button } from '../ui/button'; // Importing custom button component.
import Image from 'next/image'; // Importing Next.js Image component to display images efficiently.

interface ImageUploadProps { 
    value: string[];      // Array of image URLs passed as a prop.
    onChange: (value: string) => void;      // Function to update image URL when a new image is uploaded.
    onRemove: (value: string) => void;     // Function to remove an image from the uploaded images list.
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    onRemove,
    value
}) => {

    const onUpload = (result: any) => {          // Handles the upload success and updates the image URL.
        onChange(result.info.secure_url);
    };

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center gap-4">  {/* Displays images in a flex row. */}
                {value.map((url) => (
                    <div className="relative w-[200px] h-[200px]">    {/* Display each image with a button to remove it. */}
                        <div className="absolute top-0 right-0 z-10">
                            <Button onClick={() => onRemove(url)} size="sm" className="bg-red-1 text-white">
                            <Trash className="h-4 w-4" /> {/* Trash icon to remove image */}
                            </Button>
                        </div>
                       <Image 
                          src={url}
                          alt="collection"
                          className="object-cover rounded-lg"
                          fill
                        />
                    </div>  
                ))}
            </div>

            {/* Cloudinary image upload widget */}
            <CldUploadWidget uploadPreset="keezur1e" onSuccess={onUpload}>
                {({ open }) => {
                    return (     // Renders a button to open the Cloudinary image upload dialog.
                        <Button onClick={() => open()} className="bg-grey-1 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Upload Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;  // This exports the ImageUpload component so it can be used elsewhere in the app.
