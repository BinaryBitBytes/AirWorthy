//Get, Put, Post Inspector Data
export const getInspector = () => {
  return fetch("/api/inspector", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createInspector = (inspectorData) => {
  return fetch(`/api/inspector/${inspectorData}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inspectorData),
  });
};

export const saveInspector = (inspectorData) => {
  return fetch("/api/inspector", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inspectorData),
  });
};

export const removeInspector = (inspectorData) => {
  return fetch("/api/inspector", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inspectorData),
  });
};
