import { useState } from 'react';

function DataTable({ data, columnNameAndProp }) {
  const [sortedData, setSortedData] = useState(data);
  const [sortOrder, setSortOrder] = useState(true); // true for ascending, false for descending
  const [activeColumn, setActiveColumn] = useState(null); // Track which column is being sorted
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items per page

  // Function to sort the data
  const handleSort = (prop) => {
    const sorted = [...sortedData].sort((a, b) => {
      if (a[prop] < b[prop]) return sortOrder ? -1 : 1;
      if (a[prop] > b[prop]) return sortOrder ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
    setSortOrder(!sortOrder); // Toggle sort order
    setActiveColumn(prop); // Set the active column to show the arrow
  };

  // Function to get the correct arrow based on the sort order
  const getSortArrow = (prop) => {
    if (activeColumn === prop) {
      return sortOrder ? ' ▲' : ' ▼';
    }
    return ''; // No arrow if the column is not being sorted
  };

  // Function to handle items per page change
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page change
  };

  // Pagination controls
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Get current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>

      <table>
        <thead>
          <tr>
            {columnNameAndProp.map((nameAndProp, index) => (
              <th key={index}>
                <button onClick={() => handleSort(nameAndProp[0])}>
                  {nameAndProp[1]}{getSortArrow(nameAndProp[0])}
                </button>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentData.map((employee, index) => (
            <tr key={index}>
              {columnNameAndProp.map((nameAndProp, index) => (
                <td key={index}>{employee[nameAndProp[0]]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className='pagi'>
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className='buttonNP'> Previous </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}  className='buttonNP'> Next </button>


        {/* Select number of items per page */}
        <label htmlFor="itemsPerPage">Show </label>
        <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="200">200</option>
        </select>
        <span> items per page</span>

      </div>



    </div>
  );
}

export default DataTable;
