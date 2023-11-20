import { useContext, useEffect, useState } from 'react'
import './App.css'
import EmployeesList from './components/EmployeesList/EmployeesList'
import { Employee, getEmployees } from './services/EmployeeService'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddEmployeeForm from './pages/AddEmployeeForm/AddEmployeeForm'
import EmployeeContextProvider, { EmployeeContext } from './contexts/EmployeeContextProvider/EmployeeContextProvider'

function App() {

  return (
    <BrowserRouter>
    <EmployeeContextProvider>
    <Routes>
      {/* <Route path="/" element={<EmployeesList employees = {employees} />} /> */}
      <Route path="/" element={<EmployeesList />} />
      <Route path="/add-employee" element={<AddEmployeeForm />} />
    </Routes>
    </EmployeeContextProvider>
    </BrowserRouter>
     )
}

export default App
