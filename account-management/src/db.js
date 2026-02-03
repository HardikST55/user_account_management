let data = JSON.parse(localStorage.getItem("user")) || [];

function saveToLocalStorage() {
  localStorage.setItem("user", JSON.stringify(data));
}

export function addUser(newUser) {
  data.push({ id: data.length + 1, ...newUser });
  saveToLocalStorage();
}

export function updateUser(id, updatedData) {
  const index = data.findIndex(u => u.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedData };
    saveToLocalStorage();
  }
}

export function findUser(email, password) {
  return data.find(u => u.email === email && u.password === password);
}



export function getData() {
  return data;
}