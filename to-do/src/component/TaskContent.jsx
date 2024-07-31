import React from "react";

function TaskContent({ item, toggleExpand, expandedTask }) {
  return (
    <div
      className={`${item.isCompleted ? "line-through" : ""} cursor-pointer`}
      onClick={() => toggleExpand(item.id)}
    >
      {item.task}
    </div>
  );
}

export default TaskContent;
