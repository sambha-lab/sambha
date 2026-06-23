import React from "react";
import { FormCheckBox } from "../../../../../../packages/ui/src/form/FormCheckbox";
import { FormInput } from "../../../../../../packages/ui/src/form/FormInput";
import { BtcIcon, ExchangeIcon, NigeriaIcon } from "../../../../public/svg";
import { FormInputWithSelect } from "../../../../../../packages/ui/src/form/FormInputWithSelect";

const currencyOptions = [
  { value: "ngn", label: "NGN", icon: <NigeriaIcon /> },
  { value: "usd", label: "USD", icon: <NigeriaIcon /> },
];

const assetOptions = [
  { value: "btc", label: "BTC", icon: <BtcIcon /> },
  { value: "eth", label: "ETH", icon: <BtcIcon /> }, // Replace with correct icon if needed
];

type EventBudgetProps = {
  budget: string;
  setBudget: React.Dispatch<React.SetStateAction<string>>;
  selectedCurrency: string;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<string>>;
  selectedAsset: string;
  setSelectedAsset: React.Dispatch<React.SetStateAction<string>>;
  expectedGuests: string;
  setExpectedGuests: React.Dispatch<React.SetStateAction<string>>;
  isFixedBudget: boolean;
  setIsFixedBudget: React.Dispatch<React.SetStateAction<boolean>>;
  asset: string; // Optional, for default asset
  setAsset: React.Dispatch<React.SetStateAction<string>>; // Optional, for controlled asset
};

function EventBudget({
  budget,
  setBudget,
  selectedCurrency,
  setSelectedCurrency,
  selectedAsset,
  setSelectedAsset,
  expectedGuests,
  setExpectedGuests,
  isFixedBudget,
  setIsFixedBudget,
  asset,
  setAsset,
}: EventBudgetProps) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row  w-full pt-20 items-center sm:items-end gap-3">
        <div className="w-full sm:max-w-sm">
          <FormInputWithSelect
            options={currencyOptions}
            selectId="currency"
            selected={selectedCurrency}
            setSelected={setSelectedCurrency}
            label="What is your budget for this event?"
            value={budget}
            setValue={setBudget}
            placeholder="Enter budget"
            disabled={isFixedBudget}
          />
        </div>
        <div className="w-6  sm:h-14 flex items-center justify-center ">
          <ExchangeIcon />
        </div>

        <div className="w-full ">
          <FormInputWithSelect
            options={assetOptions}
            selectId="asset"
            selected={selectedAsset}
            setSelected={setSelectedAsset}
            placeholder="Select asset"
            value={asset}
            setValue={setAsset}
            disabled={isFixedBudget}
          />
        </div>
      </div>

      <div className="flex gap-2 items-center pt-5">
        <FormCheckBox
          id="fixedBudget"
          checked={isFixedBudget}
          onChange={() => setIsFixedBudget(!isFixedBudget)}
        />
        <label
          htmlFor="fixedBudget"
          className="text-sm text-primary-darkPurple"
        >
          I don’t have a fixed budget yet
        </label>
      </div>

      <div className="pt-10">
        <FormInput
          id="expectedGuests"
          placeholder="Expected number of guests"
          value={expectedGuests}
          setValue={setExpectedGuests}
          label="How many guests are you expecting?"
        />
      </div>
    </div>
  );
}

export default EventBudget;
