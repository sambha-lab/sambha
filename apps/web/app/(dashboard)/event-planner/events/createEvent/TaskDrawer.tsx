import React, { useState } from "react";
import {
  X,
  Plus,
  Edit,
  Calendar,
  DollarSign,
  User,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import { FormCheckBox } from "../../../../../../../packages/ui/src/form/FormCheckbox";
import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "@sambha/ui/button";

interface Milestone {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskUpdate {
  id: number;
  user: string;
  action: string;
  time: string;
  isCurrentUser?: boolean;
}

interface TaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: number;
    title: string;
    cost: string;
    date: string;
    assignees?: string[];
    notes?: string;
    milestones?: Milestone[];
    updates?: TaskUpdate[];
  } | null;
  onUpdateTask?: (taskId: number, updates: any) => void;
  onDeleteTask?: (taskId: number) => void;
}

export const TaskDrawer: React.FC<TaskDrawerProps> = ({
  isOpen,
  onClose,
  task,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [milestones, setMilestones] = useState<Milestone[]>(
    task?.milestones || [
      { id: 1, title: "Secure venue", completed: false },
      { id: 2, title: "Review contract", completed: false },
      { id: 3, title: "Finalize booking", completed: false },
    ]
  );

  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetValue, setBudgetValue] = useState(task?.cost || "$500");
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [notes, setNotes] = useState(task?.notes || "");
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const [updates, setUpdates] = useState<TaskUpdate[]>([
    {
      id: 1,
      user: "You",
      action: "added a new step",
      time: "05:21",
      isCurrentUser: true,
    },
    {
      id: 2,
      user: "You",
      action: "added a new step",
      time: "03:23",
      isCurrentUser: true,
    },
    {
      id: 3,
      user: "Jaydee",
      action: "marked a step as complete",
      time: "10:46",
      isCurrentUser: false,
    },
  ]);

  if (!isOpen || !task) return null;

  // Helper function to generate unique ID
  const generateUpdateId = () => Date.now() + Math.random();

  // Format timestamp to time string
  const formatTime = (timestamp: string | number): string => {
    if (typeof timestamp === "string") return timestamp;

    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) {
      return `${diffMins < 1 ? "now" : diffMins + "m"}`;
    } else if (diffHours < 24) {
      const mins = diffMins % 60;
      return `${diffHours}:${mins.toString().padStart(2, "0")}`;
    } else {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }
  };

  if (!isOpen || !task) return null;

  const handleMilestoneToggle = (milestoneId: number) => {
    const milestone = milestones.find((m) => m.id === milestoneId);
    if (!milestone) return;

    const updatedMilestones = milestones.map((m) =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );

    setMilestones(updatedMilestones);

    // Add update to activity feed
    const newUpdate: TaskUpdate = {
      id: Date.now(), // Use timestamp as unique ID
      time: new Date().getTime().toString(),
      user: "You",
      isCurrentUser: true,
      action: milestone.completed
        ? "unmarked a step as complete"
        : "marked a step as complete",
    };

    setUpdates((prev) => [newUpdate, ...prev]);
  };

  const handleAddMilestone = () => {
    if (newMilestoneTitle.trim()) {
      const newMilestone: Milestone = {
        id: Math.max(...milestones.map((m) => m.id)) + 1,
        title: newMilestoneTitle,
        completed: false,
      };

      setMilestones([...milestones, newMilestone]);

      // Add update to activity feed
      const newUpdate: TaskUpdate = {
        id: generateUpdateId(),
        time: formatTime(new Date().getTime().toString()),
        user: "You",
        isCurrentUser: true,
        action: `added milestone: "${newMilestoneTitle}"`,
      };

      setUpdates((prev) => [newUpdate, ...prev]);

      setNewMilestoneTitle("");
      setShowAddMilestone(false);
    }
  };

  const handleDeleteMilestone = (milestoneId: number) => {
    const milestone = milestones.find((m) => m.id === milestoneId);
    if (!milestone) return;

    setMilestones(milestones.filter((m) => m.id !== milestoneId));

    // Add update to activity feed
    const newUpdate: TaskUpdate = {
      id: generateUpdateId(),
      time: formatTime(new Date().getTime().toString()),
      user: "You",
      isCurrentUser: true,
      action: `removed milestone: "${milestone.title}"`,
    };

    setUpdates((prev) => [newUpdate, ...prev]);
  };

  const handleSaveBudget = () => {
    const oldBudget = task?.cost || "$500";
    setIsEditingBudget(false);

    if (onUpdateTask && budgetValue !== oldBudget) {
      onUpdateTask(task.id, { cost: budgetValue });

      // Add update to activity feed
      const newUpdate: TaskUpdate = {
        id: generateUpdateId(),
        time: formatTime(new Date().getTime().toString()),
        user: "You",
        isCurrentUser: true,
        action: `updated budget from ${oldBudget} to ${budgetValue}`,
      };

      setUpdates((prev) => [newUpdate, ...prev]);
    }
  };

  const handleSaveNotes = () => {
    setIsEditingNotes(false);

    if (onUpdateTask) {
      onUpdateTask(task.id, { notes });

      // Add update to activity feed if notes were actually changed
      if (notes !== (task?.notes || "")) {
        const newUpdate: TaskUpdate = {
          id: generateUpdateId(),
          time: formatTime(new Date().getTime().toString()),
          user: "You",
          isCurrentUser: true,
          action: notes.trim()
            ? "added notes to task"
            : "removed notes from task",
        };

        setUpdates((prev) => [newUpdate, ...prev]);
      }
    }
  };

  const handleDeleteTask = () => {
    if (
      onDeleteTask &&
      window.confirm("Are you sure you want to delete this task?")
    ) {
      onDeleteTask(task.id);
      onClose();
    }
  };
  return (
    <>
      {/* Overlay */}
      <dialog
        className="absolute w-screen h-screen  inset-0 bg-[#2603d7] bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed ${isOpen ? "right-0" : "right-[100vw]"}  -top-8 h-screen shadow-[0px_4px_4px_0px] shadow-black-100/25 w-full max-w-md bg-primary-light  z-[9999] transform transition-transform duration-1000 ease-in-out overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex-col flex justify-between  h-full">
          <div>
            {" "}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 pr-4">
                {task.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Milestones */}
              <div className="space-y-3">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <FormCheckBox
                        checked={milestone.completed}
                        onChange={() => handleMilestoneToggle(milestone.id)}
                      />
                      <span
                        className={`text-base ${
                          milestone.completed
                            ? "text-gray-500 line-through"
                            : "text-gray-900"
                        }`}
                      >
                        {milestone.title}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteMilestone(milestone.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                    >
                      <MoreHorizontal size={16} className="text-gray-400" />
                    </button>
                  </div>
                ))}

                {/* Add Milestone Form */}
                {showAddMilestone && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newMilestoneTitle}
                      onChange={(e) => setNewMilestoneTitle(e.target.value)}
                      placeholder="Enter milestone title"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-main"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddMilestone();
                        } else if (e.key === "Escape") {
                          setShowAddMilestone(false);
                          setNewMilestoneTitle("");
                        }
                      }}
                    />
                    <button
                      className="px-3 py-1 text-gray-600 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                      onClick={handleAddMilestone}
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddMilestone(false);
                        setNewMilestoneTitle("");
                      }}
                      className="px-3 py-1 text-gray-600 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* Add Milestone Button */}
                {!showAddMilestone && (
                  <button
                    onClick={() => setShowAddMilestone(true)}
                    className="flex items-center gap-2 text-primary-dark hover:text-primary-darkPurple transition-colors"
                  >
                    <Plus size={16} />
                    <span className="text-sm font-medium">Add milestone</span>
                  </button>
                )}
              </div>

              {/* Budget Section */}
              <div className="space-y-4">
                <hr className="border-gray-200" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-gray-400" />
                    {isEditingBudget ? (
                      <input
                        type="text"
                        value={budgetValue}
                        onChange={(e) => setBudgetValue(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary-main"
                        onBlur={handleSaveBudget}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSaveBudget();
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <span className="text-lg font-semibold text-gray-900">
                        {budgetValue}
                      </span>
                    )}
                  </div>
                  {!isEditingBudget && (
                    <button
                      onClick={() => setIsEditingBudget(true)}
                      className="text-primary-dark hover:text-primary-darkPurple text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-red-500" />
                  <span className="text-red-500 font-medium">{task.date}</span>
                </div>

                {/* Assign Task */}
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <User size={16} />
                  <span className="text-sm">Assign task</span>
                </button>

                {/* Notes */}
                <div className="space-y-2">
                  <button
                    onClick={() => setIsEditingNotes(true)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <FileText size={16} />
                    <span className="text-sm">
                      {notes ? "Edit notes" : "Add notes"}
                    </span>
                  </button>

                  {(isEditingNotes || notes) && (
                    <div className="">
                      {isEditingNotes ? (
                        <div className="space-y-2">
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add your notes here..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-main resize-none"
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => setIsEditingNotes(false)}
                              className="px-3 py-1 bg-primary-main text-primary-light rounded-lg text-sm hover:bg-primary-main/90 transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setIsEditingNotes(false);
                                setNotes(task?.notes || "");
                              }}
                              className="px-3 py-1 text-gray-600 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                          {notes}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Latest Updates */}
          <div className="px-6">
            <div>
              <div className="space-y-4">
                <div className="py-3 px-5 bg-[#F9F9F9] rounded-xl">
                  <hr className="w-12 bottom-1 border-[#D0D5DD]" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Latest Updates
                  </h3>
                  <div className="space-y-3">
                    {updates.map((update) => (
                      <div key={update.id} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold bg-gradient-primary`}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{update.user}</span>{" "}
                            <span className="text-gray-600">
                              {update.action}
                            </span>
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {update.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className=" p-6 mt-auto">
              <button
                onClick={handleDeleteTask}
                className="w-full text-red-500 hover:text-red-700 font-medium py-2 transition-colors"
              >
                Delete task
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
