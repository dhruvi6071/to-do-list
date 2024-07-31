// SearchBar.jsx
import React from "react";
import SearchInput from "./SearchInput";
import ToggleFinish from "./ToggleFinish";

function SearchBar({ searchTask, handleSearchChange, toggleFinish, showFinish }) {
  return (
    <div className="my-4">
      <SearchInput searchTask={searchTask} handleSearchChange={handleSearchChange} />
      <ToggleFinish toggleFinish={toggleFinish} showFinish={showFinish} />
    </div>
  );
}

export default SearchBar;
