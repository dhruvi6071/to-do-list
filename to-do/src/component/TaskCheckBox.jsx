import React from "react";

function TaskCheckbox({ item, handleCheckBox }) {
  return (
    <input
      name={item.id}
      onChange={handleCheckBox}
      type="checkbox"
      checked={item.isCompleted}
    />
  );
}

export default TaskCheckbox;
