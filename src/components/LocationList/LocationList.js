import React, { useEffect, useState } from "react";
import chunk from "lodash/chunk";
import "./LocationList.css";
import { getLocations, deleteLocation } from "../../indexedDb";
import Pagination from "../common/Pagination/Pagination";

function LocationList({ onEdit }) {
  const [allLocations, setAllLocations] = useState([]);
  const [locations, setLocations] = useState([]);
  const renderAddLocation = () => {
    return <h3>Kindly add location !</h3>;
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
          <div style={{ flex: 5 }}>Location Name</div>
          <div style={{ flex: 8 }}>Address</div>
          <div style={{ flex: 3 }}>Phone No</div>
          <div style={{ flex: 2 }}></div>
        </div>
        <div className="width100">
          {locations.map((el, i) => (
            <div key={el.id} className="list">
              <div style={{ flex: 1 }}>{(i + 1)}</div>
              <div style={{ flex: 5 }}>{el.locationName}</div>
              <div style={{ flex: 8 }}>{el.addressLine1}</div>
              <div style={{ flex: 3 }}>{el.phoneNumber}</div>
              <div className="buttonContainer">
                <button onClick={() => onClickEdit(el)}>Edit</button>
                <button onClick={() => deleteLoc(el.id)}>Delete</button>
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