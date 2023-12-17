import { useContext } from "react";
import { deleteEmployee } from "../../services/EmployeeService";
import styles from "./Button.module.scss"
import { EmployeeContext } from "../../contexts/EmployeeContextProvider/EmployeeContextProvider";
import { useNavigate } from "react-router-dom";

export interface ButtonProps{
  className? : string;
  buttonLabel: string;
  employeeId?: number;
}

function Button({className, buttonLabel, employeeId} : ButtonProps) {

  const {employees , setEmployees } = useContext(EmployeeContext)
  const navigate = useNavigate();

  const onButtonClick = () => {
    switch (buttonLabel){
      case 'Delete':
        deleteEmployeeOnClick();
        break;
      
      case 'Edit':
        editEmployeeOnClick();
        break;
        
    }

  }

  const deleteEmployeeOnClick = async() => {
    const response = await deleteEmployee(employeeId);
    if (response===true){
      const afterDeletingEmployee = employees.filter((employee)=> {
        return employee.id !== employeeId
      })
      setEmployees(afterDeletingEmployee);
    }

    else console.log('could not delete')
  }

  const editEmployeeOnClick = () => {
    navigate(`/edit-employee/${employeeId}`)
  }

 
  
  return (
    <button className={`${styles.button} ${className??''} `}  onClick={onButtonClick}>{buttonLabel}</button>
  )
}

export default Button
