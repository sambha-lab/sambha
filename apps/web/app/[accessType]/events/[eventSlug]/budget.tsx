import { FullEventsProps } from "types/events/dummyEvents";
import BudgetProgressBar from "./taskProgressBar";
import { Polygon } from "public/svg";
interface BudgetBreakDown {
  event: FullEventsProps;
}

function BudgetBreakDown({ event }: BudgetBreakDown) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-medium text-gray-950 ">
              {event.budget.currency}
              {event.budget.total}
            </p>
            <p className="text-sm font-normal text-gray-950">Total budget</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-950 ">
              {event.budget.currency}
              {event.budget.spent}
            </p>
            <p className="text-sm font-normal text-gray-950">Spent so far</p>
          </div>
        </div>
        <BudgetProgressBar budget={event?.budget} />
      </div>
      {/* Category List */}
      <div className="space-y-4">
        {event.budget.categories.map((category) => {
          return (
            <div
              key={category.id}
              className=" flex justify-between items-center"
            >
              {/* Category Icon and Name */}
              <div className="flex items-center gap-3">
                <div
                  style={{
                    color: category.color,
                  }}
                  className={`text-${category.color}`}
                >
                  <Polygon />
                </div>
                <p className="font-normal text-base  text-gray-950">
                  {category.name}
                </p>
              </div>

              {/* Amount */}
              <div className="">
                <p className="font-normal text-sm text-gray-600">
                  {event.budget.currency}
                  {category.spent.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetBreakDown;
