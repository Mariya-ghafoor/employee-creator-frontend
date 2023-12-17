/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import styles from "./EditEmployeeForm.module.scss"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { SetStateAction, useEffect, useState } from "react";
import { Employee, addEmployee, editEmployee, getEmployeeById } from "../../services/EmployeeService";
import Button from "../../components/Button/Button";
import { useParams } from "react-router-dom";
import { checked } from "glamor";

function EditEmployeeForm() {
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null)
  const [editedEmployee, setEditedEmployee] = useState<Employee | null>(null)
  const [radio, setRadio] = useState("PERMANENT")
  const param = useParams();
  // console.log("employeed id receieved ",param)

  interface defaultValuesProps{
    id? : number,
    firstName: string,
    lastName: string,
    email: string,
  }

  const schema = yup.object({
    firstName: yup
      .string()
      .required('Please enter a first name'),
    lastName: yup
      .string()
      .required('Please enter a last name'),
    email: yup
      .string()
      .required('Email is required')
      .email('Email must be a valid email address'),

    type: yup
      .string()
      .required('Employment type is required'),
        
  });

  const {register, reset, formState:{errors, isSubmitSuccessful }, handleSubmit } = useForm({ resolver: yupResolver(schema)})

  const onSubmit = (data : Employee ) => {
    console.log("on submit data received "+data.type)
    setEditedEmployee(data);
    
  }

  console.log("got the data. employee to edit is ",employeeToEdit)
  

  
// Load the employee information on component mount
  useEffect(()=>{
    console.log("going to get data")
    getEmployee();

  },[param.id])

  useEffect(()=>{
    if(employeeToEdit){
      const defaultValues : defaultValuesProps = {
        id : employeeToEdit.id,
        firstName: employeeToEdit.firstName,
        lastName: employeeToEdit.lastName,
        email: employeeToEdit.email,
      };
      
      reset({...defaultValues})
      setRadio(employeeToEdit.type)
    }
  },[employeeToEdit])


  useEffect(() => {
    // console.log("type of id is ",typeof param.id)
    if(editedEmployee){
      editEmployee(editedEmployee).then(response => 
        console.log("After editing employee ", response));
    }
    
  }, [isSubmitSuccessful]);

  const getEmployee = async() => {
    if(param.id === undefined) return;
    const response = await getEmployeeById(param.id);
    console.log("response receieved ",response)
    setEmployeeToEdit(response);
    
  }
  

  return (
    <div className={styles.container}>
      <h2>Edit information about the Employee</h2>
    
      {employeeToEdit && <form className={styles.form} onSubmit={handleSubmit (onSubmit)}>
        <div className={styles.field}>
          <label htmlFor= "firstName" className={styles.label}>First Name</label>
          <input className={styles.input} type="text" id="firstName" {...register('firstName')} />
          
        </div>
        <div>
          {errors.firstName && (
          <p>{errors.firstName.message}</p>
        )}</div>

        <div className={styles.field}>
          <label htmlFor= "lastName" className={styles.label}>Last Name</label>
          <input className={styles.input} type="text" id="lastName" {...register('lastName')}/>
        </div>
        <div>
        {errors.lastName && (
          <p>{errors.lastName.message}</p>
        )}
        </div>

        <div className={styles.field}>
          <label htmlFor= "email" className={styles.label}>Email</label>
          <input className={styles.input} type="text" id="email" {...register('email')} />
        </div>
        <div>
        {errors.email && (
          <p>{errors.email.message}</p>
        )}
        </div>

        <div className={styles.field}>
          <p className={styles.label}>Employment type</p>
          <div className={styles.input}>
            <div style={{display: 'flex',justifyContent: 'flex-start', gap: '1rem'}}>
              
              <label htmlFor="contract"><input key="contract" type="radio" id="CONTRACT" {...register('type')} 
              value="CONTRACT"
              checked={radio==="CONTRACT"}  onChange={(e)=>setRadio(e.target.value)} /> Contract</label>

              
              <label htmlFor="permanent"><input key="permanent" type="radio" id="PERMANENT" {...register('type')} value="PERMANENT" checked={radio==="PERMANENT"}  onChange={(e)=>setRadio(e.target.value)} /> Permanent</label>
          </div>
          </div>
        </div>
        <div>
        {errors.type && (
          <p>{errors.type.message}</p>
        )}
        </div>

        <div>
          <Button buttonLabel = "Save"/>
        </div>

      </form>}

      {editedEmployee && <p>Employee was added successfully. <a href="/">See the list of Employees</a></p>}
    </div>
 
  )
}

export default EditEmployeeForm
