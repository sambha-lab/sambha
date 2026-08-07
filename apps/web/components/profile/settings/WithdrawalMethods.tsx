"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import { paypalLinkedAtom, stripeLinkedAtom } from "./WithdrawalCard";
import paypalIcon from "../../../assets/svgs/PayPal.svg";
import stripeIcon from "../../../assets/svgs/stripe.svg";

export const WithdrawalMethods = () => {
  const [paypalLinked] = useAtom(paypalLinkedAtom);
  const [stripeLinked] = useAtom(stripeLinkedAtom);

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Withdrawal method</h2>

      {/* PayPal */}
      <div className="flex items-center justify-between border-b py-4">
        <div className="flex items-center gap-3">
          <Image src={paypalIcon} alt="paypal" width={40} height={40} />
          <p className="font-semibold">PayPal</p>
        </div>
        <button
          className={`px-4 py-1 rounded-md text-white text-sm font-medium ${
            paypalLinked ? "bg-[#002994]" : "bg-gray-400"
          }`}
        >
          {paypalLinked ? "Linked" : "Link PayPal"}
        </button>
      </div>

      {/* Stripe */}
      <div className="flex items-center justify-between border-b py-4">
        <div className="flex items-center gap-3">
          <Image src={stripeIcon} alt="stripe" width={40} height={40} />
          <p className="font-semibold">Stripe</p>
        </div>
        <button
          className={`px-4 py-1 rounded-md text-white text-sm font-medium ${
            stripeLinked ? "bg-[#635BFF]" : "bg-gray-400"
          }`}
        >
          {stripeLinked ? "Linked" : "Link Stripe"}
        </button>
      </div>
    </div>
  );
};
