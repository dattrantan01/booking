import React from "react";
import "./styles.scss";

const CheckboxNoForm = () => {
  return (
    <>
      <label className="container">
        <input type="checkbox" className="" />
        <div className="checkmark"></div>
      </label>
    </>
  );
};

export default CheckboxNoForm;
