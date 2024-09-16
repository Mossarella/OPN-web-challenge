import Title from "@/components/Main/Title/Title";
import Image from "next/image";
import { Suspense } from "react";
import LoadingPage from "./loading";
import FoundationCardList from "@/components/Main/FoundationCardList/FoundationCardList";

export default function Home() {
  return (
    <>
      <div className="maxSection flex items-center  min-h-[inherit]  flex-col h-full pb-12 px-4 sm:px-6 lg:px-8">
        <Title></Title>
        <FoundationCardList></FoundationCardList>
      </div>
    </>
  );
}
