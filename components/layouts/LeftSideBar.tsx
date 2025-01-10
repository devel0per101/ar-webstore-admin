"use client"

import { UserButton } from "@clerk/nextjs"; // This shows the user profile button.
import Image from "next/image"; // This is used to display images.
import Link from "next/link"; // This is used to create links to different pages.
import { usePathname } from "next/navigation"; // This helps to know the current page we are on.

import { navLinks } from "@/lib/constants"; // This gets the list of navigation links.
const LeftSideBar = () => {
  const pathname = usePathname();   // To check what page the user is on.

  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden"> {/* This is the sidebar container with background and position */}
      <Image src="/logo.png" alt="logo" width={150} height={70} /> {/* This shows the logo at the top */}

      <div className="flex flex-col gap-12"> {/* This is where we list the navigation links */}
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-blue-1" : "text-grey-1" // We check if the link is the current page and change the color
            }`}
          >
            {link.icon} <p>{link.label}</p>  {/* This shows the icon and the label for each link */}
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium items-center"> {/* This is the section for user profile */}
        <UserButton />  {/* This shows the button to manage the user profile */}
        <p>Edit Profile</p> {/* This text is next to the user button */}
      </div>
    </div>
  );
};

export default LeftSideBar;  // This makes the LeftSideBar component available for use in other parts of the app.
