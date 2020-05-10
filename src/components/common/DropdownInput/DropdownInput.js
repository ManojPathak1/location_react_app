import React, { memo } from "react";
import "./DropdownInput.css";

/**
 * Dropdown Component - Controlled component
 * @param {String} label Label of the input
 * @param {String} value Value of the input
 * @param {String} placeholder Placeholder of the dropdown
 * @param {Array<Object>} options Options array
 * @param {Function(String)} onChange Function callback for the value selection
 * @param {String} error To display error
 */
function DropdownInput({ label, value, placeholder, options, onChange, error }) {
  const onChangeInput = e => {
    const { value } = e.target;
    onChange(value);
  };
  return <div className="dropdownInputContainer">
    <label>{label}</label>
    <select value={value} onChange={onChangeInput}>
      <option value="">{placeholder}</option>
      {options.map(el => (
        <option key={el.value} value={el.value}>{el.label}</option>
      ))}
    </select>
    <span>{error || ""}</span>
  </div>;
}

export default memo(DropdownInput);