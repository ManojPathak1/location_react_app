import React, { useState, useEffect, lazy, Suspense } from "react";
import "./Home.css";
import { createDB, addLocation, editLocation } from "../../indexedDb";
import Button from "../../components/common/Button/Button";
import { ADD_EDIT_LOCATION, LOCATION_LIST } from "../../constants";

/**
 * Main Container component to render LocationList and Add/Edit Location.
 */

const LocationList = lazy(() => import(/* webpackChunkName: 'locationList' */"../../components/LocationList/LocationList"));
const AddEditLocation = lazy(() => import(/* webpackChunkName: 'addEditLocation' */"../../components/AddEditLocation/AddEditLocation"));

function Home() {
  const [currentView, setCurrentView] = useState(LOCATION_LIST);
  const [editLocationData, setEditLocation] = useState({});
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    createDB();
  }, []);
  const onClickAddLocation = () => {
    setCurrentView(ADD_EDIT_LOCATION);
  };
  const onCancelCallback = () => {
    setCurrentView(LOCATION_LIST);
    setEditLocation({});
    setEdit(false);
  };
  const onSaveCallback = (type, formData) => {
    if (type === "ADD") addLocation(formData);
    else editLocation(formData);
    setCurrentView(LOCATION_LIST);
    setEditLocation({});
    setEdit(false);
  }
  const onEditLocation = location => {
    setEditLocation(location);
    setCurrentView(ADD_EDIT_LOCATION);
    setEdit(true);
  };
  const renderSubView = () => {
    switch (currentView) {
      case LOCATION_LIST: return <Suspense fallback={<div>Loading...</div>}>
        <LocationList onEdit={onEditLocation} />
      </Suspense>;
      case ADD_EDIT_LOCATION: return <Suspense fallback={<div>Loading...</div>}>
        <AddEditLocation edit={edit} data={editLocationData} onCancelCallback={onCancelCallback} onSaveCallback={onSaveCallback} />
      </Suspense>;
      default:
    }
  };
  return (
    <div>
      <div className="homeHeader">
        <Button
          customStyle={{ backgroundColor: "#0000FF", borderRadius: "50px", fontSize: "13px" }}
          label="+ ADD LOCATION"
          onClick={onClickAddLocation} />
      </div>
      <div className="homeSubview">
        {renderSubView()}
      </div>
    </div>);
}

export default Home;