import { useContext } from "react";
import { deleteEmployee } from "../../services/EmployeeService";
import styles from "./Button.module.scss"
import { EmployeeContext } from "../../contexts/EmployeeContextProvider/EmployeeContextProvider";

export interface ButtonProps{
  //style? : StyleAttribute;
  className? : string;
  buttonLabel: string;
  employeeId: number;
}

function Button({className, buttonLabel, employeeId} : ButtonProps) {

  const {employees , setEmployees } = useContext(EmployeeContext)

  const onButtonClick = () => {
    //console.log('receieved', e.target.id)
    console.log("Employees array: ",employees)
    const employeeData = employees;
    deleteEmployee(employeeId).then((response)=> {
      if(response === true) {
        console.log('response is true')
        const afterDeletingEmployee = employeeData.filter((employee)=> {
          console.log('employee id is ',typeof employee.id)
          console.log('recieved employee id is ',typeof employeeId)
          return employee.id !== employeeId
        })
        setEmployees(afterDeletingEmployee);
        console.log('employees after deleting ',employees)
      }
      else console.log('could not delete')
      
    })

  }
  
  return (
    <button className={`${styles.button} ${className??''} `}  onClick={onButtonClick}>{buttonLabel}</button>
  )
}

export default Button
