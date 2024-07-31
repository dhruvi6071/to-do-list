// DescriptionField.jsx
import React from "react";

function DescriptionField({ description, handleChangeDescription }) {
  return (
    <div className="mt-3">
      <input
        onChange={handleChangeDescription}
        value={description}
        type="text"
        placeholder="Description"
        className="w-1/3 p-3 rounded-md"
      />
    </div>
  );
}

export default DescriptionField;
