"use client";

import * as React from "react";
import Link from "next/link";

import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className=" w-full px-4 sm:px-6 lg:px-8 h-[64px] maxSection ">
      <div className=" justify-between w-full flex h-16 items-center  mx-auto">
        <Link
          href="/"
          className="flex items-center space-x-2 w-auto h-full"
        >
          <div className="h-[36px] w-[36px] relative">
            <Image
              src={`/images/omise.png`}
              alt="logo"
              layout="fill"
              objectFit="fit"
              className="h-full w-full "
            />
          </div>
          <span className="font-bold text-xl">OMISE</span>
        </Link>
        <div className=" h-full hidden sm:flex w-full items-center justify-center gap-x-6">
          <Link href="/mission">
            <Button
              className=" p-0 "
              variant="link"
            >
              What we do
            </Button>
          </Link>
          <Link href="/about">
            <Button
              className="  p-0 "
              variant="link"
            >
              About us
            </Button>
          </Link>
          <Link href="/events">
            <Button
              className=" p-0"
              variant="link"
            >
              Charity events
            </Button>
          </Link>
        </div>

        <div className=" flex items-center space-x-4 h-full">
          <Link href="/contact">
            <Button
              className=" rounded-full bg-[var(--primary)] hover:bg-[var(--primary2)] text-[var(--black)]"
              variant="outline"
            >
              <Phone className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
