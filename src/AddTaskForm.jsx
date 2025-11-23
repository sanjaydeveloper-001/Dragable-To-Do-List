import React, { useState } from "react";
import { useTasks } from "./TaskContext";

const AddTaskForm = ({ isOpen, onClose, generateId }) => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [columnKey, setColumnKey] = useState("todo");

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Task name is required!");
      return;
    }

    addTask({
      id: generateId(),
      name: title,
      description: details,
      place: columnKey,
    });

    setTitle("");
    setDetails("");
    setColumnKey("todo");
    onClose();
  };

  const handleCancel = () => {
    setTitle("");
    setDetails("");
    setColumnKey("todo");
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <form onSubmit={handleSubmit} className="modal-panel">
        <h2>Add New Task</h2>
        <input
          type="text"
          placeholder="Task name (required)"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <select
          value={columnKey}
          onChange={(e) => setColumnKey(e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div className="modal-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
