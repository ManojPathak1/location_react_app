import React, { useReducer } from "react";
import get from "lodash/get";
import forEach from "lodash/forEach";
import "./FacilityTimes.css";
import Checkbox from "../common/Checkbox/Checkbox";
import TimeSelect from "../common/TimeSelect/TimeSelect";
import Button from "../common/Button/Button";
import { facilityTimes } from "../../config";

// Facility reducer to handle the facility states.
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
    case "APPLY_TO_ALL":
      const updateValue = state[key];
      forEach(state, (el, key) => {
        if (el.checked) state = { ...state, [key]: updateValue };
      });
      return state;
    default:
  }
}

/**
 * Facility Times Component
 * @param {Function} cancelCallback Function callback for cancel.
 * @param {Function(Object)} saveCallback Function callback to save the data passed.
 * @param {Object} data Initial data for Facility Component 
 */
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
  const onClickSave = () => {
    saveCallback(state);
  };
  const onChangeFromTimeInput = (fromTime, key) => {
    dispatch({ type: "FROM_TIME", payload: { key, fromTime } });
  };
  const onChangeToTimeInput = (toTime, key) => {
    dispatch({ type: "TO_TIME", payload: { key, toTime } });
  };
  const onClickApplyToAll = key => {
    dispatch({ type: "APPLY_TO_ALL", payload: { key } });
  };
  const renderTimeList = () => {
    return facilityTimes.map(el => (
      <div className="timeSelectBox" key={el.key}>
        <Checkbox name={el.key} checked={get(state, `${el.key}.checked`, false)} label={el.label} onChange={(event) => onChangeCheckbox(event, el.key)} />
        <TimeSelect inputText={get(state, `${el.key}.fromTime`, "")} selected={get(state, `${el.key}.fromMeridiem`, "")} onChangeTimeInput={(value) => onChangeFromTimeInput(value, el.key)} onChangeMeridiem={(value) => onChangeFromMeridiem(value, el.key)} />
        <TimeSelect inputText={get(state, `${el.key}.toTime`, "")} selected={get(state, `${el.key}.toMeridiem`, "")} onChangeTimeInput={(value) => onChangeToTimeInput(value, el.key)} onChangeMeridiem={(value) => onChangeToMeridiem(value, el.key)} />
        <Button customStyle={{ backgroundColor: "white", fontSize: "12px", color: "#000", border: "1px #000 solid" }} onClick={() => { onClickApplyToAll(el.key); }} label="Apply to All Checked" />
      </div>
    ));
  }
  return <div id="overlay">
    <div className="facilityTimesContainer">
      <div className="addEditHeader">FACILITY TIMES</div>
      {renderTimeList()}
      <div className="btnContainer">
        <div className="innerBtnContainer">
          <Button label="Cancel" customStyle={{ backgroundColor: "#FF0000" }} onClick={cancelCallback} />
          <Button label="Save" onClick={onClickSave} />
        </div>
      </div>
    </div>
  </div>;
}

export default FacilityTimes;