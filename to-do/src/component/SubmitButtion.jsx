// SubmitButton.jsx
import React from "react";

function SubmitButton({ handleAddOrSave, task, isEdit }) {
  return (
    <button
      onClick={handleAddOrSave}
      disabled={task.length < 3}
      className="bg-pink hover:bg-hoverpink p-3 py-1 text-white text-sm rounded-md mx-7 disabled:bg-disable mt-5 ml-1"
    >
      {isEdit ? "Save" : "Add"}
    </button>
  );
}

export default SubmitButton;
