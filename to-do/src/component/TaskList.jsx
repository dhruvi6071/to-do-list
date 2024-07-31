import React from "react";
import TaskListItem from "./TaskListItem";
import NoTasksMessage from "./NoTask";

function TaskList({ filteredTasks, handleCheckBox, handleEdit, handleDelete, toggleExpand, expandedTask, showFinish }) {
  return (
    <div className="todos">
      {filteredTasks.length === 0 ? (
        <NoTasksMessage />
      ) : (
        filteredTasks.map((item) => (
          (showFinish || !item.isCompleted) && (
            <TaskListItem
              key={item.id}
              item={item}
              handleCheckBox={handleCheckBox}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              toggleExpand={toggleExpand}
              expandedTask={expandedTask}
            />
          )
        ))
      )}
    </div>
  );
}

export default TaskList;
