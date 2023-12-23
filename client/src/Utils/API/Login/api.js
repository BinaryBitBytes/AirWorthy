export const getLoginForm = () => {
  return fetch("/api/login", {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createLoginForm = (authData) => {
  return fetch(`/api/techhician/${authData}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
};
