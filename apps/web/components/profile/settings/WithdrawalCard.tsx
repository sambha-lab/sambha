"use client";

import { atom, useAtom, useSetAtom } from "jotai";
import Image from "next/image";
import paypalIcon from "../../../assets/svgs/PayPal.svg";
import stripeIcon from "../../../assets/svgs/stripe.svg";
import { modalAtom } from "store/modalAtom";

export const paypalLinkedAtom = atom(false);
export const stripeLinkedAtom = atom(false);

export const WithdrawalCard = () => {
  const [paypalLinked, setPaypalLinked] = useAtom(paypalLinkedAtom);
  const [stripeLinked, setStripeLinked] = useAtom(stripeLinkedAtom);
  const setModal = useSetAtom(modalAtom);

  return (
    <div className="w-full">
      <div className="flex gap-6 h-full">
        <div className="flex flex-1 flex-col border p-6 rounded-md h-full justify-between items-center">
          <div className="flex flex-col items-center">
            <Image
              src={paypalIcon}
              alt="paypal"
              className="w-24 h-auto"
              width={96}
              height={96}
            />
            <p className="font-bold text-2xl mt-4">PayPal</p>
          </div>

          <button
            onClick={() => {
              setPaypalLinked(true);
              setModal({ isOpen: false });
            }}
            disabled={paypalLinked}
            className={`w-full py-2 rounded-md mt-4 text-white-main bg-[#002994] ${
              paypalLinked ? "cursor-not-allowed" : ""
            }`}
          >
            {paypalLinked ? "Linked" : "Link PayPal"}
          </button>
        </div>

        <div className="flex flex-1 flex-col border p-6 rounded-md h-full justify-between items-center">
          <div className="flex flex-col items-center">
            <Image
              src={stripeIcon}
              alt="stripe"
              className="w-24 h-auto"
              width={96}
              height={96}
            />
            <p className="font-bold text-2xl mt-4">Stripe</p>
          </div>

          <button
            onClick={() => {
              setStripeLinked(true);
              setModal({ isOpen: false });
            }}
            disabled={stripeLinked}
            className={`w-full py-2 bg-[#635BFF] rounded-md text-white-main ${
              stripeLinked ? "cursor-not-allowed" : ""
            }`}
          >
            {stripeLinked ? "Linked" : "Link Stripe"}
          </button>
        </div>
      </div>
    </div>
  );
};
