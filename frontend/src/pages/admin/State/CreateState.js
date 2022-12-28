import React from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    createState,
    getStates,
    removeState,
  } from "../../../functions/state";
import { Tooltip } from "@mui/material";
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Alert, Col, Row } from 'react-bootstrap'
import AdminSidebar from "../../../Components/sidebar/AdminSidebar/AdminSidebar";
import CategoryForm from "../../../Components/Forms/CategoryForms";


const CreateState = () => {

    

  return (
    <div>
        
    </div>
  )
}

export default CreateState