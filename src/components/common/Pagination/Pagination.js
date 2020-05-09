import React, { useEffect, useState } from "react";
import "./Pagination.css";
import { paginationPages } from "../../../config";
import Button from "../Button/Button";

function Pagination({ length, paginationUpdate }) {
  const [dropdown, setDropdown] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    paginationUpdate(dropdown, currentPage);
  }, []);
  useEffect(() => {
    paginationUpdate(dropdown, currentPage);
  }, [currentPage, dropdown]);
  useEffect(() => {
    paginationUpdate(5, 1);
    setDropdown(5);
    setCurrentPage(1);
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
        {paginationPages.map(el => (<option value={el.value}>{el.label}</option>))}
      </select>
    </div>
    <div className="buttonBox">
      <Button label="&lt;" customStyle={{ backgroundColor: "#fff", color: "#000", borderRadius: "30px" }} onClick={() => updatePage("DECREMENT")} disabled={currentPage === 1} />
        <span className="currentPage">{currentPage} of {lastPage}</span>
      <Button label="&gt;" customStyle={{ backgroundColor: "#fff", color: "#000", borderRadius: "30px" }} onClick={() => updatePage("INCREMENT")} disabled={currentPage === lastPage} />
    </div>
  </div>;
}

export default Pagination;