import React from "react";
import PropTypes from "prop-types";

import "./Pagination.css";

export default function Pagination({
  page,
  setPage,
  totalDishes,
  pageNumbers,
}) {
  const PAGE_SIZE = 20;
  return (
    <div className="pagination-root">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage(Math.max(page - 1, 1))}>
              Previous
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={
                page === number + 1 ? "page-item active" : "page-item"
              }>
              <button onClick={() => setPage(number + 1)} className="page-link">
                {number + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => {
                setPage(Math.min(page + 1, Math.ceil(totalDishes / PAGE_SIZE)));
              }}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  totalDishes: PropTypes.number.isRequired,
  pageNumbers: PropTypes.array.isRequired,
};
