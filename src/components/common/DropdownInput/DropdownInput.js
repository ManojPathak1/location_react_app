import React, { useState } from "react";
import "./DropdownInput.css";

function DropdownInput({ label, value, placeholder, options, onChange, error }) {
  const [selected, setSelected] = useState(value);
  const onChangeInput = e => {
    const { value } = e.target;
    setSelected(value);
    onChange(value);
  };
  return <div className="dropdownInputContainer">
    <label>{label}</label>
    <select value={selected} onChange={onChangeInput}>
      <option value="">{placeholder}</option>
      {options.map(el => (
        <option key={el.value} value={el.value}>{el.label}</option>
      ))}
    </select>
    <span>{error || ""}</span>
  </div>;
}

export default DropdownInput;