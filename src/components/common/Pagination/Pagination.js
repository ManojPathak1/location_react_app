import React, { useEffect, useState } from "react";
import "./Pagination.css";
import { paginationPages } from "../../../config";

/**
 * Pagination component
 * @param {Number} length Number of data
 * @param {Function(Number, Number)} paginationUpdate Function callback for updating or filtering the data. 
 */
function Pagination({ length, paginationUpdate }) {
  const initialValue = paginationPages[0].value;
  const [dropdown, setDropdown] = useState(initialValue);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    paginationUpdate(dropdown, currentPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdown, currentPage]);
  useEffect(() => {
    paginationUpdate(initialValue, 1);
    setDropdown(initialValue);
    setCurrentPage(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);
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
        {paginationPages.map(el => (<option key={el.value} value={el.value}>{el.label}</option>))}
      </select>
    </div>
    <div className="buttonBox">
      <button onClick={() => updatePage("DECREMENT")} disabled={currentPage === 1}>
        <img alt="" src="./images/leftArrow.png" height="12px" />
      </button>
      <span className="currentPage">{currentPage} of {lastPage}</span>
      <button onClick={() => updatePage("INCREMENT")} disabled={currentPage === lastPage}>
        <img alt="" src="./images/rightArrow.png" height="12px" />
      </button>
    </div>
  </div>;
}

export default Pagination;