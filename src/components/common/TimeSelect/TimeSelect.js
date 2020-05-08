import React from "react";
import './TimeSelect.css';

function TimeSelect({ selected, onChangeMeridiem, onChangeTimeInput, inputText }) {
  return <div style={{ display: "flex"}}>
    <input style={{
      width: "70px",
      height: "20px"
    }} type="text" onChange={onChangeTimeInput} value={inputText} />
    <div style={{
      display: "flex",
      justifyContent: "space-evenly", border: "1px #eee solid", margin: "0 10px", alignItems: "center", height: "24px"}}>
      <div style={{ padding: "0 10px", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => onChangeMeridiem("AM")} className={selected === "AM" ? "selected" : ""}>AM</div>
      <div style={{ padding: "0 10px", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => onChangeMeridiem("PM")} className={selected === "PM" ? "selected" : ""}>PM</div>
    </div>
  </div>;
}

export default TimeSelect;