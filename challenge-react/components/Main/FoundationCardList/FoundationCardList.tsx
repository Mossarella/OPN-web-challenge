"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IFoundation } from "@/interfaces/IFoundation";
import FoundationCard from "../FoundationCard/FoundationCard";
import PaymentDialog from "../PaymentDialog/PaymentDialog";
import FoundationCardSkeleton from "../FoundationCardSkeleton/FoundationCardSkeleton";
import { useFoundation } from "@/contexts/CFoundation";

export default function FoundationCardList() {
  const {
    fetchLocalStorageData,
    setCharityData,
    setError,
    setIsLoading,
    isLoading,
    charityData,
  } = useFoundation();

  useEffect(() => {
    fetchData();
    fetchLocalStorageData();

    return () => {};
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/foundations", {});
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setCharityData(response.data);
          resolve();
        }, 2000);
      });
    } catch (error) {
      setError(true);
      throw new Error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-full flex items-center flex-col flex-1 h-full">
      <div className="h-full flex-1 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <FoundationCardSkeleton />
        ) : (
          charityData.map((item: IFoundation, index: number) => (
            <FoundationCard
              key={item.id}
              item={item}
            ></FoundationCard>
          ))
        )}
        <PaymentDialog></PaymentDialog>
      </div>
    </div>
  );
}
