import React, { useEffect, useState } from "react";
import "./Pagination.css";

function Pagination({ length, paginationUpdate }) {
  const [dropdown, setDropdown] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    paginationUpdate(dropdown, currentPage);
  }, []);
  useEffect(() => {
    paginationUpdate(dropdown, currentPage);
  }, [currentPage, dropdown]);
  const setDropdownValue = (event) => {
    setDropdown(event.target.value);
    setCurrentPage(1);
  };
  const updatePage = type => {
    if (type === "INCREMENT") setCurrentPage(currentPage + 1);
    else setCurrentPage(currentPage - 1);
  }
  const lastPage = Math.ceil(length / dropdown);
  return <div className="paginationContainer">
    <div>
      <span className="itemsPerPage">Items per page</span>
      <select value={dropdown} onChange={setDropdownValue}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
    </div>
    <div>
      <span className="currentPage">{currentPage} of {lastPage}</span>
    </div>
    <div className="buttonBox">
      <button onClick={() => updatePage("DECREMENT")} disabled={currentPage === 1}>{"<"}</button>
      <button onClick={() => updatePage("INCREMENT")} disabled={currentPage === lastPage}>{">"}</button>
    </div>
  </div>;
}

export default Pagination;