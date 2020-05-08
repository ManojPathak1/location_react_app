import React, { useReducer } from "react";
import get from "lodash/get";
import "./FacilityTimes.css";
import Checkbox from "../common/Checkbox/Checkbox";
import TimeSelect from "../common/TimeSelect/TimeSelect";
import Button from "../common/Button/Button";
import { facilityTimes } from "../../mockData";

function facilityReducer(state, action) {
  const { key } = action.payload;
  switch (action.type) {
    case "CHECKED":
      const { checked } = action.payload;
      return { ...state, [key]: { ...state[key], checked } };
    case "FROM_MERIDIEM":
      const { fromMeridiem } = action.payload;
      return { ...state, [key]: { ...state[key], fromMeridiem } };
    case "TO_MERIDIEM":
      const { toMeridiem } = action.payload;
      return { ...state, [key]: { ...state[key], toMeridiem } };
    case "FROM_TIME":
      const { fromTime } = action.payload;
      return { ...state, [key]: { ...state[key], fromTime } };
    case "TO_TIME":
      const { toTime } = action.payload;
      return { ...state, [key]: { ...state[key], toTime } };
    default:
  }
}

function FacilityTimes({ cancelCallback, saveCallback, data }) {
  const [state, dispatch] = useReducer(facilityReducer, data);
  const onChangeCheckbox = (event, key) => {
    const { checked } = event.target;
    dispatch({ type: "CHECKED", payload: { key, checked } });
  };
  const onChangeFromMeridiem = (fromMeridiem, key) => {
    dispatch({ type: "FROM_MERIDIEM", payload: { key, fromMeridiem } });
  };
  const onChangeToMeridiem = (toMeridiem, key) => {
    dispatch({ type: "TO_MERIDIEM", payload: { key, toMeridiem } });
  };
  const onClickCancel = () => {
    cancelCallback();
  };
  const onClickSave = () => {
    saveCallback(state);
  };
  const onChangeFromTimeInput = (event, key) => {
    const { value: fromTime } = event.target;
    dispatch({ type: "FROM_TIME", payload: { key, fromTime } });
  };
  const onChangeToTimeInput = (event, key) => {
    const { value: toTime } = event.target;
    dispatch({ type: "TO_TIME", payload: { key, toTime } });
  };
  const renderTimeList = () => {
    return facilityTimes.map(el => (
      <div style={{ display: "flex", padding: "10px 20px",}} key={el.key}>
        <Checkbox name={el.key} checked={get(state, `${el.key}.checked`, false)} label={el.label} onChange={(event) => onChangeCheckbox(event, el.key)} />
        <TimeSelect inputText={get(state, `${el.key}.fromTime`, "")} selected={get(state, `${el.key}.fromMeridiem`, "")} onChangeTimeInput={(event) => onChangeFromTimeInput(event, el.key)} onChangeMeridiem={(value) => onChangeFromMeridiem(value, el.key)} />
        <TimeSelect inputText={get(state, `${el.key}.toTime`, "")} selected={get(state, `${el.key}.toMeridiem`, "")} onChangeTimeInput={(event) => onChangeToTimeInput(event, el.key)} onChangeMeridiem={(value) => onChangeToMeridiem(value, el.key)} />
        <Button label="Apply to All Checked" />
      </div>
    ));
  } 
  return <div id="overlay">
    <div style={{ border: "1px #eee solid", background: "#fff", }}>
      <h4>Facility Times</h4>
      {renderTimeList()}
      <div>
        <button onClick={onClickCancel}>Cancel</button>
        <button onClick={onClickSave}>Save</button>
      </div>
    </div>
  </div>;
}

export default FacilityTimes;