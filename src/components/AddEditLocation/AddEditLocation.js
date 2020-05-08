import React, { useReducer, useState } from "react";
import get from "lodash/get";
import TextInput from "../common/TextInput/TextInput";
import FacilityTimes from "../FacilityTimes/FacilityTimes";

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
  return <div style={{ padding: "15px" }}>
    <h3>{edit ? "Edit" : "Add"} Location</h3>
    <TextInput name="locationName" label="Location Name" value={state.locationName} onChange={onChangeInputs} error={error.locationName} />
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <TextInput name="addressLine1" label="Address Line 1" value={state.addressLine1} onChange={onChangeInputs} />
        <TextInput name="addressLine2" label="Address Line 2" value={state.addressLine2} onChange={onChangeInputs} />
        <div style={{ display: "flex" }}>
          <TextInput name="zipCode" label="Zip Code" value={state.zipCode} onChange={onChangeInputs} />
          <TextInput name="phoneNumber" label="Phone Number" value={state.phoneNumber} onChange={onChangeInputs} />
        </div>
        {/* <TextInput name="facilityTimes" label="Facility Times" value={state.facilityTimes} onChange={onChangeInputs} /> */}
        <button onClick={onClickFacilityTimes}>Facility Times</button>
      </div>
      <div>
        <TextInput name="suiteNo" label="Suite No." value={state.suiteNo} onChange={onChangeInputs} />
        <div style={{ display: "flex" }}>
          <TextInput name="city" label="City" value={state.city} onChange={onChangeInputs} />
          <TextInput name="state" label="State" value={state.state} onChange={onChangeInputs} />
        </div>
        <TextInput name="timeZone" label="Time Zone" value={state.timeZone} onChange={onChangeInputs} />
        <TextInput name="appointmentPool" label="Appointment Pool" value={state.appointmentPool} onChange={onChangeInputs} />
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button onClick={onCancelCallback}>Cancel</button>
      <button onClick={onClickSave}>{edit ? "Edit" : "Add"}</button>
    </div>
    {showFacilityModal && <FacilityTimes cancelCallback={cancelCallbackFacilityModal} saveCallback={saveCallbackFacilityModal} data={get(state, 'facilityTimes', {})} />}
  </div>;
}

export default AddEditLocation;