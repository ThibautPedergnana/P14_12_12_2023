import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerCustom({ startDate, setStartDate }) {
  return (
    <DatePicker
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );
}
