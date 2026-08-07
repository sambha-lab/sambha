"use client";

import { WalletIcon } from "@sambha/ui/icons";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import React from "react";
import { modalAtom } from "../../../store/modalAtom";
import { getCardsAtom } from "../../../store/paymentCardAtom";
import { DisplayCard } from "./DisplayCard";

// linked state atoms
import { paypalLinkedAtom, stripeLinkedAtom } from "./WithdrawalCard";
import Image from "next/image";
import paypalIcon from "../../../assets/svgs/PayPal.svg";
import stripeIcon from "../../../assets/svgs/stripe.svg";

export const VendorWithdrawal = () => {
  const setModal = useSetAtom(modalAtom);
  const cards = useAtomValue(getCardsAtom);

  const [paypalLinked] = useAtom(paypalLinkedAtom);
  const [stripeLinked] = useAtom(stripeLinkedAtom);

  const hasLinkedMethod = paypalLinked || stripeLinked;

  const handleLinkClick = () => {
    setModal({ isOpen: true, type: "withdrawal method" });
  };

  return (
    <div className="space-y-3 mt-4">
      <h1 className="font-bold text-xl text-primary-darkPurple">
        Withdrawal method
      </h1>
      <p className="text-grey-base">Add a withdrawal method.</p>

      {/* Show saved cards */}
      {cards.length > 0 &&
        cards.map((card, id) => (
          <DisplayCard name={card.userName} key={id} number={card.number} />
        ))}

      {/* If at least one is linked, show the list */}
      {hasLinkedMethod ? (
        <div className="flex flex-col gap-4">
          {/* PayPal */}
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex flex-col items-center gap-2">
              <Image
                src={paypalIcon}
                alt="paypal"
                width={40}
                height={40}
                className="w-20"
              />
              <p className="font-semibold">PayPal</p>
            </div>
            <button
              onClick={handleLinkClick}
              className="px-4 py-2 rounded-md text-white-main text-sm font-medium bg-[#002994]"
            >
              {paypalLinked ? "Linked" : "Link PayPal"}
            </button>
          </div>

          {/* Stripe */}
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex flex-col items-center gap-2">
              <Image
                src={stripeIcon}
                alt="stripe"
                width={40}
                height={40}
                className="w-20"
              />
              <p className="font-semibold">Stripe</p>
            </div>
            <button
              onClick={handleLinkClick}
              className="px-4 py-2 rounded-md text-white-main text-sm font-medium bg-[#635BFF]"
            >
              {stripeLinked ? "Linked" : "Link Stripe"}
            </button>
          </div>
        </div>
      ) : (
        // Otherwise, just show add button
        <button
          onClick={() => setModal({ isOpen: true, type: "withdrawal method" })}
          className="text-primary-darkPurple inline-flex space-x-2 items-center bg-neutral-100 rounded-[12px] py-3 px-4"
        >
          <WalletIcon />
          <span>Add withdrawal method</span>
        </button>
      )}
    </div>
  );
};
