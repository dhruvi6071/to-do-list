// TaskField.jsx
import React from "react";

function TaskField({ task, handleChangeTask }) {
  return (
    <div>
      <input
        onChange={handleChangeTask}
        value={task}
        type="text"
        placeholder="Add task"
        className="w-1/3 p-3 rounded-md"
      />
    </div>
  );
}

export default TaskField;
