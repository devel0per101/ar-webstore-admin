import type { Metadata } from "next";    // Imports the Metadata type to define page metadata (like title, description).
import { Inter } from "next/font/google";   // Imports the Inter font from Google Fonts.
import "../globals.css";  // Imports global CSS styles for the entire app.

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'  // Imports Clerk functions to handle user authentication (like sign-in, user button, etc.).

const inter = Inter({ subsets: ["latin"] }); // Sets up the Inter font to be used in the app with Latin characters.

export const metadata: Metadata = {    // Defines the metadata for the page.
  title: "AR Webstore Admin Auth",     // Sets the title of the page.
  description: "Admin Dashboard to  manage AR Webstore data",    // Sets the description of the page.
};

export default function RootLayout({    // This is the layout for the whole page.
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>   {/* Wraps the page with Clerk to manage user login */}
    <html lang="en">   
      <body className={inter.className}>{children}</body> {/* Applies the Inter font to everything */}
    </html>
    </ClerkProvider>
  );
}
