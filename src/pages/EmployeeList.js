import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import employeeColumnNameAndProp from '../data/employeeColumnNameAndProp.json'
import DataTable from '../components/DataTable';



const EmployeeList = () => {
  // Récupère la liste des employés depuis le store Redux
  const employees = useSelector((state) => state.employees.list);

  // État pour la barre de recherche
  const [search, setSearch] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

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
      />

      <DataTable
    data={filteredEmployees}
    columnNameAndProp={employeeColumnNameAndProp}
      />
      <a href="/">Home</a>
    </div>
  );
};

export default EmployeeList;
