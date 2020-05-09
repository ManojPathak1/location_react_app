import React, { useState } from "react";

function DropdownInput({ label, value, placeholder, options, onChange }) {
  const [selected, setSelected] = useState(value);
  const onChangeInput = e => {
    console.log(e.target.value);
    const { value } = e.target;
    setSelected(value);
    onChange(value);
  };
  return <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
    <label style={{ fontSize: "13px" }}>{label}</label>
    <select style={{ marginTop: "5px", fontSize: "15px" }} value={selected} onChange={onChangeInput}>
      <option value="">{placeholder}</option>
      {options.map(el => (
        <option key={el.value} value={el.value}>{el.label}</option>
      ))}
    </select>
  </div>;
}

export default DropdownInput;