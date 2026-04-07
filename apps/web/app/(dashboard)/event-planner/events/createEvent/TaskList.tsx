import React, { useState } from "react";
import { FormCheckBox } from "../../../../../../../packages/ui/src/form/FormCheckbox";
import { Plus } from "lucide-react";
import { TaskDrawer } from "./TaskDrawer";

interface Task {
  id: number;
  title: string;
  cost: string;
  date: string;
  completed: boolean;
  assignees?: string[];
  notes?: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete?: (id: number) => void;
  onTaskClick: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onTaskClick,
}) => {
  return (
    <div
      className="flex items-center gap-4 p-4  hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => onTaskClick(task)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <FormCheckBox
          id={`task-${task.id}`}
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
      </div>

      <div className="flex-1">
        <h3
          className={`text-base font-medium ${task.completed ? "text-gray-500 line-through" : "text-gray-900"}`}
        >
          {task.title}
        </h3>
        <div className="flex items-center gap-4 mt-1">
          <span
            className={`text-sm font-semibold ${task.completed ? "text-gray-400" : "text-green-600"}`}
          >
            {task.cost}
          </span>
          <span className="text-sm text-gray-500">{task.date}</span>
        </div>
      </div>

      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Book the Perfect Venue",
      cost: "£4,500",
      date: "Thu, Feb 19",
      completed: false,
      assignees: ["John Doe", "Jane Smith"],
      notes: "Need to finalize the venue booking by end of month",
    },
    {
      id: 2,
      title: "Arrange Delicious Catering for Your Guests",
      cost: "£8,000",
      date: "Sun, Feb 22",
      completed: false,
      assignees: ["Jane Smith"],
      notes: "",
    },
    {
      id: 3,
      title: "Capture Every Moment with Photography & Videography",
      cost: "£3,000",
      date: "Sun, Feb 22",
      completed: false,
      assignees: ["Michael Brown", "Sarah Johnson"],
      notes: "",
    },
    {
      id: 4,
      title: "Set the Mood with Entertainment (DJ/Band)",
      cost: "£1,500",
      date: "Sun, Feb 22",
      completed: false,
      assignees: [],
      notes: "",
    },
    {
      id: 5,
      title: "Decorate the Venue with Beautiful Florals & Décor",
      cost: "£2,000",
      date: "Sun, Feb 22",
      completed: false,
      assignees: ["John Doe"],
      notes: "",
    },
    {
      id: 6,
      title: "Find the Perfect Attire for the Bride and Groom",
      cost: "£3,500",
      date: "Sun, Feb 22",
      completed: false,
      assignees: [],
      notes: "",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    cost: "",
    date: "",
  });

  // Drawer state
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
      <div className="pt-12">
        <div className="space-y-2 mb-8">
          <p className="text-xl sm:text-2xl font-semibold text-primary-darkPurple">
            Task list
          </p>
          <p className="text-gray-base">
            Here's what you might need to do before your event - including
            budgets.
          </p>
        </div>

        <div className="space-y-3">
          <div className="max-h-52 overflow-y-scroll thin-scrollbar">
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
        {tasks.length > 0 && (
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
                    const cost = task.cost.replace(/[£,]/g, "");
                    return sum + (parseFloat(cost) || 0);
                  }, 0)
                  .toLocaleString("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  })}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-dark h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(tasks.filter((t) => t.completed).length / tasks.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Task Drawer */}
      <TaskDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        task={selectedTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
};
