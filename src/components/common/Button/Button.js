import React, { memo } from "react";

/**
 * Common Button Component
 * @param {String} label Button Label
 * @param {Function} onClick Function event for onClick
 * @param {Object} customStyle Custom style for button
 * @param {Boolean} disabled Enable/Disable button flag  
 */
function Button({ label, onClick, customStyle, disabled }) {
  return <button style={{
    fontSize: "15px",
    padding: "5px 12px",
    border: "none",
    color: "#fff",
    borderRadius: "4px",
    backgroundColor: "#4BB543",
    cursor: "pointer",
    outline: "none",
    boxShadow: "none",
    ...customStyle
  }} disabled={disabled} onClick={onClick}>{label.toUpperCase()}</button>;
}

export default memo(Button);