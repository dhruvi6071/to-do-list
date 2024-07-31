// SearchInput.jsx
import React from "react";

function SearchInput({ searchTask, handleSearchChange }) {
  return (
    <input
      onChange={handleSearchChange}
      value={searchTask}
      type="text"
      placeholder="Search tasks..."
      className="w-1/3 p-2"
    />
  );
}

export default SearchInput;
