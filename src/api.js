import {getMonth} from './utils/getMonth'
const baseUrl = "https://enigmatic-coast-64726.herokuapp.com/api/v1";

export const getCards = async () => {
  const res = await fetch(`${baseUrl}/cards`);
  if (!res) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const addCard = async (data) => {
  const res = await fetch(`${baseUrl}/cards`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res) {
    throw new Error("Network response was not ok");
  }
  return null;
};

export const getExpenses = async () => {
  const month = getMonth()
  const res = await fetch(`${baseUrl}/expenses/${month}`);
  if (!res) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const deleteExpense = async (id) => {
  const res = await fetch(`${baseUrl}/expenses/${id}`, { method: "DELETE" });
  if (!res) {
    throw new Error("Network response was not ok");
  }
  return null;
};

export const AddExpenses = async (data) => {
  const res = await fetch(`${baseUrl}/expenses/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const updateCard = async ({id, ...data}) => {
  const res = await fetch(`${baseUrl}/cards/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res) {
    throw new Error("Network response was not ok");
  }
  console.log(res.json())
}

export const deleteCard = async (id) => {
  const res = await fetch(`${baseUrl}/cards/${id}`, { method: "DELETE" });
  if (!res) {
    throw new Error("Network response was not ok");
  }
  return null;
};
