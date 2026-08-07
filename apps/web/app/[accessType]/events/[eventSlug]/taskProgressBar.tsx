import { Budget } from "types/events/dummyEvents";

interface BudgetProgressBarProps {
  budget: Budget;
}

function BudgetProgressBar({ budget }: BudgetProgressBarProps) {
  return (
    <div className="w-full space-y-4">
      {/* Progress Bar */}
      <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden flex">
        {budget.categories
          .filter((category) => category.spent > 0) // Only show categories with spending
          .map((category) => {
            const percentage = (category.spent / budget.total) * 100;

            return (
              <div
                key={category.id}
                style={{
                  width: `${percentage}%`,
                  backgroundColor: category.color,
                  transformOrigin: "bottom",
                }}
                title={`${category.name}: ${budget.currency}${category.spent.toLocaleString()} / ${budget.currency}${category.budgeted.toLocaleString()}`}
              />
            );
          })}

        {/* Remaining budget (unspent) */}
        <div
          className="h-full bg-gray-300"
          style={{
            width: `${((budget.total - budget.spent) / budget.total) * 100}%`,
          }}
          title={`Remaining: ${budget.currency}${(budget.total - budget.spent).toLocaleString()}`}
        />
      </div>
    </div>
  );
}

export default BudgetProgressBar;
