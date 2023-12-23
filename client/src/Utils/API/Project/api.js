//Get, Put, Post Project Data
export const getProject = () => {
  return fetch("/api/project", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createProject = (projectData) => {
  return fetch(`/api/project/${projectData}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
};

export const saveProject = (projectData) => {
  return fetch("/api/project", {
    method: "POST",
    headers: {
      "Content-Type": "project/json",
    },
    body: JSON.stringify(projectData),
  });
};

export const removeProject = (projectData) => {
  return fetch("/api/project", {
    method: "DELETE",
    headers: {
      "Content-Type": "project/json",
    },
  });
};
