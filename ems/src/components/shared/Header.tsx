import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header>
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/public/assets/images/logo.svg"
            width={128}
            height={38}
            alt="VibeVault logo"
          />
        </Link>
        <div className="flex w-32 justify-end gap-3">
          <Button className="rounded-full" size={"lg"}>
            <Link href="/sign-in">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
