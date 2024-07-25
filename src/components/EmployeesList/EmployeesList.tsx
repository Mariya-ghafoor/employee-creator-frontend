import { useContext, useEffect } from "react";
import { getEmployees } from "../../services/EmployeeService";
import AddEmployeeButton from "../AddEmployeeButton/AddEmployeeButton";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import styles from "./EmployeesList.module.scss";
import { EmployeeContext } from "../../contexts/EmployeeContextProvider/EmployeeContextProvider";

function EmployeesList() {
  const { employees, setEmployees } = useContext(EmployeeContext);

  useEffect(() => {
    getEmployees()
      .then((data) => {
        console.log("data ", data);
        console.log("employees default ", employees);
        setEmployees(data);
        console.log("after setting ", employees);
      })
      .then(() => console.log(employees));
  }, []);

  useEffect(() => {}, [employees]);

  return (
    <div className={styles.main}>
      <h1>Employees List</h1>
      <AddEmployeeButton />
      {employees.length > 0 ? (
        <div className={styles.container}>
          {employees &&
            employees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
        </div>
      ) : (
        <div>
          Please wait for the data to load. As the database is hosted on a free
          tier it will take few minutes before being available. Thanks for your
          patience.
        </div>
      )}
    </div>
  );
}

export default EmployeesList;
