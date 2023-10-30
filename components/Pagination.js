import React from "react";

const Pagination = ({ totalPages, page, pageChangeHandler }) => {
  // Create an array of page numbers from 1 to totalPages
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <nav aria-label="Page navigation">
        <ul className="inline-flex flex-wrap -space-x-px text-base h-10">
          <li>
            <div
              className="flex cursor-pointer items-center justify-center px-4 h-10 ml-0 leading-tight bg-blue-700 text-white border border-gray-300 rounded-l-lg hover:bg-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() =>page > 1 ? pageChangeHandler(page - 1) : console.log("can't go left")}
            >
              Previous
            </div>
          </li>

          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <div
                className={`flex cursor-pointer items-center justify-center px-4 h-10 leading-tight ${
                  pageNumber === page
                    ? "bg-blue-600 text-white"
                    : "bg-blue-700 text-gray-700 hover:bg-blue-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                } border border-gray-300`}
                onClick={() => pageChangeHandler(pageNumber)}
              >
                {pageNumber}
              </div>
            </li>
          ))}

          <li>
            <div
              className="cursor-pointer flex items-center justify-center px-4 h-10 mr-0 leading-tight bg-blue-700 text-white border border-gray-300 rounded-r-lg hover:bg-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() =>page < totalPages ? pageChangeHandler(page + 1) : console.log("can't go right")}
            >
              Next
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
