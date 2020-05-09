import React, { useEffect, useState } from "react";
import chunk from "lodash/chunk";
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
    console.log("Pagination Update");
    console.log(limit);
    console.log(currentPage);
    setLocations(chunk(allLocations, limit)[currentPage - 1]);
  };
  const renderTable = () => {
    return (<div>
      <div style={{ width: "100%" }}>
        <div style={{
          display: "flex", border: "1px #eee solid",
          padding: "10px",
          margin: "10px", fontWeight: "bold", backgroundColor: "#fff" }}>
          <div style={{ flex: 1 }}></div>
          <div style={{ flex: 5 }}>Location Name</div>
          <div style={{ flex: 8 }}>Address</div>
          <div style={{ flex: 3 }}>Phone No</div>
          <div style={{ flex: 2 }}></div>
        </div>
        <div style={{ width: "100%" }}>
          {locations.map((el, i) => (
            <div key={el.id} style={{
              display: "flex", border: "1px #eee solid",
              padding: "10px",
              margin: "10px", backgroundColor: "#fff" }}>
              <div style={{ flex: 1 }}>{(i + 1)}</div>
              <div style={{ flex: 5 }}>{el.locationName}</div>
              <div style={{ flex: 8 }}>{el.addressLine1}</div>
              <div style={{ flex: 3 }}>{el.phoneNumber}</div>
              <div style={{ flex: 2, display: "flex", justifyContent: "space-around" }}>
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
  return <div style={{ flex: 1 }}>
    {showTable ? renderTable() : renderAddLocation()}
  </div>;
}

export default LocationList;