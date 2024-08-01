// ToggleFinish.jsx
import React from "react";

function ToggleFinish({ toggleFinish, showFinish }) {
  return (
    <div className="ml-96 mt-3">
      <input onChange={toggleFinish} type="checkbox" checked={showFinish} />
      <label> Show completed</label>
    </div>
  );
}

export default ToggleFinish;
