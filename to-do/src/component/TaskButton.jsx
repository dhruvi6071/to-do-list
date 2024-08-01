import React from "react";

function TaskButtons({ item, handleEdit, handleDelete }) {
  return (
    <div className="buttons justify-between flex">
      <button
        onClick={() => handleEdit(item.id)}
        className="bg-pink hover:bg-hoverpink p-3 py-1 text-white text-sm rounded-md ml-52"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(item.id)}
        className="bg-pink hover:bg-hoverpink p-3 py-1 text-white text-sm rounded-md mx-2 "
      >
        Delete
      </button>
    </div>
  );
}

export default TaskButtons;