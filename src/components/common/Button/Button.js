import React from "react";

function Button({ label, onClick, customStyle, disabled }) {
  return <button style={{
    fontSize: "15px",
    padding: "5px 12px",
    border: "none",
    color: "white",
    borderRadius: "4px",
    backgroundColor: "green",
    cursor: "pointer",
    outline: "none",
    boxShadow: "none",
    ...customStyle
  }} disabled={disabled} onClick={onClick}>{label.toUpperCase()}</button>;
}

export default Button;