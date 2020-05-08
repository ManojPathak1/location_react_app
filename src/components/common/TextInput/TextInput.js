import React from "react";

function TextInput({ name, label, value, onChange }) {
  return <div style={{ display: "flex", flexDirection: "column" }}>
    <label>{label}</label>
    <input name={name} type="text" value={value} onChange={onChange} />
  </div>;
}

export default TextInput;