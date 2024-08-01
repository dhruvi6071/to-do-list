// SearchInput.jsx
import React from "react";

function SearchInput({ searchTask, handleSearchChange }) {
  return (
    <div className="w-9/12">
    <input
      onChange={handleSearchChange}
      value={searchTask}
      type="text"
      placeholder="Search tasks..."
      className="w-8/12 p-2 mr-3 ml-80"
    />
    </div>
  );
}

export default SearchInput;
