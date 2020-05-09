import React from "react";
import "./Checkbox.css";

function Checkbox({ name, checked, label, onChange }) {
  return <div className="checkboxContainer">
    <input type="checkbox" defaultChecked={checked} name={name} onChange={onChange} />
    <label>{label}</label>
  </div>;
}

export default Checkbox;