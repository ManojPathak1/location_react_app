import React, { memo } from "react";
import './TimeSelect.css';

/**
 * Time Select for holding the time. - Controlled Component
 * @param {String} selected Holds the value "AM" or "PM"
 * @param {Function(String)} onChangeMeridiem Function callback for changing the meridiem.
 * @param {Function(String)} onChangeTimeInput Function callback for time input.
 * @param {String} inputText Text input for time.  
 */
function TimeSelect({ selected, onChangeMeridiem, onChangeTimeInput, inputText }) {
  const onChangeTime = event => {
    const value = formatTime(event.target.value);
    onChangeTimeInput(value);
  };
  const formatTime = value => {
    value = value.trim();
    const values = value.split("");
    const len = values.length;
    if (len === 0) return "";
    if (len === 1) {
      if (!isNaN(values[0])) {
        const num1 = Number(values[0]);
        if (num1 > 2) return "";
        return num1;
      }
      return "";
    }
    if (len === 2) {
      if (!isNaN(values[1])) {
        const num1 = Number(values[0]);
        const num2 = Number(values[1]);
        if (num1 === 2) {
          if (num2 > 3) return values[0];
          return value;
        }
        return value;
      }
      return values[0];
    }
    if (len === 3) {
      const c = values[2];
      if (c === ":") return value;
      return values[0] + values[1];
    }
    if (len === 4) {
      if (!isNaN(values[3])) {
        const num1 = Number(values[0]);
        const num2 = Number(values[1]);
        const num3 = Number(values[3]);
        if (num1 === 2 && num2 === 4) {
          if (num3 === 0) return value;
          return values[0] + values[1] + values[2];
        }
        if (num3 > 5) return values[0] + values[1] + values[2];
        return value;
      }
      return values[0] + values[1] + values[2];
    }
    if (len === 5) {
      if (!isNaN(values[4])) {
        const num1 = Number(values[0]);
        const num2 = Number(values[1]);
        const num4 = Number(values[4]);
        if (num1 === 2 && num2 === 4) {
          if (num4 === 0) return convertTo12(value);
          return values[0] + values[1] + values[2] + values[3];
        }
        return convertTo12(value);
      }
      return values[0] + values[1] + values[2] + values[3];
    }
    return values[0] + values[1] + values[2] + values[3] + values[4];
  };
  const convertTo12 = time => {
    let [hour, minutes] = time.split(":");
    hour = Number(hour);
    if (hour === 0) hour = 12;
    if (hour > 12) {
      hour %= 12;
      onChangeMeridiem("PM");
    } else {
      onChangeMeridiem("AM");
    }
    if (hour < 10) hour = "0" + hour;
    return hour + ":" + minutes;
  };
  return <div className="timeSelectContainer">
    <input type="text" onChange={onChangeTime} value={inputText} />
    <div className="ampmBox">
      <div onClick={() => onChangeMeridiem("AM")} className={selected === "AM" ? "selected am" : "am"}>AM</div>
      <div onClick={() => onChangeMeridiem("PM")} className={selected === "PM" ? "selected pm" : "pm"}>PM</div>
    </div>
  </div>;
}

export default memo(TimeSelect);