import React, { useState } from "react";
import { useTasks } from "./TaskContext";

const TaskEdit = ({ task, column, onClose }) => {
  const { editTask, moveTask } = useTasks();
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description || "");
  const [nextColumn, setNextColumn] = useState(task.place);

  const handleSave = () => {
    if (!name.trim()) {
      alert("Task name is required!");
      return;
    }

    editTask(task.id, column, { name, description });

    if (nextColumn !== column) {
      moveTask({ ...task, name, description }, column, nextColumn);
    }

    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-panel">
        <h3>Edit Task</h3>

        <input
          type="text"
          value={name}
          autoFocus
          placeholder="Task Name"
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          value={description}
          placeholder="Description (optional)"
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={nextColumn}
          onChange={(e) => setNextColumn(e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div className="modal-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskEdit;
