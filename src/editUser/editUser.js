import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./editUser.css";

function EditUSer({ userId, tableData, setTableData }) {
  const selectedUSer = tableData.find((user) => user.id === userId);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState({
    name: selectedUSer.name,
    email: selectedUSer.email,
    role: selectedUSer.role,
  });
  const { name, email, role } = editUser;
  const modalOpen = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    const newList = tableData.map((item) => {
      if (item.id === userId) {
        return { ...item, ...editUser };
      }
      return item;
    });
    setTableData(newList)
    setOpen(false)
  };

  const onChangeName = (event) => {
    setEditUser({...editUser,name:event.target.value});
  };
  const onChangeEmail = (event) => {
    setEditUser({...editUser,email:event.target.value});
  };
  const onChangeRole = (event) => {
    setEditUser({...editUser,role:event.target.value});
  };
  return (
    <>
      <BiEdit
        onClick={modalOpen}
        style={{
          fontSize: "20px",
          cursor: "pointer",
        }}
      />

      <Modal open={open} onClose={onCloseModal} center>
        <form
          onSubmit={onSave}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <label> name:</label>
            <input onChange={onChangeName} value={editUser.name} type="text" placeholder={name} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label> email:</label>
            <input onChange={onChangeEmail}  value={editUser.email}type="text" placeholder={email} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label> role:</label>
            <input onChange={onChangeRole} value={editUser.role} type="text" placeholder={role} />
          </div>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <button
              onClick={onCloseModal}
              style={{
                backgroundColor: "red",
                marginRight: "20px",
                color: "white",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
export default EditUSer;
