import { useNavigate } from "react-router-dom"
import styles from "./AddEmployeeButton.module.scss"
function AddEmployeeButton() {

  const navigator = useNavigate();
  const onClickHandler = () => {
    navigator("/add-employee")

  }
  return (
    
    <div>
      <button className={styles.addButton}onClick={onClickHandler}>Click to add new Employee</button>
    </div>
  )
}

export default AddEmployeeButton
