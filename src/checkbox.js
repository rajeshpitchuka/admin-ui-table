import React from "react";

const Checkbox = ({ id, type, name, handleClick, selectedUsered }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      onChange={handleClick}
      checked={selectedUsered}
    />
  );
};

export default Checkbox;
