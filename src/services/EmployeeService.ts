export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
}
export const getEmployees = async(): Promise<Employee[]> => {
  const response = await fetch("http://localhost:8080/employees");
  const data = await response.json();
  console.log("all employees data is "+data);
  return data;

}

export const getEmployeeById = async(employeeId: string): Promise<Employee> => {
  const response = await fetch(`http://localhost:8080/employees/${employeeId}`);
  const data = await response.json()
  // console.log("employee data: ",data)
  return data;

}

export const addEmployee = async(data:unknown):Promise<unknown> => {

  const response = await fetch("http://localhost:8080/employees", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); 

}

export const deleteEmployee = async(id:number):Promise<unknown> => {
  const response = await fetch(`http://localhost:8080/employees/${id}`, {
    method: "DELETE",
  });
  console.log('response is ',response.ok)
  return response.ok; 
}

export const editEmployee = async(data:Employee):Promise<Employee> => {
  console.log("****data receieved in services "+data.type)

  const response = await fetch(`http://localhost:8080/employees/${data.id}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
  });
  const dataReceieved = await response.json();
  console.log("## response from server "+dataReceieved.type)
  return dataReceieved; 

}