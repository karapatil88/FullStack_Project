const API_URL = `${import.meta.env.VITE_API_URL}Employee`;

const EXT_MIME = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
};

// The API returns the photo as base64 (employee.photoBase64) alongside the
// original filename (employee.photo), which we only use to guess the MIME type.
export const getPhotoUrl = (employee) => {
    if (!employee?.photoBase64) return null;
    const ext = employee.photo?.split(".").pop()?.toLowerCase();
    const mime = EXT_MIME[ext] || "application/octet-stream";
    return `data:${mime};base64,${employee.photoBase64}`;
};


export const getAllEmployess=async () => {
    const response=await fetch(API_URL);
    if(response.ok){
        return response.json();
    } else {
        throw new Error("Failed to fetch employees");
    }
}

export const getEmployeeById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if(response.ok){
        return response.json();
    } else {
        throw new Error("Failed to fetch employee");
    }
}

export const deleteEmployeeById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if(response.ok){
        return response.json();
    } else {
        throw new Error("Failed to delete employee");
    }
}

export const updateEmployeeById = async (id, employee) => {
  const formData = new FormData();
  formData.append("Name", employee.name);
  formData.append("Email", employee.email);
  formData.append("Position", employee.position);
  formData.append("Salary", employee.salary);
  formData.append("Photo", employee.photo);

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    // No Content-Type header here: the browser sets
    // "multipart/form-data; boundary=..." itself, and setting it
    // manually breaks the boundary the backend needs to parse this.
    body: formData,
  });
  if(response.ok){
      return response.json();
  } else {
      throw new Error("Failed to update employee");
  }
}

export const createEmployee = async (employee) => {
  const formData = new FormData();
  formData.append("Name", employee.name);
  formData.append("Email", employee.email);
  formData.append("Position", employee.position);
  formData.append("Salary", employee.salary);
  formData.append("Photo", employee.photo);

  // No Content-Type header here: the browser sets
  // "multipart/form-data; boundary=..." itself, and setting it
  // manually breaks the boundary the backend needs to parse this.
  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to create employee");
  }
};