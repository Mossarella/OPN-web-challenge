"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Navigate back to the previous page in history
  };

  return (
    <div className="flex flex-1 h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested path.</p>
      <div
        onClick={() => {
          handleGoBack();
        }}
        className={cn(
          "btn  rounded px-3 py-2 min-h-0 h-[33.6px] flex justify-center items-center  shadow-sm  ",

          "btn-primary whiteFilter "
        )}
      >
        Go Back
      </div>
    </div>
  );
}
