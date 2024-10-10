import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import de Link
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import states from '../data/states.json';
import SelectInput from '../components/SelectInput';
import wealth from '../img/wealth.png';
import { addEmployee } from '../service/employeeSlice';

Modal.setAppElement('#root');

const HRnet = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [department, setDepartment] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch(); // Hook pour dispatcher les actions
  const employees = useSelector((state) => state.employees.list); // Récupère la liste des employés depuis le store

  const departments = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Legal', label: 'Legal' },
  ];

  const stateOptions = states.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  const saveEmployee = (e) => {
    e.preventDefault();

    // Validation
    if (
      !firstName || !lastName || !dateOfBirth || !startDate || !street || !city || !state || !zipCode || !department
    ) {
      setErrorMessage('All fields are required.');
      return;
    }

    const newEmployee = {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      address: {
        street,
        city,
        state,
        zipCode,
      },
      department,
    };

    // Utilise dispatch pour ajouter un employé au store Redux
    dispatch(addEmployee(newEmployee));

    setModalIsOpen(true);
    setErrorMessage(''); // Réinitialise le message d'erreur
  };

  return (
    <div className="container">
      <div className="title">
        <img src={wealth} alt="HRnet" />
        {/* Utilisation de Link pour naviguer vers la liste des employés */}
        <Link to="/employee-list">View Current Employees</Link>
      </div>
      <div className="containerA">
        <h1>HRnet</h1>
        <h2 className='create'>Create Employee</h2>

        <form id="create-employee" onSubmit={saveEmployee}>
          <div className='containerB'>
            <div className="basic">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <label htmlFor="date-of-birth">Date of Birth</label>
              <DatePicker
                id="date-of-birth"
                selected={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                dateFormat="MM/dd/yyyy"
              />

              <label htmlFor="start-date">Start Date</label>
              <DatePicker
                id="start-date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/dd/yyyy"
              />
            </div>

            <fieldset className="address">
              <legend>Address</legend>

              <label htmlFor="street">Street</label>
              <input
                id="street"
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />

              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <SelectInput
                label="State"
                id="state"
                options={stateOptions}
                value={state}
                onChange={setState}
              />

              <label htmlFor="zip-code">Zip Code</label>
              <input
                id="zip-code"
                type="number"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </fieldset>
          </div>

          <div className='depSub'>
            <SelectInput
              label="Department"
              id="department"
              options={departments}
              value={department}
              onChange={setDepartment}
            />

            <button type="submit">Save</button>
          </div>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Employee Created"
        >
          <h2>Employee Created!</h2>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </Modal>
      </div>
    </div>
  );
};

export default HRnet;
