import React, { memo } from "react";
import "./Checkbox.css";

/**
 * Common Checkbox component
 * @param {String} name Name of the field
 * @param {Boolean} checked Flag for checkbox checked | unchecked
 * @param {String} label Label of the checkbox.
 * @param {Function(Object)} onChange Function callback for checked and unchecked with event param. 
 */
function Checkbox({ name, checked, label, onChange }) {
  return <div className="checkboxContainer">
    <input type="checkbox" defaultChecked={checked} name={name} onChange={onChange} />
    <label>{label}</label>
  </div>;
}

export default memo(Checkbox);