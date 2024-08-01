// TaskField.jsx
import React from "react";

function TaskField({ task, handleChangeTask }) {
  return (
    <div className="ml-10">
      <input
        onChange={handleChangeTask}
        value={task}
        type="text"
        placeholder="Add task"
        className="w-10/12 p-3 rounded-md "  
      />
    </div>
  );
}

export default TaskField;
