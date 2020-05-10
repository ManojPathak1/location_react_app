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
              <div style={{ flex: 3 }}>{formatPhoneNumber(el.phoneNumber)}</div>
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