import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

const DEFAULT_TASKS = {
  todo: [],
  inprogress: [],
  done: [],
};

const TASKS_STORAGE_KEY = "task-board-tasks";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_TASKS;

    try {
      const stored = localStorage.getItem(TASKS_STORAGE_KEY);
      if (!stored) return DEFAULT_TASKS;

      const parsed = JSON.parse(stored);
      return {
        todo: parsed.todo ?? [],
        inprogress: parsed.inprogress ?? [],
        done: parsed.done ?? [],
      };
    } catch (error) {
      console.error("Failed to parse tasks from localStorage:", error);
      return DEFAULT_TASKS;
    }
  });

  const [draggedTaskData, setDraggedTaskData] = useState(null);
  const columns = ["todo", "inprogress", "done"];

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
    }
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => ({
      ...prev,
      [task.place]: [...prev[task.place], task],
    }));
  };

  const deleteTask = (task, from) => {
    setTasks((prev) => ({
      ...prev,
      [from]: prev[from].filter((t) => t.id !== task.id),
    }));
  };

  const editTask = (taskId, from, updates) => {
    setTasks((prev) => ({
      ...prev,
      [from]: prev[from].map((t) =>
        t.id === taskId ? { ...t, ...updates } : t
      ),
    }));
  };

  const moveTask = (task, from, to) => {
    if (!columns.includes(to)) return;

    setTasks((prev) => ({
      ...prev,
      [from]: prev[from].filter((t) => t.id !== task.id),
      [to]: [...prev[to], { ...task, place: to }],
    }));
  };

  const handleKeyDown = (event, task) => {
    const from = task.place;
    const currentIndex = columns.indexOf(from);

    if (
      event.ctrlKey &&
      event.key === "ArrowRight" &&
      currentIndex < columns.length - 1
    ) {
      moveTask(task, from, columns[currentIndex + 1]);
    }

    if (
      event.ctrlKey &&
      event.key === "ArrowLeft" &&
      currentIndex > 0
    ) {
      moveTask(task, from, columns[currentIndex - 1]);
    }
  };

  const reorderTasks = (column, startIndex, endIndex) => {
    setTasks((prev) => {
      const items = [...prev[column]];
      const [moved] = items.splice(startIndex, 1);
      items.splice(endIndex, 0, moved);
      return { ...prev, [column]: items };
    });
  };

  const startDragging = (taskId, from) =>
    setDraggedTaskData({ taskId, from });

  const stopDragging = () => setDraggedTaskData(null);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        editTask,
        moveTask,
        handleKeyDown,
        reorderTasks,
        draggedTaskData,
        startDragging,
        stopDragging,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
