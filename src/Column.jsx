import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { useTasks } from "./TaskContext";

const Column = ({ column }) => {
  const { tasks, draggedTaskData, moveTask, stopDragging } = useTasks();
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const [isColumnHovered, setIsColumnHovered] = useState(false);

  const handleColumnDrop = (event) => {
    event.preventDefault();
    if (!draggedTaskData) return;

    const { taskId, from } = draggedTaskData;

    if (from !== column) {
      const taskToMove = tasks[from].find((t) => t.id === taskId);
      const alreadyExists = tasks[column].some((t) => t.id === taskId);

      if (!alreadyExists && taskToMove) {
        moveTask(taskToMove, from, column);
      }
    }

    stopDragging();
    setHoveredTaskId(null);
    setIsColumnHovered(false);
  };

  const handleColumnDragOver = (event) => {
    event.preventDefault();
    setIsColumnHovered(true);
  };

  const handleColumnDragLeave = (event) => {
    if (event.currentTarget === event.target) {
      setIsColumnHovered(false);
      setHoveredTaskId(null);
    }
  };

  const visibleTasks = tasks[column].filter(
    (task, index, self) =>
      index === self.findIndex((t) => t.id === task.id)
  );

  return (
    <div
      onDrop={handleColumnDrop}
      onDragOver={handleColumnDragOver}
      onDragLeave={handleColumnDragLeave}
      className={`task-column ${isColumnHovered ? "hovered" : ""}`}
    >
      <h3>{column.toUpperCase()}</h3>
      {visibleTasks.length > 0 ? (
        visibleTasks.map((task) => (
          <div key={task.id} className="task-wrapper">
            {draggedTaskData &&
              draggedTaskData.from === column &&
              hoveredTaskId === task.id &&
              isColumnHovered && <div className="inline-placeholder"></div>}
            <TaskItem
              task={task}
              column={column}
              onHoverIndex={(id) => setHoveredTaskId(id)}
            />
          </div>
        ))
      ) : (
        !isColumnHovered && (
          <h5 className="empty-state-text">
            No tasks — add one using the “Add Task” button.
          </h5>
        )
      )}

      {draggedTaskData &&
        draggedTaskData.from !== column &&
        isColumnHovered && <div className="drop-placeholder"></div>}
    </div>
  );
};

export default Column;
