import React, { createContext, useState } from "react";
import { Employee } from "../../services/EmployeeService";

export interface EmployeeCtx {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => any;
}
export const EmployeeContext = createContext<EmployeeCtx>({
  employees: [],
  setEmployees: () => true,
});

function EmployeeContextProvider({ children }: { children: React.ReactNode }) {
  //console.log('in context provider')

  const [employees, setEmployees] = useState<Employee[]>([
    // {
    //   id: 1,
    //   firstName: "Mariya",
    //   lastName: "Mariya",
    //   email: "Mariya",
    //   type: "Mariya",
    // },
  ]);

  //   const employeeContext: EmployeeCtx = {
  //     employees: [],
  //     setEmployees,
  // };
  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export default EmployeeContextProvider;
