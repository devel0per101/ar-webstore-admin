"use client" 

import { UserButton } from "@clerk/nextjs"; // Shows a button for the user profile.
import Image from "next/image"; // Used to display images.
import Link from "next/link"; // Used to create links to different pages.
import { useState } from "react"; // For managing the dropdown menu state.
import { usePathname } from "next/navigation"; // Helps to get the current page the user is on.
import { Menu } from "lucide-react"; // This is the hamburger menu icon for mobile view.

import { navLinks } from "@/lib/constants"; // Gets the list of navigation links.

const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);   // State to control the dropdown menu visibility.
  const pathname = usePathname();   // Checks which page the user is currently on.

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden"> {/* This is the container for the top bar */}

      <Image src="/logo.png" alt="logo" width={150} height={70} />       {/* Displays the logo */}

      <div className="flex gap-8 max-md:hidden">  {/* This section shows the links only on larger screens */}
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${pathname === link.url ? "text-blue-1" : "text-grey-1"}`}
          >
            <p>{link.label}</p>              {/* Show link label and highlight if it's the active page */}
          </Link>
        ))}
      </div>

      <div className="relative flex gap-4 items-center">           {/* This is the user profile section */}
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}           // Toggles the dropdown menu when clicked
        />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">  {/* This is the dropdown menu that shows on mobile */}
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className="flex gap-4 text-body-medium"
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />       {/* Displays the user profile button */}
      </div>
    </div>
  );
};

export default TopBar;
