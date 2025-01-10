import { SignUp } from "@clerk/nextjs";  // Gets the SignUp form from Clerk to let users register.

export default function Page() {   // Creates the Page that displays the sign-up form.
  return (
    <div className="h-screen flex justify-center items-center">  {/* Centers the sign-up form in the middle of the screen */}
      <SignUp /> {/* Displays the sign-up form */}
    </div>
  );
}
