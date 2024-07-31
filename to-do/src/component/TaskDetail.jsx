import React from "react";

function TaskDetails({ item, expandedTask }) {
  if (expandedTask !== item.id) return null;

  return (
    <div className="ml-8 mt-2 text-gray-700">
      <div>Description: {item.description}</div>
      <div>Last updated: {item.timestamp}</div>
    </div>
  );
}

export default TaskDetails;
