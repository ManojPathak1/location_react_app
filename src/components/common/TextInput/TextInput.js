import React from "react";
import "./TextInput.css";

function TextInput({ name, label, value, onChange, onFocus, error }) {
  return <div className="textInputContainer">
    <label>{label}</label>
    <input className="inputText" onFocus={onFocus} name={name} type="text" value={value} onChange={onChange} />
    <span>{error || ""}</span>
  </div>;
}

export default TextInput;