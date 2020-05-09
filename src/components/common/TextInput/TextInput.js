import React from "react";
import "./TextInput.css";

function TextInput({ name, label, value, onChange, onFocus }) {
  return <div style={{ display: "flex", flexDirection: "column", padding:"10px" }}>
    <label style={{ fontSize: "13px" }}>{label}</label>
    <input className="inputText" onFocus={onFocus} style={{ marginTop: "5px" }} name={name} type="text" value={value} onChange={onChange} />
  </div>;
}

export default TextInput;