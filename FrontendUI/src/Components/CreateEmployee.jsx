import { useState } from "react";
import { createEmployee } from "../Service/Employeeservice";
import { useNavigate } from "react-router-dom";

const CreateEmployee=()=>{

const navigate = useNavigate();
const onCreate = async (e) => {
    e.preventDefault();
    if (!employeePhoto) {
        alert("Please select a photo");
        return;
    }
    try {
        await createEmployee({
            name: employeeeName,
            email: employeeEmail,
            position: employeePosition,
            salary: employeeSalary,
            photo: employeePhoto
        });
        alert("Employee created successfully");
        navigate("/");
    } catch (error) {
        console.error(error);
    }
}


    const [employeeeName, setEmployeeeName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeePosition, setEmployeePosition] = useState('');
    const [employeeSalary, setEmployeeSalary] = useState(0);
    const [employeePhoto, setEmployeePhoto] = useState(null);
  
    return(
        <>
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Create Employee</h2>

        </div>
            <form className="space-y-4" onSubmit={onCreate}>
                <label className="block text-gray-700">Employee Name</label>
              <input
                type="text"
                placeholder="Employee Name"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={employeeeName}
                onChange={(e) => setEmployeeeName(e.target.value)}
              />
              <label className="block text-gray-700">Employee Email</label>
              <input
                type="email"
                placeholder="Employee Email"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
              />
              <label className="block text-gray-700">Employee Position</label>
              <input
                type="text"
                placeholder="Employee Position"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={employeePosition}
                onChange={(e) => setEmployeePosition(e.target.value)}
              />

              <label className="block text-gray-700">Employee Salary</label>
                <input
                type="number"
                placeholder="Employee Salary"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={employeeSalary}
                onChange={(e) => setEmployeeSalary(e.target.value)}
              />
              <label className="block text-gray-700">Employee Photo</label>
              <input
                type="file"
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={(e) => setEmployeePhoto(e.target.files[0])}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Create
              </button>
            </form>
        </>
    )
}
export default CreateEmployee;