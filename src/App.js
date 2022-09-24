import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import Pagination from "./Pagination";
import EditUSer from "./editUser/editUser";
import Checkbox from "./checkbox";
import "./App.css";

function App() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setselectedUser] = useState([]);
  const [isAllSelected, setAllSelected] = useState(false);
  const [recordsPerPage] = useState(10);
  const url =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  const data = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const fetchedData = await response.json();
      setTableData(fetchedData);
      setFilteredData(fetchedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    data();
  }, []);

  if (loading) {
    return (
      <>
        <h1>loading....</h1>
      </>
    );
  }
 
  const searchItems = (searchValue) => {
    setSearchText(searchValue)
    if (searchText !== '') {
        const filteredTableData = currentRecords.filter((obj) => {
            // return  Object.keys(obj).some((key) =>
            // obj[key].toLowerCase().includes(searchText.toLowerCase())
            // )
            return Object.values(obj).join('').toLowerCase().includes(searchText.toLowerCase())
        })
        setTableData(filteredTableData)
    }
    else{
      setTableData(filteredData)
    }
}


  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = tableData.slice(indexOfFirstRecord, indexOfLastRecord);
  const numberOfPages = Math.ceil(tableData.length / recordsPerPage);

 
  const selectedPage = (number) => {
    setCurrentPage(number);
  };

  const onDeleteUser = (id) => {
    const updateDeleteUserList = tableData.filter((user) => user.id !== id);
    setTableData(updateDeleteUserList);
  };

  const handleSelectAll = (e) => {
    setAllSelected(!isAllSelected);
    setselectedUser(currentRecords.map((li) => li.id));
    if (isAllSelected) {
      setselectedUser([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setselectedUser([...selectedUser, id]);
    if (!checked) {
      setselectedUser(selectedUser.filter((item) => item !== id));
    }
  };
  const handleDeleteAll = () => {
    const newList = tableData.filter((user) => !selectedUser.includes(user.id));
    setTableData(newList);
    setAllSelected(false);
  };

  return (
    <div className="app-container">
      <input
        className="input"
        placeholder="Search by name email or role "
        type="text"
        name="search"
        value={searchText}
        onChange={(e) => searchItems(e.target.value)}
      />
      <table className="table-container">
        <thead>
          <tr>
            <th>
              <Checkbox
                type="checkbox"
                name="selectAll"
                id="selectAll"
                handleClick={handleSelectAll}
                selectedUsered={isAllSelected}
              />
            </th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        {currentRecords.map((eachUser) => {
          return (
            <tbody>
              <tr>
                <td>
                  <Checkbox
                    key={eachUser.id}
                    type="checkbox"
                    id={eachUser.id}
                    handleClick={handleClick}
                    selectedUsered={selectedUser.includes(eachUser.id)}
                  />
                </td>
                <td>{eachUser.name}</td>
                <td>{eachUser.email}</td>
                <td>{eachUser.role}</td>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  <EditUSer
                    key={eachUser.id}
                    userId={eachUser.id}
                    tableData={tableData}
                    setTableData={setTableData}
                  />

                  <MdDelete
                    onClick={() => onDeleteUser(eachUser.id)}
                    style={{
                      color: "red",
                      fontSize: "20px",
                      cursor: "pointer",
                      marginLeft: "20px",
                    }}
                  />
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <div
        style={{
          marginTop: "5rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          style={{ backgroundColor: "red", color: "white", fontWeight: "bold" }}
          onClick={handleDeleteAll}
        >
          deletedSelectedRows
        </button>
        <Pagination
          pageNumbers={numberOfPages}
          changePage={selectedPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default App;
