import { ChevronDown } from "lucide-react";
import { CalendarIcon, MultiUserIcon } from "../../../public/svg";

type Props = {
  title: string;
  assign: string[];
  date: string;
  budget: string;
};

export const TaskListCard: React.FC<Props> = ({
  title,
  assign,
  date,
  budget,
}) => {
  return (
    <div className="flex w-full items-center justify-between py-2">
      <div>
        <div className="flex items-center gap-2">
          <div className="size-[20px] rounded-full border border-gray-base" />
          <div>
            <p className="text-lg text-primary-darkPurple">{title}</p>
          </div>
        </div>
        <div className="pl-8 flex gap-2 items-center mt-1">
          <p className="text-gray-base">{budget}</p>
          <div className="size-[5px] rounded-full bg-gray-base" />
          {assign.length > 0 && (
            <div className="flex items-center gap-2">
              <p className="text-gray-base flex items-center gap-1">
                <MultiUserIcon />
                <span>{assign.length.toString()}</span>
              </p>
              <div className="size-[5px] rounded-full bg-gray-base" />
            </div>
          )}
          <div className="flex items-center gap-1">
            <CalendarIcon />
            <p className="text-gray-base">{date}</p>
          </div>
        </div>
      </div>
      <div className="-rotate-90">
        <ChevronDown className="text-gray-base" />
      </div>
    </div>
  );
};
