import React, { useState, useEffect } from "react";
import "./Home.css";
import LocationList from "../../components/LocationList/LocationList";
import AddEditLocation from "../../components/AddEditLocation/AddEditLocation";
import FacilityTimes from "../../components/FacilityTimes/FacilityTimes";
import { createDB, addLocation, editLocation } from "../../indexedDb";
import Button from "../../components/common/Button/Button";

function Home() {
  const [currentView, setCurrentView] = useState("LOCATION_LIST");
  const [editLocationData, setEditLocation] = useState({});
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    createDB();
  }, []);
  const onClickAddLocation = () => {
    setCurrentView("ADD_EDIT_LOCATION");
  };
  const onCancelCallback = () => {
    setCurrentView("LOCATION_LIST");
    setEditLocation({});
    setEdit(false);
  };
  const onSaveCallback = (type, formData) => {
    if (type === "ADD") addLocation(formData);
    else editLocation(formData);
    setCurrentView("LOCATION_LIST");
    setEditLocation({});
    setEdit(false);
  }
  const onEditLocation = location => {
    setEditLocation(location);
    setCurrentView("ADD_EDIT_LOCATION");
    setEdit(true);
  };
  const renderSubView = () => {
    switch (currentView) {
      case "LOCATION_LIST": return <LocationList onEdit={onEditLocation} />;
      case "ADD_EDIT_LOCATION": return <AddEditLocation edit={edit} data={editLocationData} onCancelCallback={onCancelCallback} onSaveCallback={onSaveCallback} />;
      case "FACILITY_TIMES": return <FacilityTimes />;
      default:
    }
  };
  return (
    <div>
      <div className="homeHeader">
        <Button customStyle={{ backgroundColor: "blue", borderRadius: "50px", fontSize: "13px" }} label="+ ADD LOCATION" onClick={onClickAddLocation} />
      </div>
      <div className="homeSubview">
        {renderSubView()}
      </div>
    </div>);
}

export default Home;