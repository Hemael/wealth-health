import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice'; // Import du slice

export const store = configureStore({
  reducer: {
    employees: employeeReducer, // Ajout du reducer des employés
  },
});
