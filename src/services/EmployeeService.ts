export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
}
export const getEmployees = async(): Promise<Employee[]> => {
  const response = await fetch("http://localhost:8080/employees");
  const data = await response.json();
  //console.log("data is "+data);
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
  return response.json(); // parses JSON response into native JavaScript objects

}

export const deleteEmployee = async(id:number):Promise<unknown> => {
  const response = await fetch(`http://localhost:8080/employees/${id}`, {
    method: "DELETE",
  });
  console.log('response is ',response.ok)
  return response.ok; 
}