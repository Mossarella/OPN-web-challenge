import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useFoundation } from "@/contexts/CFoundation";
import { IFoundation } from "@/interfaces/IFoundation";

export default function FoundationCard({ item }: { item: IFoundation }) {
  const { setSelectedFoundation, checkIfLocalStorageDataAvailable } =
    useFoundation();

  const handlePickFoundation = (foundation: IFoundation) => {
    setSelectedFoundation(foundation);
    checkIfLocalStorageDataAvailable(foundation);
  };

  return (
    <Card className=" flex flex-col overflow-hidden transition-all hover:shadow-xl  h-[480px]">
      <CardHeader className="p-6">
        <div className="h-56 w-full relative">
          <Image
            src={`/images/${item.image}`}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="h-full w-full rounded-lg   filter-grayscale"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 px-6 pb-6">
        <h2 className="text-xl font-semibold mb-2 text-[var(--black)]">
          {item.name}
        </h2>
        <p className=" text-[var(--grey)] text-[0.8rem] mb-4 italic">
          Dedicated to {item.name} foundation
        </p>
      </CardContent>
      <CardFooter className="bg-[var(--black)] p-4 h-16">
        <Button
          onClick={() => handlePickFoundation(item)}
          className="w-full bg-[var(--primary)] hover:bg-[var(--primary2)] text-[var(--black)]"
        >
          Donate Now
        </Button>
      </CardFooter>
    </Card>
  );
}
