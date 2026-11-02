import { getEmployeeById,updateEmployeeById } from "../Service/Employeeservice";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployeeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [employeeeName, setEmployeeeName] = useState('');
    const [employeeeSalary, setEmployeeeSalary] = useState('');
    const [employeeePosition, setEmployeeePosition] = useState('');
    const [employeeeEmail, setEmployeeeEmail] = useState('');
    const [employeePhoto, setEmployeePhoto] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployeeById(id);
                // TODO: backend GET /api/Employee/{id} currently returns an array
                // ([{...}]) instead of a single object. Remove this once the
                // controller is fixed to return one record.
                const record = Array.isArray(data) ? data[0] : data;
                setEmployee(record);
                setEmployeeeName(record?.name ?? '');
                setEmployeeeSalary(record?.salary ?? '');
                setEmployeeePosition(record?.position ?? '');
                setEmployeeeEmail(record?.email ?? '');
            } catch (error) {
                console.error(error);
            }
        };
        fetchEmployees();
    }, [id]);

    const UpdateEmployee = async (id) => {
        try {
            await updateEmployeeById(id, {
                name: employeeeName,
                salary: employeeeSalary,
                position: employeeePosition,
                email: employeeeEmail,
                photo: employeePhoto
            });
            console.log("Employee updated successfully");
            alert("Employee updated successfully");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Edit Employee Details</h2>
            <ul>
                {employee && (
                    <div key={employee.id}>
                        <label className="block text-gray-700">Employee Name</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md p-2 w-full"
                            value={employeeeName}
                            onChange={(e) => setEmployeeeName(e.target.value)}
                        />
                        <label className="block text-gray-700">Employee Salary</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md p-2 w-full"
                            value={employeeeSalary}
                            onChange={(e) => setEmployeeeSalary(e.target.value)}
                        />
                        <label className="block text-gray-700">Employee Position</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md p-2 w-full"
                            value={employeeePosition}
                            onChange={(e) => setEmployeeePosition(e.target.value)}
                        />
                        <label className="block text-gray-700">Employee Email</label>
                        <input
                            type="email"
                            className="border border-gray-300 rounded-md p-2 w-full"
                            value={employeeeEmail}
                            onChange={(e) => setEmployeeeEmail(e.target.value)}
                        />
                        <label className="block text-gray-700">Employee Photo</label>
                        <input
                            type="file"
                            className="border border-gray-300 rounded-md p-2 w-full"
                            onChange={(e) => setEmployeePhoto(e.target.files[0])}
                        />                        
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
                            onClick={() => UpdateEmployee(employee.id)}
                        >
                            Update
                        </button>
                        <button
                            className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md ml-2"
                            onClick={() => console.log("Cancel update")}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default EditEmployeeDetails;