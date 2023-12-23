//Get, Put, Post Technician Data
export const getHomepage = () => {
  return fetch("/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createHomepage = () => {
  return fetch(`/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
};

export const saveHomepage = () => {
  return fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
};
