import React from "react";

const Checkbox = ({ id, name, type, handleClick, isChecked }) => {
  return (
    <input id={id} name={name} type={type} onChange={handleClick} checked={isChecked} />
  );
};

export default Checkbox;
