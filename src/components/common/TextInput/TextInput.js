import React, { memo } from "react";
import "./TextInput.css";

/**
 * Input field - Controlled Component
 * @param {String} name Name of the input
 * @param {String} label Label of the input
 * @param {String} value Value of the input
 * @param {Function(Object)} onChange Function callback for event
 * @param {Function} onFocus onFocus callback for input
 * @param {String} error Error for the input field
 */
function TextInput({ name, label, value, onChange, onFocus, error }) {
  return <div className="textInputContainer">
    <label>{label}</label>
    <input autoComplete="off" className="inputText" onFocus={onFocus} name={name} type="text" value={value || ""} onChange={onChange} />
    <span>{error || ""}</span>
  </div>;
}

export default memo(TextInput);