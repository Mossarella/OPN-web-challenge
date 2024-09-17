"use client";

import React, { useEffect } from "react";

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className=" gap-y-2 text-sm text-balance flex-1 flex-col  col-span-1 md:col-span-2 lg:col-span-3 text-center flex justify-center items-center  w-full h-full">
      <p>Ouch, Something went wrong :(</p>
      <p>{error.message}</p>
    </div>
  );
}
