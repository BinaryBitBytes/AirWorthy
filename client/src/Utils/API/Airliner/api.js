//Get, Put, Post Airliner Data
export const getAirliner = () => {
  return fetch("/api/airliner", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createAirliner = (airlinerData) => {
  return fetch(`/api/airliner/${airlinerData}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(airlinerData),
  });
};

export const saveAirliner = (airlinerData) => {
  return fetch("/api/airliner", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(airlinerData),
  });
};

export const removeAirliner = (airlinerData) => {
  return fetch("/api/airliner", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(airlinerData),
  });
};
