import React from "react";

function Button({ label, onClick, customStyle }) {
  return <button style={{
    fontSize: "17px",
    padding: "5px 12px",
    border: "none",
    color: "white",
    borderRadius: "4px",
    backgroundColor: "green",
    ...customStyle
  }} onClick={onClick}>{label}</button>;
}

export default Button;