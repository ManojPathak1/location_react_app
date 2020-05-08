import React, { useEffect, useState } from "react";
import { tableData } from "../../mockData";
import { getLocations, deleteLocation } from "../../indexedDb";

function LocationList({ onEdit }) {
  const [locations, setLocations] = useState([]);
  const renderAddLocation = () => {
    return <h3>Kindly add location !</h3>;
  };
  useEffect(() => {
    getLocations().then(setLocations);
  }, []);
  const deleteLoc = id => {
    deleteLocation(id).then(res => {
      console.log(res);
      getLocations().then(setLocations);
    });
  };
  const onClickEdit = location => {
    onEdit(location);
  }
  const renderTable = () => {
    return (<table style={{ width: "100%" }}>
      <thead>
        <tr>
          <td></td>
          <td>Location Name</td>
          <td>Address</td>
          <td>Phone No</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {locations.map(el => (
          <tr key={el.id}>
            <td>1</td>
            <td>{el.locationName}</td>
            <td>{el.addressLine1}</td>
            <td>{el.phoneNumber}</td>
            <td><button onClick={() => onClickEdit(el)}>Edit</button><button onClick={() => deleteLoc(el.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>);
  };
  const showTable = locations.length > 0;
  return <div>
    {showTable ? renderTable() : renderAddLocation()}
  </div>;
}

export default LocationList;