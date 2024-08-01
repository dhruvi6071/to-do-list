// SubmitButton.jsx
import React from "react";

function SubmitButton({ handleAddOrSave, task, isEdit }) {
  return (
    <button
      onClick={handleAddOrSave}
      disabled={task.length < 3}
      className="bg-violet hover:bg-disable p-3 py-1 text-brown text-sm rounded-md mx-7 disabled:bg-disable mt-5 ml-36"
    >
      {isEdit ? "Save" : "Add"}
    </button>
  );
}

export default SubmitButton;
