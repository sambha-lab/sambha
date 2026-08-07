import { useState } from "react";
import { type Task, TaskItem } from "../createEvent/TaskList";
import { Plus } from "lucide-react";
import { TaskDrawer } from "../createEvent/TaskDrawer";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { useEffect } from "react";

export const TaskBreakDown = ({
  tasks,
  setTasks,
  showTotalBudget,
  showStatic,
}: {
  showTotalBudget: boolean;
  showStatic: boolean;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    cost: "",
    date: "",
  });

  // Drawer state
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [completed, setCompleted] = useState<number>();
  const [pending, setPending] = useState<number>();
  useEffect(() => {
    const completed = tasks.filter((task) => task.completed === true);
    const pending = tasks.filter((task) => task.completed !== true);
    setCompleted(completed.length);
    setPending(pending.length);
  }, [tasks]);
  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (selectedTask?.id === id) {
      setIsDrawerOpen(false);
      setSelectedTask(null);
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTask(null);
  };

  const handleUpdateTask = (taskId: number, updates: any) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );

    // Update selected task if it's the same one being updated
    if (selectedTask?.id === taskId) {
      setSelectedTask({ ...selectedTask, ...updates });
    }
  };

  const handleAddTask = () => {
    if (newTask.title.trim() && newTask.cost.trim() && newTask.date.trim()) {
      const task: Task = {
        id: Math.max(...tasks.map((t) => t.id)) + 1,
        title: newTask.title,
        cost: newTask.cost,
        date: newTask.date,
        completed: false,
        assignees: [],
        notes: "",
      };

      setTasks([...tasks, task]);
      setNewTask({ title: "", cost: "", date: "" });
      setShowAddForm(false);
    }
  };

  const handleCancelAdd = () => {
    setNewTask({ title: "", cost: "", date: "" });
    setShowAddForm(false);
  };

  const formatDateForInput = (dateStr: string) => {
    // Convert display format like "Thu, Feb 19" to date input format
    const currentYear = new Date().getFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (dateStr.includes(",")) {
      const parts = dateStr.split(", ");
      if (parts && parts.length === 2 && parts[1]) {
        const monthDay = parts[1].split(" ");
        if (monthDay && monthDay.length === 2) {
          const [month, day] = monthDay;
          if (month && day) {
            const monthIndex = monthNames.indexOf(month) + 1;
            if (monthIndex > 0) {
              return `${currentYear}-${monthIndex.toString().padStart(2, "0")}-${day.padStart(2, "0")}`;
            }
          }
        }
      }
    }
    return "";
  };

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="pt-6">
        <div>
          <div className="flex justify-between items-center  px-5">
            <div>
              <p className="text-lg font-normal text-[#070D17]">
                {tasks.length}
              </p>
              <p className="text-sm font-normal text-[#070D17]">Total</p>
            </div>
            <div>
              <p className="text-lg font-normal text-[#070D17]">{completed}</p>
              <p className="text-sm font-normal text-[#070D17]">Completed</p>
            </div>
            <div>
              <p className="text-lg font-normal text-[#070D17]">{pending}</p>
              <p className="text-sm font-normal text-[#070D17]">Pending</p>
            </div>
          </div>
          <div className="h-6 rounded-2xl bg-[#EBECEE] flex overflow-hidden">
            {/* Completed bar */}
            <div
              className="h-full bg-gradient-to-r from-[#9B5BF1] to-[#6745E1] transition-all duration-300"
              style={{
                width: tasks.length
                  ? `${(completed! / tasks.length) * 100}%`
                  : "0%",
              }}
            ></div>

            {/* Pending bar */}
            <div
              className="h-full bg-[#EBECEE] transition-all duration-300"
              style={{
                width: tasks.length
                  ? `${(pending! / tasks.length) * 100}%`
                  : "0%",
              }}
            ></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={tasks.length > 1 ? handleDeleteTask : undefined}
                onTaskClick={handleTaskClick}
              />
            ))}
          </div>

          {/* Add Custom Task Form */}
          {showAddForm && (
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    placeholder="Enter task title"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost
                    </label>
                    <input
                      type="text"
                      value={newTask.cost}
                      onChange={(e) =>
                        setNewTask({ ...newTask, cost: e.target.value })
                      }
                      placeholder="£0,000"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={formatDateForInput(newTask.date)}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          date: formatDateForDisplay(e.target.value),
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    onClick={handleCancelAdd}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTask}
                    disabled={
                      !newTask.title.trim() ||
                      !newTask.cost.trim() ||
                      !newTask.date.trim()
                    }
                    className="px-4 py-2 bg-primary-main text-primary-light rounded-lg hover:bg-primary-main/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Custom Task Button */}
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 p-4 w-full text-gray-600 hover:text-primary-dark hover:border-primary-main transition-colors"
            >
              <Plus size={20} />
              <span className="font-medium">Add custom task</span>
            </button>
          )}
        </div>

        {/* Task Summary */}
        {showTotalBudget && tasks.length > 0 && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">
                {tasks.filter((t) => t.completed).length} of {tasks.length}{" "}
                tasks completed
              </span>
              <span className="font-semibold text-gray-900">
                Total Budget:{" "}
                {tasks
                  .reduce((sum, task) => {
                    const cost = task.cost?.replace(/[£,]/g, "");
                    return sum + (parseFloat(cost!) || 0);
                  }, 0)
                  .toLocaleString("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  })}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Task Drawer */}
      {isDrawerOpen && (
        <div className="fixed w-full h-screen sm:-right-6 z-50 sm:-top-10 inset-0 ">
          <TaskDrawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            task={selectedTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      )}
    </>
  );
};
