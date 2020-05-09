import React, { useEffect, useState } from "react";
import chunk from "lodash/chunk";
import "./LocationList.css";
import { getLocations, deleteLocation } from "../../indexedDb";
import Pagination from "../common/Pagination/Pagination";

function LocationList({ onEdit }) {
  const [allLocations, setAllLocations] = useState([]);
  const [locations, setLocations] = useState([]);
  const renderAddLocation = () => {
    return <div className="noLocationContainer">
      <img alt="" src="./images/addLocation.png" height="300" />
      <h3>Kindly Add Your Location First</h3>
      <span>There is no location added right now</span>
    </div>;
  };
  useEffect(() => {
    getLocations().then(setAllLocations);
  }, []);
  const deleteLoc = id => {
    deleteLocation(id).then(() => {
      getLocations().then(setAllLocations);
    });
  };
  const onClickEdit = location => {
    onEdit(location);
  };
  const paginationUpdate = (limit, currentPage) => {
    setLocations(chunk(allLocations, limit)[currentPage - 1]);
  };
  const renderTable = () => {
    return (<div>
      <div className="width100">
        <div className="listHeader">
          <div style={{ flex: 1 }}></div>
          <div style={{ flex: 5 }}>LOCATION NAME</div>
          <div style={{ flex: 8 }}>ADDRESS</div>
          <div style={{ flex: 3 }}>PHONE NUMBER</div>
          <div style={{ flex: 2 }}></div>
        </div>
        <div className="width100">
          {locations.map((el, i) => (
            <div key={el.id} className="list">
              <div style={{ flex: 1 }}>{(i + 1)}</div>
              <div style={{ flex: 5 }}>{el.locationName}</div>
              <div style={{ flex: 8 }}>{[el.addressLine1, el.addressLine2, el.city, el.state, el.zipCode].filter(el => el).join(", ")}</div>
              <div style={{ flex: 3 }}>{el.phoneNumber}</div>
              <div className="buttonContainer">
                <i onClick={() => onClickEdit(el)} class="fa fa-edit"></i>
                <i onClick={() => deleteLoc(el.id)} class="fa fa-trash"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination length={allLocations.length} paginationUpdate={paginationUpdate} />
    </div>);
  };
  const showTable = allLocations.length > 0;
  return <div className="locationListContainer">
    {showTable ? renderTable() : renderAddLocation()}
  </div>;
}

export default LocationList;