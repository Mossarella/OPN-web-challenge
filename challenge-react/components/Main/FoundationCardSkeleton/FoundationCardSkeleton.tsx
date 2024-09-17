import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function FoundationCardSkeleton() {
  return [...Array(5)].map((item, index) => {
    return (
      <Card
        key={index}
        className=" flex flex-col overflow-hidden  h-[480px]  "
      >
        <CardHeader className="p-6">
          <div className="h-56 w-full relative">
            <Skeleton className="bg-[var(--grey2)] h-full w-full rounded-lg" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 px-6 pb-6">
          <Skeleton className="h-6 w-3/4 mb-2 bg-[var(--grey2)]" />
          <Skeleton className="h-4 w-full mb-2 bg-[var(--grey2)]" />
          <Skeleton className="h-4 w-full bg-[var(--grey2)]" />
        </CardContent>
        <CardFooter className=" p-4 h-16">
          <Skeleton className="bg-[var(--grey2)] h-full w-full" />
        </CardFooter>
      </Card>
    );
  });
}
