import { useForm } from "react-hook-form";
import styles from "./AddEmployeeForm.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Employee, addEmployee } from "../../services/EmployeeService";
import Button from "../../components/Button/Button";

function AddEmployeeForm() {
  const [newEmployee, setNewEmployee] = useState<Employee | null>(null);

  const schema = yup.object({
    firstName: yup.string().required("Please enter a first name"),
    lastName: yup.string().required("Please enter a last name"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email address"),

    type: yup.string().required("Employment type is required"),
  });

  const {
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: Employee) => {
    setNewEmployee(data);
  };

  useEffect(() => {
    if (!addEmployee || isSubmitSuccessful == false) return;
    addEmployee(newEmployee).then((response) =>
      console.log(" after adding ", response)
    );
    reset();
    console.log("issubmitsuccessful ", isSubmitSuccessful);
  }, [isSubmitSuccessful]);

  return (
    <div className={styles.container}>
      <h2>Add new Employee</h2>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <input
            className={styles.input}
            type="text"
            id="firstName"
            {...register("firstName")}
          />
        </div>
        <div>{errors.firstName && <p>{errors.firstName.message}</p>}</div>

        <div className={styles.field}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            className={styles.input}
            type="text"
            id="lastName"
            {...register("lastName")}
          />
        </div>
        <div>{errors.lastName && <p>{errors.lastName.message}</p>}</div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            className={styles.input}
            type="text"
            id="email"
            {...register("email")}
          />
        </div>
        <div>{errors.email && <p>{errors.email.message}</p>}</div>

        <div className={styles.field}>
          <p className={styles.label}>Employment type</p>
          <div className={styles.input}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "1rem",
              }}
            >
              <input
                type="radio"
                id="permanent"
                value="PERMANENT"
                {...register("type")}
              />
              <label htmlFor="permanent">Permanent</label>
              <input
                type="radio"
                id="contract"
                value="CONTRACT"
                {...register("type")}
              />
              <label htmlFor="contract">Contract</label>
            </div>
          </div>
        </div>
        <div>{errors.type && <p>{errors.type.message}</p>}</div>

        <div>
          <Button buttonLabel="Save" />
        </div>
      </form>
      {newEmployee && (
        <p>
          Employee was added successfully.{" "}
          <a href="/">See the list of Employees</a>
        </p>
      )}
    </div>
  );
}

export default AddEmployeeForm;
