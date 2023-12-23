//Get, Put, Post Technician Data
export const getTechnician = () => {
  return fetch("/api/technician", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createTechnician = (technicianData) => {
  return fetch(`/api/technician/${technicianData}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(technicianData),
  });
};

export const saveTechnician = (technicianData) => {
  return fetch("/api/technician", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(technicianData),
  });
};

export const removeTechnician = (technicianData) => {
  return fetch("/api/technician", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(technicianData),
  });
};
