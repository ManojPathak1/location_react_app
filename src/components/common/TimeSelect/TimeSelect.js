import React, { useState, useEffect } from "react";
import './TimeSelect.css';

function TimeSelect({ selected, onChangeMeridiem, onChangeTimeInput, inputText }) {
  const [selectedAMPM, setSelectedAMPM] = useState(selected);
  const [text, setText] = useState(inputText);
  useEffect(() => {
    setSelectedAMPM(selected);
    setText(inputText);
  }, [selected, inputText]);
  const onChangeAMPM = val => {
    setSelectedAMPM(val);
    onChangeMeridiem(val);
  }
  const onChangeTime = event => {
    let { value } = event.target;
    setText(value);
    onChangeTimeInput(event);
  };
  return <div className="timeSelectContainer">
    <input type="text" onChange={onChangeTime} value={text} />
    <div className="ampmBox">
      <div onClick={() => onChangeAMPM("AM")} className={selectedAMPM === "AM" ? "selected am" : "am"}>AM</div>
      <div onClick={() => onChangeAMPM("PM")} className={selectedAMPM === "PM" ? "selected pm" : "pm"}>PM</div>
    </div>
  </div>;
}

export default TimeSelect;