import React, { useState, useEffect, useRef } from "react";
import { useTasks } from "./TaskContext";
import TaskEdit from "./TaskEdit";

const TaskItem = ({ task, column, onHoverIndex }) => {
  const {
    tasks,
    moveTask,
    reorderTasks,
    draggedTaskData,
    startDragging,
    stopDragging,
    deleteTask,
    handleKeyDown,
  } = useTasks();

  const [isDragOver, setIsDragOver] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const taskRef = useRef(null);

  useEffect(() => {
    if (taskRef.current) {
      taskRef.current.tabIndex = 0;
    }
  }, []);

  const handleDragStart = (event) => {
    startDragging(task.id, column);

    const preview = document.createElement("div");
    preview.innerHTML = task.name;
    preview.className = "drag-preview";
    document.body.appendChild(preview);
    event.dataTransfer.setDragImage(preview, 0, 0);
    setTimeout(() => document.body.removeChild(preview), 0);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
    if (onHoverIndex) onHoverIndex(task.id);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
    if (onHoverIndex) onHoverIndex(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);

    if (!draggedTaskData) return;

    const { taskId, from } = draggedTaskData;

    if (from === column) {
      const items = tasks[column];
      const draggedIndex = items.findIndex((t) => t.id === taskId);
      const targetIndex = items.findIndex((t) => t.id === task.id);
      if (draggedIndex !== targetIndex) {
        reorderTasks(column, draggedIndex, targetIndex);
      }
    } else {
      const taskToMove = tasks[from].find((t) => t.id === taskId);
      moveTask(taskToMove, from, column);
    }

    stopDragging();
  };

  const handleDeleteConfirm = () => {
    deleteTask(task, column);
    setShowDeleteConfirm(false);
  };

  const handleKey = (event) => {
    handleKeyDown(event, task);
  };

  return (
    <>
      <div
        ref={taskRef}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={handleKey}
        className={`task-card ${
          draggedTaskData?.taskId === task.id ? "dragging" : ""
        }`}
      >
        <div className="task-body">
          <h3>{task.name}</h3>
          <p>{task.description ? task.description : ""}</p>
        </div>
        <div className="task-actions">
          <button
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            ✏️
          </button>
          <button
            className="delete-button"
            onClick={() => setShowDeleteConfirm(true)}
          >
            🗑️
          </button>
        </div>
      </div>

      {isEditing && (
        <TaskEdit
          task={task}
          column={column}
          onClose={() => setIsEditing(false)}
        />
      )}

      {showDeleteConfirm && (
        <div className="modal-backdrop">
          <div className="modal-panel">
            <p>
              Are you willing to delete <strong>{task.name}</strong>?
            </p>
            <div className="modal-actions">
              <button
                className="delete-button"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
