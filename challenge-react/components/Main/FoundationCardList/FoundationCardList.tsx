"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { IFoundation } from "@/interfaces/IFoundation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ILocalStorageItem } from "@/interfaces/ILocalStorageItem";
import { IPayment } from "@/interfaces/IPayment";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";

export default function FoundationCardList() {
  const { toast } = useToast();

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
    } finally {
      setIsLoading(false);
    }
  };

  function fetchLocalStorageData() {
    const savedLocalStorageItem = localStorage.getItem(localStorageName);
    if (savedLocalStorageItem) {
      setLocalStorageItem(
        JSON.parse(savedLocalStorageItem) as ILocalStorageItem[]
      );
    }
  }

  const handlePickFoundation = (foundation: IFoundation) => {
    setSelectedFoundation(foundation);
    checkIfLocalStorageDataAvailable(foundation);
  };

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

  const handleChangeDonationAmount = (value: string) => {
    setDonationAmount(value);
    if (value !== "custom") {
      setCustomDonationAmount(0);
    }
    handleSaveToLocalStorage(value);
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

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount =
      donationAmount.toString() === "custom"
        ? customDonationAmount
        : parseInt(donationAmount, 10);

    try {
      setPaymentSpinner(true);
      const response = await axios.post<IPayment>("/api/foundations", {
        charitiesId: selectedFoundation?.id,
        amount: amount,
        currency: selectedFoundation?.currency,
      } as IPayment);
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setPaymentSpinner(false);
          toast({
            variant: "success",
            title: "Donation successful!",
            description: "Your kindness will make a lasting impact!",
          });
          console.log(response.data);
          resolve();
        }, 2000);
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Donation unsuccessfully!",
        description:
          "There was a problem with your donation. Please try again.",
      });
    } finally {
      setSelectedFoundation(null);
      resetToInitialDonationAmount();
    }
  };

  const resetToInitialDonationAmount = () => {
    setDonationAmount(preselectDonationAmount[0]);
    setCustomDonationAmount(0);
  };

  const FoundationSkeleton = () => {
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
  };

  const ErrorMessage = () => {
    return (
      <div className=" text-sm text-balance flex-1 flex-col  col-span-1 md:col-span-2 lg:col-span-3 text-center flex justify-center items-center  w-full h-full">
        <p>Ouch, Something went wrong :(</p>
      </div>
    );
  };

  return (
    <div className=" w-full flex items-center flex-col flex-1 h-full">
      <Toaster />
      <div className="h-full flex-1 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <FoundationSkeleton />
        ) : error ? (
          <ErrorMessage />
        ) : (
          charityData.map((item, index) => (
            <Card
              key={item.id}
              className=" flex flex-col overflow-hidden transition-all hover:shadow-xl  h-[480px]"
            >
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
          ))
        )}

        <Dialog
          open={!!selectedFoundation}
          onOpenChange={() => setSelectedFoundation(null)}
        >
          <DialogContent className="sm:max-w-[425px] bg-[var(--white)] rounded-lg ">
            <DialogHeader>
              <DialogTitle className=" text-balance text-center text-xl  font-semibold text-[var(--black)]">
                Donate to {selectedFoundation?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label
                  htmlFor="amount"
                  className="text-[var(--black)] text-[0.8rem]"
                >
                  Select Donation Amount ({selectedFoundation?.currency})
                </Label>
                <Select
                  value={donationAmount.toString()}
                  onValueChange={(value) => {
                    handleChangeDonationAmount(value);
                  }}
                >
                  <SelectTrigger
                    id="amount"
                    className="w-full"
                  >
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    {preselectDonationAmount.map((item, index) => (
                      <SelectItem
                        key={index}
                        value={item.toString()}
                      >
                        {item}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {donationAmount.toString() === "custom" && (
                <div className="space-y-2">
                  <Label
                    htmlFor="custom-amount"
                    className="text-[var(--black)]"
                  >
                    Enter Custom Amount ({selectedFoundation?.currency})
                  </Label>
                  <Input
                    type="number"
                    value={
                      customDonationAmount === 0 ? "" : customDonationAmount
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      if (value === "") {
                        setCustomDonationAmount(0);
                      } else if (/^\d+$/.test(value)) {
                        setCustomDonationAmount(parseInt(value, 10));
                      }
                    }}
                    placeholder="Enter custom amount"
                    className="w-full"
                  />
                </div>
              )}
            </div>
            <Button
              onClick={handlePay}
              className="w-full mt-4 bg-[var(--primary)] hover:bg-[var(--primary2)] text-[var(--black)]"
              disabled={
                (donationAmount === "custom" && !customDonationAmount) ||
                paymentSpinner
              }
            >
              {paymentSpinner ? "Working On It" : "Confirm Donation"}
              &nbsp;
              <LoadingSpinner
                className={paymentSpinner ? "flex" : "hidden"}
              ></LoadingSpinner>
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
