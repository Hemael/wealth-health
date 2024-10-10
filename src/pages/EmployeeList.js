import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';


const EmployeeList = () => {
  // Récupère la liste des employés depuis le store Redux
  const employees = useSelector((state) => state.employees.list);

  // État pour la barre de recherche
  const [search, setSearch] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  // Fonction de tri pour les dates
  const dateSortFunction = (rowA, rowB, field) => {
    const dateA = new Date(rowA[field]);
    const dateB = new Date(rowB[field]);

    return dateA - dateB; // Trie par année, mois, jour
  };

  // Définition des colonnes du tableau
  const columns = [
    { name: 'First Name', selector: (row) => row.firstName, sortable: true },
    { name: 'Last Name', selector: (row) => row.lastName, sortable: true },
    {
      name: 'Start Date',
      selector: (row) => new Date(row.startDate).toLocaleDateString(),
      sortable: true,
      sortFunction: (rowA, rowB) => dateSortFunction(rowA, rowB, 'startDate') // Fonction de tri personnalisée
    },
    { name: 'Department', selector: (row) => row.department, sortable: true },
    {
      name: 'Date of Birth',
      selector: (row) => new Date(row.dateOfBirth).toLocaleDateString(),
      sortable: true,
      sortFunction: (rowA, rowB) => dateSortFunction(rowA, rowB, 'dateOfBirth') // Fonction de tri personnalisée
    },
    { name: 'Street', selector: (row) => row.address.street, sortable: true },
    { name: 'City', selector: (row) => row.address.city, sortable: true },
    { name: 'State', selector: (row) => row.address.state, sortable: true },
    { name: 'Zip Code', selector: (row) => row.address.zipCode, sortable: true }
  ];

  // Utilise useEffect pour filtrer les employés lorsque la valeur de search change
  useEffect(() => {
    const filteredData = employees.filter((employee) =>
      Object.values(employee)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredEmployees(filteredData);
  }, [search, employees]);

  return (
    <div className="container">
      <h1>Current Employees</h1>
      
      {/* Barre de recherche */}
      <input
        type="text"
        className='search'
        placeholder="Search Employees"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      <DataTable
        columns={columns}
        data={filteredEmployees}
        pagination
        highlightOnHover
        pointerOnHover
      />



      <a href="/">Home</a>
    </div>
  );
};

export default EmployeeList;
