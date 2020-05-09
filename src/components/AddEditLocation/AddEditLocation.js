import React, { useReducer, useState } from "react";
import get from "lodash/get";
import "./AddEditLocation.css";
import TextInput from "../common/TextInput/TextInput";
import FacilityTimes from "../FacilityTimes/FacilityTimes";
import TagsInput from "../common/TagsInput/TagsInput";
import DropdownInput from "../common/DropdownInput/DropdownInput";
import Button from "../common/Button/Button";

function formReducer(state, action) {
  switch (action.type) {
    case "update":
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    default:
  }
}

function AddEditLocation({ onCancelCallback, onSaveCallback, data, edit }) {
  console.log(data);
  const [state, dispatch] = useReducer(formReducer, data);
  const [error, setError] = useState({});
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const onChangeInputs = event => {
    let { name, value } = event.target;
    switch (name) {
      case "phoneNumber":
      case "zipCode":
        value = value.trim();
        break;
      default:
    }
    dispatch({ type: "update", payload: { name, value } });
  };
  const onClickSave = () => {
    console.log("onClickSave");
    if (validate()) onSaveCallback(edit ? "EDIT" : "ADD", state);
  };
  const onClickFacilityTimes = () => {
    setShowFacilityModal(true);
  };
  const cancelCallbackFacilityModal = () => {
    setShowFacilityModal(false);
  }
  const saveCallbackFacilityModal = value => {
    dispatch({ type: "update", payload: { name: "facilityTimes", value } });
    setShowFacilityModal(false);
  };
  const onChangeTimeZone = (value) => {
    dispatch({ type: "update", payload: { name: "timeZone", value } });
  };
  const onChangeState = value => {
    console.log(value);
    dispatch({ type: "update", payload: { name: "state", value } });
  }
  const onChangeAppointmentPool = value => {
    dispatch({ type: "update", payload: { name: "appointmentPool", value } });
  }
  const validate = () => {
    const error = {};
    for (const key in state) {
      let value = state[key];
      switch (key) {
        case "locationName":
          value = value.trim();
          if (!value) error[key] = "Location name is required !";
          break;
        case "city":
          value = value.trim();
          if (!value) error[key] = "City is required !";
          break;
        case "state":
          if (!value) error[key] = "State is required !";
          break;
        case "phoneNumber":
          value = value.trim();
          if (value) {
            const pattern = new RegExp("/^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/");
            const res = pattern.test(value);
            if (false) error[key] = "Phone number not valid !";
          }
          break;
        case "timeZone":
          if (!value) error[key] = "Timezone is required !";
          break;
        case "zipCode":
          if (value) {
            const pattern = new RegExp("/^[a-zA-Z0-9]{5,10}$/");
            const res = pattern.test(value);
            if (false) error[key] = "Zipcode not valid !"; 
          }
          break;
        default:
      }
    }
    setError(error);
    console.log(Object.values(error));
    console.log(Object.values(error).length === 0);
    return Object.values(error).length === 0;
  }
  return <div className="addEditLocationContainer">
    <div className="addEditHeader">{edit ? "Edit" : "Add"} Location</div>
    <TextInput name="locationName" label="Location Name" value={state.locationName} onChange={onChangeInputs} error={error.locationName} />
    <div className="addEditFields">
      <div className="addEditDivision">
        <TextInput name="addressLine1" label="Address Line 1" value={state.addressLine1} onChange={onChangeInputs} />
        <TextInput name="addressLine2" label="Address Line 2" value={state.addressLine2} onChange={onChangeInputs} />
        <div className="displayFlex">
          <TextInput name="zipCode" label="Zip Code" value={state.zipCode} onChange={onChangeInputs} error={error.zipCode} />
          <TextInput name="phoneNumber" label="Phone Number" value={state.phoneNumber} onChange={onChangeInputs} error={error.phoneNumber} />
        </div>
        <TextInput onFocus={() => onClickFacilityTimes()} name="facilityTimes" label="Facility Times" value={state.facilityTimes} onChange={onChangeInputs} />
      </div>
      <div className="addEditDivision">
        <TextInput name="suiteNo" label="Suite No." value={state.suiteNo} onChange={onChangeInputs} />
        <div className="displayFlex">
          <TextInput name="city" label="City" value={state.city} onChange={onChangeInputs} />
          <DropdownInput
            label="State"
            value={state.state}
            onChange={onChangeState}
            placeholder="Select State"
            options={[
              { label: "Time Zone 1", value: "timezone1" },
              { label: "Time Zone 2", value: "timezone2" },
              { label: "Time Zone 3", value: "timezone3" }
            ]} />
        </div>
        <DropdownInput
          label="Time Zone"
          value={state.timeZone}
          onChange={onChangeTimeZone}
          placeholder="Select Time Zone"
          options={[
            { label: "Time Zone 1", value: "timezone1" },
            { label: "Time Zone 2", value: "timezone2" },
            { label: "Time Zone 3", value: "timezone3" }
          ]} />
        <TagsInput label="Appointment Pool" value={state.appointmentPool} onChange={onChangeAppointmentPool} />
      </div>
    </div>
    <div className="addEditBtnBox">
      <div className="addEditBtnInnerBox">
        <Button label="Cancel" customStyle={{ backgroundColor: "red" }} onClick={onCancelCallback} />
        <Button label={edit ? "Edit" : "Add"} onClick={onClickSave} />
      </div>
    </div>
    {showFacilityModal && <FacilityTimes cancelCallback={cancelCallbackFacilityModal} saveCallback={saveCallbackFacilityModal} data={get(state, 'facilityTimes', {})} />}
  </div>;
}

export default AddEditLocation;