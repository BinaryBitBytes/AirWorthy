//Get, Put, Post Manager Data
export const getManager = () => {
  return fetch("/api/manager", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createManager = (managerData) => {
  return fetch(`/api/manager/${managerData}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(managerData),
  });
};

export const saveManager = (managerData) => {
  return fetch("/api/manager", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(managerData),
  });
};

export const removeManager = (managerData) => {
  return fetch("/api/manager", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(managerData),
  });
};
