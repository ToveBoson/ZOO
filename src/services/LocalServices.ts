export const saveToLs = <T>(animalData: T): void => {
  localStorage.setItem("saveData", JSON.stringify(animalData));
};

export const getFromLs = <T>(): T[] => {
  let listFromLs = localStorage.getItem("saveData") || "[]";
  return JSON.parse(listFromLs);
};
