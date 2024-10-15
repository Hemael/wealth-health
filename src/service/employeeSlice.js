import { createSlice } from '@reduxjs/toolkit';
import employeeData from '../data/employees.json';



// Initialiser l'état avec les employés du localStorage ou du fichier JSON
const initialState = {
  list: employeeData
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
