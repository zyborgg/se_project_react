export const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
};

export const addItem = ({ name, imageUrl, weather }, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

export const removeItem = (cardID, token) => {
  return fetch(`${baseUrl}/items/${cardID}`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const addCardLike = (cardID, token) => {
  return fetch(`${baseUrl}/items/${cardID}/likes`, {
    method: "PUT",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const removeCardLike = (cardID, token) => {
  return fetch(`${baseUrl}/items/${cardID}/likes`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};
