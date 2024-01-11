import React, { useContext, useState } from "react";
import { departments, states } from "../datas/create-form-datas";
import { EmployeesContext } from "../../contexts/EmployeesContext";
import "./CreateEmployee.css";
import DatePickerCustom from "../../components/date-picker/DatePicker";
import Modal from "modal-plugin-tp";

export default function CreateEmployee({ setPage }) {
  const { addEmployee } = useContext(EmployeesContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [startDate, setStartDate] = useState();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [department, setDepartment] = useState("");
  const [isOpenModal, setIsOpenModal] = useState();

  const handleSubmit = () => {
    const datas = {
      firstname,
      lastname,
      birthdate: birthdate ? birthdate.toLocaleDateString() : "",
      startdate: startDate ? startDate.toLocaleDateString() : "",
      street,
      city,
      state,
      zipcode: zipCode,
      department,
    };
    addEmployee(datas);
    setIsOpenModal(true);
  };
  return (
    <div className="create-employee">
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <span className="link-list" onClick={() => setPage("list")}>
          View Current Employees
        </span>
        <h2>Create Employee</h2>
        <form action="#" id="create-employee">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <label htmlFor="date-of-birth">Date of Birth</label>
          <DatePickerCustom startDate={birthdate} setStartDate={setBirthdate} />

          <label htmlFor="start-date">Start Date</label>
          <DatePickerCustom startDate={startDate} setStartDate={setStartDate} />
          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />

            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <label htmlFor="state">State</label>
            <select
              name="state"
              id="state"
              value={state}
              onChange={(event) => setState(event.target.value)}
            >
              <option value="none">Please select a state</option>
              {states.map((state) => (
                <option key={state.abbreviation} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>

            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zip-code"
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </fieldset>
          <label htmlFor="department">Department</label>
          <select
            name="department"
            id="department"
            onChange={(event) => setDepartment(event.target.value)}
            value={department}
          >
            <option value="none">Please select a department</option>
            {departments.map((department) => (
              <option key={department}>{department}</option>
            ))}
          </select>
        </form>

        <button onClick={handleSubmit}>Save</button>
      </div>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <div className="success-create">
            Employee has been created successfully !
          </div>
        </Modal>
      )}
    </div>
  );
}
