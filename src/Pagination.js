import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import "./Pagination.css";

function Pagination({ pageNumbers, changePage, currentPage ,setCurrentPage}) {

  const pageNumersArray = [];
  for (let i = 1; i <= pageNumbers; i++) {
    pageNumersArray.push(i);
  }

  const firstPage=()=>{
    setCurrentPage(1)
  }
  const lastPage=()=>{
    setCurrentPage(pageNumbers)
  }

const previous=()=>{
    setCurrentPage((currentPage)=>currentPage-1)
  }
  const next=()=>{
    setCurrentPage((currentPage)=>currentPage+1)
  }
  return (
    <>
      <div className="pagination">
        <span>
          <FaAngleDoubleLeft onClick={firstPage} />
        </span>
        <span>
          <FaAngleLeft onClick={previous}/>
        </span>
        {pageNumersArray.map((number) => {
          return (
            <span
              key={number}
              className={currentPage === number ? "active" : ""}
              onClick={()=>changePage(number)}
            >
              {number}
            </span>
          );
        })}
        <span>
          <FaAngleRight onClick={next} />
        </span>
        <span>
          <FaAngleDoubleRight onClick={lastPage} />
        </span>
      </div>
    </>
  );
}

export default Pagination;
