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
  const [state, dispatch] = useReducer(formReducer, data);
  const [error] = useState({});
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const onChangeInputs = event => {
    const { name, value } = event.target;
    dispatch({ type: "update", payload: { name, value } });
  };
  const onClickSave = () => {
    onSaveCallback(edit ? "EDIT" : "ADD", state);
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
  /* const validate = () => {
    const error = {};
    for (const key in state) {
      let value = state[key];
      switch (key) {
        case "locationName":
          value = value.trim();
          if (value === "") error[key] = "Location name is required !";
          break;
        case "city":
          value = value.trim();
          if (value === "") error[key] = "City is required !";
          break;
        case "state":
          if (value) error[key] = "State is required !";
          break;
        case "phoneNumber":
          value = value.trim();
          if (value) error[key] = "Phone number is required !";
          break;
        case "timeZone":
          if (value) error[key] = "Timezone is required !";
          break;
        default:
      }
    }
  } */
  return <div className="card" style={{ padding: "15px", width: "53%", border: "1px #eee solid", backgroundColor: "#fff" }}>
    <div style={{padding: "5px", fontWeight: "bold", color: "blue"}}>{edit ? "Edit" : "Add"} Location</div>
    <TextInput name="locationName" label="Location Name" value={state.locationName} onChange={onChangeInputs} error={error.locationName} />
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ flex: 1 }}>
        <TextInput name="addressLine1" label="Address Line 1" value={state.addressLine1} onChange={onChangeInputs} />
        <TextInput name="addressLine2" label="Address Line 2" value={state.addressLine2} onChange={onChangeInputs} />
        <div style={{ display: "flex" }}>
          <TextInput name="zipCode" label="Zip Code" value={state.zipCode} onChange={onChangeInputs} />
          <TextInput name="phoneNumber" label="Phone Number" value={state.phoneNumber} onChange={onChangeInputs} />
        </div>
        <TextInput onFocus={() => onClickFacilityTimes()} name="facilityTimes" label="Facility Times" value={state.facilityTimes} onChange={onChangeInputs} />
        {/* <button onClick={onClickFacilityTimes}>Facility Times</button> */}
      </div>
      <div style={{ flex: 1 }}>
        <TextInput name="suiteNo" label="Suite No." value={state.suiteNo} onChange={onChangeInputs} />
        <div style={{ display: "flex" }}>
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
          {/* <TextInput name="state" label="State" value={state.state} onChange={onChangeInputs} /> */}
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
        {/* <TextInput name="timeZone" label="Time Zone" value={state.timeZone} onChange={onChangeInputs} /> */}
        <TagsInput label="Appointment Pool" value={state.appointmentPool} onChange={onChangeAppointmentPool} />
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ width: "150px", display: "flex", justifyContent: "space-between" }}>
        <Button label="Cancel" customStyle={{ backgroundColor: "red" }} onClick={onCancelCallback} />
        <Button label={edit ? "Edit" : "Add"} onClick={onClickSave} />
      </div>
    </div>
    {showFacilityModal && <FacilityTimes cancelCallback={cancelCallbackFacilityModal} saveCallback={saveCallbackFacilityModal} data={get(state, 'facilityTimes', {})} />}
  </div>;
}

export default AddEditLocation;