import React, { useEffect, useState } from "react";
import chunk from "lodash/chunk";
import "./LocationList.css";
import { getLocations, deleteLocation } from "../../indexedDb";
import Pagination from "../common/Pagination/Pagination";
import { formatPhoneNumber } from "../../utils";

/**
 * Location list component
 * @param {Function} onEdit Function callback to trigger the view change to ADD | EDIT location. 
 */
function LocationList({ onEdit }) {
  const [allLocations, setAllLocations] = useState(null);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    getLocations().then(setAllLocations);
  }, []);
  const deleteLoc = id => {
    deleteLocation(id).then(getLocations).then(setAllLocations);
  };
  const paginationUpdate = (limit, currentPage) => {
    setLocations(chunk(allLocations, limit)[currentPage - 1]);
  };
  const renderAddLocation = () => {
    return <div className="noLocationContainer">
      <img alt="" src="./images/addLocation.png" height="300" />
      <h3>Kindly Add Your Location First</h3>
      <span>There is no location added right now</span>
    </div>;
  };
  const renderTable = () => {
    return (<div>
      <div className="width100">
        <div className="listHeader">
          <div className="sno"></div>
          <div className="locationName">LOCATION NAME</div>
          <div className="address">ADDRESS</div>
          <div className="phoneNumber">PHONE NUMBER</div>
          <div className="actions"></div>
        </div>
        <div className="width100">
          {locations.map((el, i) => (
            <div key={el.id} className="list">
              <div className="sno">{(i + 1)}</div>
              <div className="locationName">{el.locationName}</div>
              <div className="address">{[el.addressLine1, el.addressLine2, el.city, el.state, el.zipCode].filter(el => el).join(", ")}</div>
              <div className="phoneNumber">{formatPhoneNumber(el.phoneNumber)}</div>
              <div className="buttonContainer">
                <img onClick={() => onEdit(el)} alt="" src="./images/edit.png" width="18" />
                <img onClick={() => deleteLoc(el.id)} alt="" src="./images/delete.png" width="18" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination length={allLocations.length} paginationUpdate={paginationUpdate} />
    </div>);
  };
  const showAddLocation = allLocations !== null && allLocations.length === 0;
  const showTable = allLocations !== null && allLocations.length > 0;
  return <div className="locationListContainer">
    {showTable && renderTable()}
    {showAddLocation && renderAddLocation()}
  </div>;
}

export default LocationList;