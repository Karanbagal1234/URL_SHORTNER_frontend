export const setLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));

};
export const getLocal = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
export const removeLocal = (key) => {
  localStorage.removeItem(key);
};
 

export const tokenExist = (key) => {
  return localStorage.getItem(key) !== null;
};
