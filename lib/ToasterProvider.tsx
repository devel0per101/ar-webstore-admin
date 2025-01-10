"use client"

import { Toaster } from "react-hot-toast"  // Import Toaster component from react-hot-toast library

export const ToasterProvider = () => {  // ToasterProvider component that wraps and shows toast notifications
    return<Toaster />  // Renders Toaster to show notifications
}