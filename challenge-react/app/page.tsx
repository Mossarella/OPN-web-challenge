import Title from "@/components/Main/Title/Title";

import FoundationCardList from "@/components/Main/FoundationCardList/FoundationCardList";
import { FoundationProvider } from "@/contexts/CFoundation";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <>
      <div className="maxSection flex items-center  min-h-[inherit]  flex-col h-full pb-12 px-4 sm:px-6 lg:px-8">
        <FoundationProvider>
          <Toaster />
          <Title></Title>
          <FoundationCardList></FoundationCardList>
        </FoundationProvider>
      </div>
    </>
  );
}
