// ToggleFinish.jsx
import React from "react";

function ToggleFinish({ toggleFinish, showFinish }) {
  return (
    <div>
      <input onChange={toggleFinish} type="checkbox" checked={showFinish} />
      <label> Show completed</label>
    </div>
  );
}

export default ToggleFinish;
