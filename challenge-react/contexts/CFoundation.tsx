"use client";

import { IFoundation } from "@/interfaces/IFoundation";
import { ILocalStorageItem } from "@/interfaces/ILocalStorageItem";
import React, {
  createContext,
  createServerContext,
  useContext,
  useState,
} from "react";
import { useToast } from "@/hooks/use-toast";

export const CFoundation = createContext<any>({});

export const FoundationProvider = ({ children }: any) => {
  const [charityData, setCharityData] = useState<IFoundation[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const preselectDonationAmount: string[] = ["10", "20", "50", "100", "500"];
  const [donationAmount, setDonationAmount] = useState<string>(
    preselectDonationAmount[0]
  );
  const [selectedFoundation, setSelectedFoundation] =
    useState<IFoundation | null>(null);
  const [customDonationAmount, setCustomDonationAmount] = useState<number>(0);

  const localStorageName: string = "foundationData";
  const [localStorageItem, setLocalStorageItem] = useState<ILocalStorageItem[]>(
    []
  );

  const [paymentSpinner, setPaymentSpinner] = useState(false);

  const { toast } = useToast();

  function fetchLocalStorageData() {
    const savedLocalStorageItem = localStorage.getItem(localStorageName);
    if (savedLocalStorageItem) {
      setLocalStorageItem(
        JSON.parse(savedLocalStorageItem) as ILocalStorageItem[]
      );
    }
  }

  const checkIfLocalStorageDataAvailable = (foundation: IFoundation) => {
    let storedData: ILocalStorageItem[] = localStorageItem;

    const foundationIndex = storedData.findIndex(
      (item) => item.id === foundation?.id
    );

    if (foundationIndex !== -1) {
      setDonationAmount(localStorageItem[foundationIndex].donationAmount);
    } else {
      storedData.push({
        id: foundation.id,
        donationAmount: preselectDonationAmount[0],
      });

      resetToInitialDonationAmount();

      localStorage.setItem(localStorageName, JSON.stringify(storedData));
    }
  };

  const handleSaveToLocalStorage = (value: string) => {
    let storedData: ILocalStorageItem[] = localStorageItem;

    const foundationIndex = storedData.findIndex(
      (item) => item.id === selectedFoundation?.id
    );

    if (foundationIndex !== -1) {
      storedData[foundationIndex].donationAmount = value;
    }

    localStorage.setItem(localStorageName, JSON.stringify(storedData));
  };

  const resetToInitialDonationAmount = () => {
    setDonationAmount(preselectDonationAmount[0]);
    setCustomDonationAmount(0);
  };

  const showToast = (variant: string) => {
    if (variant === "destructive") {
      toast({
        variant: "destructive",
        title: "Donation unsuccessfully!",
        description:
          "There was a problem with your donation. Please try again.",
      });
    } else if (variant === "success") {
      toast({
        variant: "success",
        title: "Donation successful!",
        description: "Your kindness will make a lasting impact!",
      });
    }
  };

  return (
    <CFoundation.Provider
      value={{
        isLoading,
        setSelectedFoundation,
        resetToInitialDonationAmount,
        showToast,
        paymentSpinner,
        setPaymentSpinner,
        selectedFoundation,
        donationAmount,
        customDonationAmount,
        handleSaveToLocalStorage,
        setCustomDonationAmount,
        setDonationAmount,
        fetchLocalStorageData,
        setCharityData,
        setError,
        setIsLoading,
        error,
        charityData,
        checkIfLocalStorageDataAvailable,
        preselectDonationAmount,
      }}
    >
      {children}
    </CFoundation.Provider>
  );
};
export const useFoundation = () => useContext(CFoundation);
