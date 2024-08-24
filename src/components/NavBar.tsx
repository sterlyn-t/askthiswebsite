"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import React from "react";

const NavBar = () => {
  return (
    <Navbar isBordered className="absolute left-0 top-0 bg-zinc-900">
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <a href="/">
          <h1 className="font-bold">AskThisWebsite</h1>
        </a>
      </NavbarBrand>
      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}
      {/* <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#" className="text-sm">
            FAQ
          </Link>
        </NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent> */}
    </Navbar>
  );
};

export default NavBar;
