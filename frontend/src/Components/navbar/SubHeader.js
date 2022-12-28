import React, { useEffect, useState } from "react";
import "./subHeader.css";
import { getCategories, getCategorySubs } from "../../functions/category";
import { Link, useNavigate } from "react-router-dom";

const SubHeader = () => {
  const [categories, setCategories] = useState("");
  const [subs, setSubs] = useState("");
  const navigate = useNavigate();
  const { text } = SubHeader;

  useEffect(() => {
    listCategories();
  },[]);

  const listCategories = () => {
    getCategories()
      .then((res) => {
        if (res) {
          console.log(res.data);
          setCategories(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSubs = (id) => {
    setSubs("")
    getCategorySubs(id)
      .then((res) => {
        if (res) {
          setSubs(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (e) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="sub-header" style={{ background: "#4a4a4a" }}>
      <div
        className="menu-navbar"
        style={{ background: "#4a4a4a", margin: "0 10px" }}
        >
        {/* {JSON.stringify(categories)} */}
        {/* {categories && categories.length > 0 && categories.map(c => ( */}
        <>
        {categories && categories.map(c=>(
          <>
          <div className="menu-dropdown ml-2" onMouseEnter={()=>getSubs(c._id)}>
            <button
              className="menu-dropbtn"
            >
              <span className="">
              {c.name}<i className="fas fa-angle-down ml-2"></i>
              </span>
            </button>
              <>
              
            <div className="menu-dropdown-content mt-5">
            {subs && subs.map(s=>(
              <Link 
              onClick={handleClick}
              to={`/shop?${s._id}`}>
                {s.name}
              </Link>
            ))}
            </div>
              </>
          </div>
          
          </>
        ))}
        </>
      </div>
    </div>
  );
};

export default SubHeader;
