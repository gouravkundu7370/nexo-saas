import { Button } from "@/components/ui/button";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { LogIn, Github } from "lucide-react";
import Image from "next/image";

import React from "react";

export default function Hero() {
  return (
    <section className="grow">
      <div className="container mx-auto px-4 mb-24 mt-4 flex flex-col md:flex-row justify-center">
        <div className="flex flex-col max-w-sm justify-center">
          <div className="mb-8">
            <h1 className="mb-5 text-5xl font-extrabold leading-tight gradient-title">
              Collect your feedback seamlessly
            </h1>
            <p className="font-light text-wrap justify-center font-serif text-[20px]">
              Easily integrate Nexo and start collecting feedback today.
            </p>
          </div>
          <div>
            <SignedOut>
              <SignUpButton>
                <div className="flex gap-3">
                  <Button className="hover:bg-blue-700 font-semibold text-xl">
                    <LogIn className="w-4 h-4 mr-2 font-bold" />
                    Get Started
                  </Button>
                  <div className="border border-black rounded-md">
                    <Button
                      variant="secondary"
                      asChild
                      className="hover:bg-slate-500 text-xl font-semibold "
                    >
                      <Link href="https://github.com">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Link>
                    </Button>
                  </div>
                </div>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button
                asChild
                className="font-semibold font-sans text-xl hover:bg-blue-800"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        </div>
        <div className="flex-1 max-w-lg mt-4 shadow-slate-500">
          <Image
            src={"/demo.gif"}
            alt="demo"
            width={450}
            height={450}
            unoptimized={true}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
