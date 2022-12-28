import React, { useState } from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

import {getOrders,changeStatus} from "../../functions/admin"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { updateStatus } from "../../functions/seller";

const AgencyOrders = ({ orders, handelStatusChange }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  const handleClickOpen = () => {
    setOpen(false);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit(order) {
    window.localStorage.setItem("order", JSON.stringify(order));
  }

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
    });

    updateStatus(orderId,orderStatus)
    window.location.reload()
  };

  return (
    <>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Order Detail
          </BootstrapDialogTitle>
          <DialogContent dividers></DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>

      {/* {JSON.stringify(orders)} */}
      <table className="table table-dark">
        <thead>
          <tr>
            <th style={{ color: "white" }} scope="col">
              <b>Order Id</b>
            </th>
            <th style={{ color: "white" }} scope="col">
              Count
            </th>
            <th style={{ color: "white" }} scope="col">
              Ordered At
            </th>
            <th style={{ color: "white" }} scope="col">
              Status
            </th>
            <th style={{ color: "white" }} scope="col">
              Change Status
            </th>
            {/* <th style={{ color: "white" }} scope="col">
            Invoice
          </th> */}
          </tr>
        </thead>
        {orders.map((order) => (
          <tbody>
            <tr>
              <th style={{ width: "25%" }} scope="row">
                <Button>{order._id}</Button>
              </th>
              <td>{order.products.length}</td>
              <td>
                {order.paymentIntent == undefined
                  ? order.createdAt
                  : new Date(
                      order.paymentIntent.created * 1000
                    ).toLocaleDateString()}
              </td>
              <td>
                {/* {handleStatus} */}
                <span className="">{order.orderStatus}</span>
              </td>
              <select
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="form-control"
                defaultValue={order.orderStatus}
                name="status"
                style={{ color: "white" }}
              >
                <option style={{ color: "black" }} value="Not Processed">
                  Not Processed
                </option>
                <option style={{ color: "black" }} value="Processing">
                  Processing
                </option>
                <option style={{ color: "black" }} value="Dispatched">
                  Dispatched
                </option>
                <option style={{ color: "black" }} value="Cancelled">
                  Cancelled
                </option>
                <option style={{ color: "black" }} value="Completed">
                  Completed
                </option>
              </select>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
};
export default AgencyOrders;
