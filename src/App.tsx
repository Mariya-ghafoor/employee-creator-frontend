import "./App.css";
import EmployeesList from "./components/EmployeesList/EmployeesList";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddEmployeeForm from "./pages/AddEmployeeForm/AddEmployeeForm";
import EmployeeContextProvider from "./contexts/EmployeeContextProvider/EmployeeContextProvider";
import EditEmployeeForm from "./pages/EditEmployeeForm/EditEmployeeForm";

function App() {
  return (
    <BrowserRouter>
      <EmployeeContextProvider>
        <Routes>
          {/* <Route path="/" element={<EmployeesList employees = {employees} />} /> */}
          <Route path="/" element={<EmployeesList />} />
          <Route path="/add-employee" element={<AddEmployeeForm />} />
          <Route path="/edit-employee/:id" element={<EditEmployeeForm />} />
        </Routes>
      </EmployeeContextProvider>
    </BrowserRouter>
  );
}

export default App;
