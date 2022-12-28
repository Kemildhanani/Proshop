import React,{useState} from "react";
import { useEffect } from "react";
import { getUsers } from "../../../functions/users";
import Users from "../../../Components/cards/Users";
import AdminSidebar from "../../../Components/sidebar/AdminSidebar/AdminSidebar";
import UserHeader from "./UserHeader";
import "./user.css"

const User = () => {

    const [user,setUser]= useState([]);
    // const {name}=users;

    useEffect(()=>{
      loadUsers();

    },[]);

    const loadUsers=()=>{
      getUsers().then((u)=>{
        setUser(u.data)
        // console.log(u.data.role)
      })
    }

  return (
    <>
      <div className="user-dashboard-home">
        <AdminSidebar />
          <div className="user-dashboard-homeContainer">
            <div className="user-dashboard-listContainer">
              <UserHeader />
            </div>
          </div>
      </div>
    </>
  
    )
};


export default User;