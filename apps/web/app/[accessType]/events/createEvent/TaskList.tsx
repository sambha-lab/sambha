import { TaskListCard } from "../TasklistCard";

export const TaskList: React.FC = () => {
  const taskList = [
    {
      title: "Book the Perfect Venue",
      assign: ["John Doe"],
      date: "Thu, Feb 19",
      budget: "£4,500",
    },
    {
      title: "Arrange Delicious Catering for Your Guests",
      assign: ["Jane Smith"],
      date: "Sun, Feb 22",
      budget: "£8,000",
    },
    {
      title: "Capture Every Moment with Photography & Videography",
      assign: ["Michael Brown", "Sarah Johnson"],
      date: "Sun, Feb 22",
      budget: "£3,000",
    },
    {
      title: "Set the Mood with Entertainment (DJ/Band)",
      assign: [],
      date: "Sun, Feb 22",
      budget: "£1,500",
    },
  ];
  return (
    <div className="pt-12">
      <div className="space-y-2">
        <p className="text-xl sm:text-2xl font-semibold text-primary-darkPurple">
          Task list
        </p>
        <p className="text-gray-base">
          Here’s what you might need to do before your event - including
          budgets.
        </p>
      </div>
      <div className="mt-8 space-y-3">
        {taskList.map((task, index) => (
          <TaskListCard key={index} {...task} />
        ))}
      </div>
    </div>
  );
};
