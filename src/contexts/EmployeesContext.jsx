import React, { createContext, useState } from "react";

// Créer un contexte
const EmployeesContext = createContext();

// Créer un context provider
const EmployeesContextProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  return (
    <EmployeesContext.Provider value={{ employees, addEmployee }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export { EmployeesContext, EmployeesContextProvider };
