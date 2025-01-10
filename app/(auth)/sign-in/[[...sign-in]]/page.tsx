import { SignIn } from "@clerk/nextjs";   // Gets the SignIn form from Clerk for users to log in.

export default function Page() {    // Makes a Page component to show the sign-in form.
  return (
    <div className="h-screen flex justify-center items-center">  {/* Puts the sign-in form in the center of the screen */}
      <SignIn />   {/* Shows the sign-in form */}
    </div>
  );
}
