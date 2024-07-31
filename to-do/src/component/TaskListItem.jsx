import React from "react";
import TaskItem from "./TaskItem";

function TaskListItem({ item, handleCheckBox, handleEdit, handleDelete, toggleExpand, expandedTask }) {
  return (
    <TaskItem
      key={item.id}
      item={item}
      handleCheckBox={handleCheckBox}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      toggleExpand={toggleExpand}
      expandedTask={expandedTask}
    />
  );
}

export default TaskListItem;
