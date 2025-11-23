import React from "react";
import Column from "./Column";

const Board = () => {
  const columnKeys = ["todo", "inprogress", "done"];

  return (
    <div className="board-grid">
      {columnKeys.map((col) => (
        <Column key={col} column={col} />
      ))}
    </div>
  );
};

export default Board;
