import { getAllEmployess, deleteEmployeeById, getPhotoUrl } from "../Service/Employeeservice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Arrow function based component for Employee Details
const EmployeeDetails=()=>{

    const [employeeData,setEmployeeData]=useState([]);
    const navigate = useNavigate();


    const fetchEmployeeData = async () => {
        try {
            const data = await getAllEmployess();
            setEmployeeData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEmployeeData();
    }, []);

    const addNew = () => {
        navigate(`/createEmployee`);
    };
    const onEdit = (id) => {
        navigate(`/editEmployee/${id}`);
    };
    const onDelete = async (id) => {
        try {
            await deleteEmployeeById(id);
            fetchEmployeeData(); // Refresh the employee list after deletion
        } catch (error) {
            console.error(error);
        }
    };
    return(
        <>
        <div className="p-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Employee Details</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={addNew}>Add New Employee</button>
            </div>

            <table className="min-w-full bg-white border border-gray-300 text-center">
                <thead>
                    <tr className="border-b border-gray-300">
                        <th className="py-2">#</th>
                        <th className="py-2">Name</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Position</th>
                        <th className="py-2">Salary</th>
                        <th className="py-2">Photo</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeData.map((employee,index) => (
                        <tr key={employee.id} className="border-b border-gray-300">
                            <td className="py-2">{index + 1}</td>
                            <td className="py-2">{employee.name}</td>
                            <td className="py-2">{employee.email}</td>
                            <td className="py-2">{employee.position}</td>
                            <td className="py-2">{employee.salary}</td>
                            <td className="py-2">
                                <img src={getPhotoUrl(employee)} className="w-16 h-16 object-cover mx-auto" />
                            </td>
                            <td className="py-2">
                                <button className="text-blue-500 hover:underline" onClick={()=>onEdit(employee.id)}>Edit</button>
                                <button className="text-red-500 hover:underline ml-2" onClick={()=>onDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}
export default EmployeeDetails;

// function expression based component for Employee Details

// export function EmployeeDetails111(){
//     return(
//         <>
//         <div className="p-8">
//             <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
//         </div>
//         </>
//     )
// }
