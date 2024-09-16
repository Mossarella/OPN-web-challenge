import React from "react";

export default function Title() {
  return (
    <div className="w-full maxSection flex flex-col pt-8 pb-12 text-balance">
      <h1 className=" sm:text-[2.4rem] text-[1.5rem] font-bold text-center  text-[var(--black)]">
        Omise&nbsp;
        <span className=" text-[var(--primary2)]">Tamboon</span>&nbsp; React
      </h1>
      <p className="text-[0.8rem] text-center text-[var(--grey)]">
        <span className="italic">
          Always remember that, Loving kindness sustains the world.
        </span>
        &nbsp;
        <span className="">💖</span>
      </p>
    </div>
  );
}
