const storeKey = (key, value) => {
  localStorage.setItem(key, value);
};

const removeKey = (key) => {
  localStorage.removeItem(key);
};
const getKey = (key) => {
  return localStorage.getItem(key);
};

export { storeKey, removeKey, getKey };
