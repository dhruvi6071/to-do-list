// TaskInput.jsx
import React from "react";
import TaskTitle from "./TaskTitle";
import TaskField from "./TaskField";
import DescriptionField from "./DescriptionField";
import SubmitButton from "./SubmitButtion";

function TaskInput({ task, description, handleChangeTask, handleChangeDescription, handleAddOrSave, isEdit }) {
  return (
    <div className="addToDo">
      <TaskTitle />
      <TaskField task={task} handleChangeTask={handleChangeTask} />
      <DescriptionField description={description} handleChangeDescription={handleChangeDescription} />
      <SubmitButton handleAddOrSave={handleAddOrSave} task={task} isEdit={isEdit} />
    </div>
  );
}

export default TaskInput;
