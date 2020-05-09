import React, { useEffect, useState } from "react";

function Pagination({ length, paginationUpdate }) {
  const [dropdown, setDropdown] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    console.log("Update");
    paginationUpdate(dropdown, currentPage);
  }, []);
  useEffect(() => {
    paginationUpdate(dropdown, currentPage);
  }, [currentPage, dropdown]);
  const setDropdownValue = (event) => {
    console.log(event.target.value);
    setDropdown(event.target.value);
    setCurrentPage(1);
  };
  const updatePage = type => {
    if (type === "INCREMENT") setCurrentPage(currentPage + 1);
    else setCurrentPage(currentPage - 1);
  }
  const lastPage = Math.ceil(length / dropdown);
  return <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", color: "#777" }}>
    <div>
      <span style={{ marginRight: "10px", fontSize: "12px" }}>Items per page</span>
      <select value={dropdown} onChange={setDropdownValue}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
    </div>
    <div>
      <span style={{ margin: "0 10px", fontSize: "12px" }}>{currentPage} of {lastPage}</span>
    </div>
    <div style={{ width: "80px", display: "flex", justifyContent: "space-around" }}>
      <button onClick={() => updatePage("DECREMENT")} disabled={currentPage === 1}>{"<"}</button>
      <button onClick={() => updatePage("INCREMENT")} disabled={currentPage === lastPage}>{">"}</button>
    </div>
  </div>;
}

export default Pagination;