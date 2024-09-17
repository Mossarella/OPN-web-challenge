import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";
import { IPayment } from "@/interfaces/IPayment";
import axios from "axios";
import { useFoundation } from "@/contexts/CFoundation";

export default function PaymentDialog() {
  const {
    setPaymentSpinner,
    customDonationAmount,
    donationAmount,
    handleSaveToLocalStorage,
    setCustomDonationAmount,
    setDonationAmount,
    selectedFoundation,
    showToast,
    setSelectedFoundation,
    resetToInitialDonationAmount,
    preselectDonationAmount,
    paymentSpinner,
  } = useFoundation();

  const handleChangeDonationAmount = (value: string) => {
    setDonationAmount(value);
    if (value !== "custom") {
      setCustomDonationAmount(0);
    }
    handleSaveToLocalStorage(value);
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
          showToast("success");
          console.log(response.data);
          resolve();
        }, 2000);
      });
    } catch (error: any) {
      console.log(error);
      showToast("destructive");
    } finally {
      setSelectedFoundation(null);
      resetToInitialDonationAmount();
    }
  };

  return (
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
                {preselectDonationAmount.map((item: string, index: number) => (
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
                value={customDonationAmount === 0 ? "" : customDonationAmount}
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
  );
}
