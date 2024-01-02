import { Employee } from "../../services/EmployeeService";
import Button from "../Button/Button";
import styles from "./EmployeeCard.module.scss";

interface EmployeeCardProps {
  employee: Employee;
}

function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className={styles.card}>
      <h3>
        {employee.firstName} {employee.lastName}
      </h3>
      <p>{employee.email}</p>
      <p>{employee.type}</p>
      <div className={styles.card__buttons}>
        <Button buttonLabel="Expand" employeeId={employee.id} />
        <Button buttonLabel="Edit" employeeId={employee.id} />
        <Button
          className={styles.card__buttons__delete}
          buttonLabel="Delete"
          employeeId={employee.id}
        />
      </div>
    </div>
  );
}

export default EmployeeCard;
