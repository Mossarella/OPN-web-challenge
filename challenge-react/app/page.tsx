import CharityCard from "@/components/Main/CharityCard/CharityCard";
import Title from "@/components/Main/Title/Title";
import Image from "next/image";
import { Suspense } from "react";
import LoadingPage from "./loading";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CharityCard></CharityCard>
        </div>
      </div>
    </>
  );
}
