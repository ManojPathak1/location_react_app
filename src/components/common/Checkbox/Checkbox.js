import React from "react";

function Checkbox({ name, checked, label, onChange }) {
  return <div style={{ width: "80px" }}>
    <input type="checkbox" defaultChecked={checked} name={name} onChange={onChange} />
    <label>{label}</label>
  </div>;
}

export default Checkbox;