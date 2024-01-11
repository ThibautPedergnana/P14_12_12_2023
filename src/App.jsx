import "./App.css";

import React, { useState } from "react";
import CreateEmployee from "./pages/create-employee/CreateEmployee";
import ListEmployees from "./pages/list-employees/ListEmployees";
import { EmployeesContextProvider } from "./contexts/EmployeesContext";

function App() {
  const [page, setPage] = useState("create");

  return (
    <EmployeesContextProvider>
      <div className="App">
        {page === "create" ? (
          <CreateEmployee setPage={setPage} />
        ) : (
          <ListEmployees setPage={setPage} />
        )}
      </div>
    </EmployeesContextProvider>
  );
}

export default App;
