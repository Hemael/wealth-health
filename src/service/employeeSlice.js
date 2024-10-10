import { createSlice } from '@reduxjs/toolkit';
import employeeData from '../data/employees.json';

// Charger les employés depuis localStorage si disponibles, sinon utiliser les données JSON
const loadEmployeesFromStorage = () => {
  const savedEmployees = localStorage.getItem('employees');
  return savedEmployees ? JSON.parse(savedEmployees) : employeeData;
};

// Initialiser l'état avec les employés du localStorage ou du fichier JSON
const initialState = {
  list: loadEmployeesFromStorage(),
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
      // Sauvegarder les employés dans localStorage à chaque ajout
      localStorage.setItem('employees', JSON.stringify(state.list));
    },
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
