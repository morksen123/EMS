import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header>
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex items-center justify-between">
        <Link href="/" className="max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            VibeVault
          </h1>
        </Link>
        <div className="flex w-32 justify-end gap-3">
          <Button className="rounded-full" size={"lg"}>
            <Link href="/events/create">Create Event</Link>
          </Button>
          <Button className="rounded-full" size={"lg"}>
            <Link href="/sign-in">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
