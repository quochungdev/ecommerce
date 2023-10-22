import React, { useContext } from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationItems({
  array,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
        <Pagination size="md" className="mt-3">
          {Array.from({
            length: Math.ceil(array.length / itemsPerPage),
          }).map((_, index) => (
            <Pagination.Item
              className="w-7 text-center ml-2"
              linkClassName={
                index + 1 === currentPage ? "!bg-button_color" : ""
              }
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
    </>
  );
}
