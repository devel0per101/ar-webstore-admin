import { UserButton } from "@clerk/nextjs";    // Imports the UserButton from Clerk to show the logged-in user's button.

export default function Home() {     // This is the main page component.
  return (
   <div>
    <UserButton></UserButton>  {/* Displays a button that shows the logged-in user's info */}
    </div>
  );
}
