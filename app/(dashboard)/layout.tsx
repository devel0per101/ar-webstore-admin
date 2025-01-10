import type { Metadata } from "next";  // Brings in the Metadata type to set page details like title and description.
import { Inter } from "next/font/google";  // Loads the Inter font from Google.
import "../globals.css"; // Imports global styles for the whole app.

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs' // Imports Clerk functions to handle user authentication.

import LeftSideBar from "@/components/layouts/LeftSideBar"; // Imports the Left Sidebar component to show on the page.
import TopBar from "@/components/layouts/TopBar";  // Imports the Top Bar component to show on the page.
import { ToasterProvider } from "@/lib/ToasterProvider";  // Imports the ToasterProvider to manage showing notifications.

const inter = Inter({ subsets: ["latin"] });  // Sets up the "Inter" font with Latin characters for the app.

export const metadata: Metadata = {     // Sets the page's title and description.
  title: "AR Webstore Admin Dashboard",   // This is the title of the page.
  description: "Admin Dashboard to  manage AR Webstore data",    // This is the description of the page.
};

export default function RootLayout({     // This is the layout for the main page of the app.
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>  {/* ClerkProvider is used to manage user login and sessions */}
      <html lang="en">
        <body className={inter.className}> {/* Applies the "Inter" font to the page */}
          <ToasterProvider />  {/* ToasterProvider is used to show pop-up messages */}

          <div className="flex max-lg:col text-gray-1"> {/* Creates a flex layout with a sidebar and top bar */}
            <LeftSideBar />  {/* Displays the left sidebar */}
            <TopBar />       {/* Displays the top bar */}
            <div className="flex-1">{children}</div> {/* Renders the page content here */}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
