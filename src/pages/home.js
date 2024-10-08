import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import states from '../data/states.json'; // Importez les états à partir du fichier JSON
import SelectInput from '../components/SelectInput'; // Importez le composant personnalisé
import wealth from '../img/wealth.png';


Modal.setAppElement('#root'); // Nécessaire pour les lecteurs d'écran

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

    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));

    console.log('Employee created:', newEmployee);
    setModalIsOpen(true);
  };

  return (
    <div className="container">
      <div className="title">
            <img src={wealth} alt="HRnet" />
            <a href="/employee-list">View Current Employees</a>
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
