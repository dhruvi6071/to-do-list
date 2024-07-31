import React from "react";
import TaskCheckbox from "./TaskCheckBox";
import TaskContent from "./TaskContent";
import TaskButtons from "./TaskButton";
import TaskDetails from "./TaskDetail";

function TaskItem({ item, handleCheckBox, handleEdit, handleDelete, toggleExpand, expandedTask }) {
  return (
    <>
      <div className="todo flex justify-between my-2">
        <div className="flex gap-3">
          <TaskCheckbox item={item} handleCheckBox={handleCheckBox} />
          <TaskContent item={item} toggleExpand={toggleExpand} expandedTask={expandedTask} />
        </div>
        <TaskButtons item={item} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
      <TaskDetails item={item} expandedTask={expandedTask} />
    </>
  );
}

export default TaskItem;
