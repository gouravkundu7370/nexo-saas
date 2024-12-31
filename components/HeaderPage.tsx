import {
  SignUpButton,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ModeToggle } from "./ModeToogle";
import Image from "next/image";
import { Button } from "./ui/button";
import HeaderMenu from "./HeaderMenu";

const PageHeader = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-0 w-full transition-all border-b backdrop-blur-md ">
      <div className="w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto">
        <div className="flex h-14 items-center justify-between">
          <Image src="/NexoLogo2.png" alt="Logo" width={120} height={110} />
          <div className="ml-auto flex items-center gap-x-4">
            <ModeToggle />
            <SignedOut>
              <SignInButton>
                <Button className="bg-primary font-medium">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-primary font-medium">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <HeaderMenu />
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};
export default PageHeader;
