import React, { useContext } from "react";
import "./ListEmployees.css";
import { EmployeesContext } from "../../contexts/EmployeesContext";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useSort } from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";

const COLUMNS = [
  "Firstname",
  "Lastname",
  "Birthdate",
  "Startdate",
  "Street",
  "City",
  "State",
  "ZipCode",
  "Department",
];

export default function ListEmployees({ setPage }) {
  const { employees } = useContext(EmployeesContext);
  const [search, setSearch] = React.useState("");
  const [nbPerPage, setNbPerPage] = React.useState(1);

  const seeders = [
    {
      firstname: "Thibaut",
      lastname: "Pedergnana",
      birthdate: "14/12/2005",
      startdate: "05/12/2023",
      street: "20 Rue de Breuil le Vert",
      city: "Rantigny",
      state: "Indiana",
      zipcode: "60290",
      department: "Sales",
    },
    {
      firstname: "Test",
      lastname: "Test",
      birthdate: "09/04/1986",
      startdate: "18/05/2022",
      street: "33 rue blabla ",
      city: "Liancourt",
      state: "Virgin Islands",
      zipcode: "60700",
      department: "Legal",
    },
    {
      firstname: "Pouet",
      lastname: "Pouet",
      birthdate: "18/04/1994",
      startdate: "13/03/2013",
      street: "30 rue des pouet",
      city: "Cauffry",
      state: "Oklahoma",
      zipcode: "60500",
      department: "Engineering",
    },
  ];
  let data = { nodes: seeders };
  const theme = useTheme(getTheme());

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: nbPerPage,
    },
  });

  const tableColumns = COLUMNS.map((column) => {
    return {
      label: column,
      renderCell: (item) => item[column.toLowerCase()],
      sort: { sortKey: column.toUpperCase() },
    };
  });

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  data = {
    nodes: data.nodes.filter(
      (item) =>
        item.firstname.toLowerCase().includes(search?.toLowerCase()) ||
        item.lastname.toLowerCase().includes(search?.toLowerCase()) ||
        item.birthdate.toLowerCase().includes(search?.toLowerCase()) ||
        item.startdate.toLowerCase().includes(search?.toLowerCase()) ||
        item.street.toLowerCase().includes(search?.toLowerCase()) ||
        item.city.toLowerCase().includes(search?.toLowerCase()) ||
        item.state.toLowerCase().includes(search?.toLowerCase()) ||
        item.zipcode.toLowerCase().includes(search?.toLowerCase()) ||
        item.department.toLowerCase().includes(search?.toLowerCase())
    ),
  };

  const sort = useSort(
    data,
    {},
    {
      sortFns: {
        FIRSTNAME: (array) => sortString(array, "firstname"),
        LASTNAME: (array) => sortString(array, "lastname"),
        BIRTHDATE: (array) => sortDate(array, "birthdate"),
        STARTDATE: (array) => sortDate(array, "startdate"),
        STREET: (array) => sortString(array, "street"),
        CITY: (array) => sortString(array, "city"),
        STATE: (array) => sortString(array, "state"),
        ZIPCODE: (array) => sortString(array, "zipcode"),
        DEPARTMENT: (array) => sortString(array, "department"),
      },
    }
  );

  function sortString(array, key) {
    return array.sort((a, b) =>
      a[key].toLowerCase().localeCompare(b[key].toLowerCase())
    );
  }

  function convertStringToDate(dateString) {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
  }

  function sortDate(array, key) {
    return array.sort(
      (a, b) => convertStringToDate(a[key]) - convertStringToDate(b[key])
    );
  }

  return (
    <div className="list-employees">
      <div className="header">
        <h1>Current Employees</h1>
        <span className="link-list" onClick={() => setPage("create")}>
          Home
        </span>
      </div>
      <div className="header-options">
        <div className="select-section">
          <span>Show</span>
          <select
            name="state"
            id="state"
            value={nbPerPage}
            onChange={(event) => setNbPerPage(event.target.value)}
          >
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
          <span>entries</span>
        </div>
        <label htmlFor="search">
          Search :&nbsp;
          <input
            id="search"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </label>
      </div>
      <CompactTable
        columns={tableColumns}
        data={data}
        theme={theme}
        sort={sort}
        pagination={pagination}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

        <span>
          Page:{" "}
          {pagination.state.getPages(data.nodes).map((_, index) => (
            <button
              key={index}
              type="button"
              style={{
                fontWeight: pagination.state.page === index ? "bold" : "normal",
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </span>
      </div>
    </div>
  );
}
