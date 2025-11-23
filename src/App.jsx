import React, { useState } from "react";
import { TaskProvider } from "./TaskContext";
import Board from "./Board";
import AddTaskForm from "./AddTaskForm";

const App = () => {
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  return (
    <TaskProvider>
      <div className="app-shell">
        <header className="app-header">
          <div className="header-text">
            <h1>Draggable To-Do</h1>
            <p className="header-subtitle">
              Create, edit, delete and drag tasks between columns.
            </p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setIsNewTaskOpen(true)}
          >
            + Add Task
          </button>
        </header>

        <Board />

        <AddTaskForm
          isOpen={isNewTaskOpen}
          onClose={() => setIsNewTaskOpen(false)}
          generateId={generateId}
        />
      </div>
    </TaskProvider>
  );
};

export default App;
