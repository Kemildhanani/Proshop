import React, { useEffect, useState } from "react";
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
import { changeSchedule, changeStatus } from "../../../functions/admin";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getproductbyid } from "../../../functions/product";
import { updateSchedule, updateStatus } from "../../../functions/seller";
// import {  changeStatus } from '../../../functions/admin';

const Orders = ({ orders }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadproduct();
  }, []);

  const handleStatusChange = async (orderId, orderSchedule) => {
    changeSchedule(orderId, orderSchedule, user.token).then((res) => {
      toast.success("Status updated");
    });
    await updateSchedule(orderId, orderSchedule);
    window.location.reload();
  };

  const loadproduct = async () => {
    await getproductbyid(orders.product).then((res) => {
      setProduct(res.data);
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
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
          <DialogContent dividers>
            <span>Product Name: </span> <br />
            <strong>{product.title}</strong>
            <br />
            <br />
            <span>order Id: </span> &nbsp;
            <strong>{orders._id}</strong>
            <br />
            <br />
            <span>Payment Id: </span> &nbsp;
            <strong>
              {orders.paymentIntent == undefined
                ? orders.wallet
                : orders.paymentIntent.id}
            </strong>
            <br />
            <br />
            <span>Payment Amount: </span> &nbsp;
            <strong>
              {orders.paymentIntent == undefined
                ? orders.payment
                : orders.paymentIntent.amount / 100}
            </strong>
            <br /><br />
            <span>order by: </span> &nbsp;
             <strong>
               {orders.orderdBy}
              </strong> <br /> <br />
            <span>qty : </span>&nbsp;
            <strong>{orders.qty}</strong>
            <br />
            {/* <span>order by: </span> <strong>{orders.orderdBy}</strong> */}
            {/* <span>product id: </span> <strong>{orders.product}</strong> */}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Ok
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
              <b>Amount</b>
            </th>
            <th style={{ color: "white" }} scope="col">
              Ordered At
            </th>
            <th style={{ color: "white" }} scope="col">
              Statuds
            </th>
            <th style={{ color: "white" }} scope="col">
              Change Status
            </th>
          </tr>
        </thead>
        {/* {orders.map((order)=> ( */}

        <tbody>
          <tr>
            <th style={{ width: "25%" }} scope="row">
              <Button onClick={() => handleClickOpen()}>
              {orders._id}
                </Button>
            </th>
            <td>
              {
              orders.paymentIntent == undefined ? orders.payment:
              (orders.paymentIntent.amount / 100).toLocaleString("en", {
                style: "currency",
                currency: "INR",
              })}
            </td>
            <td>
              {new Date(
                orders.paymentIntent == undefined
                  ? orders.createdAt
                  : orders.paymentIntent.created * 1000
              ).toLocaleDateString()}
            </td>
            <td>
              {/* {handleStatus} */}
              <span className="">{orders.orderSchedule}</span>
            </td>
            <select
              onChange={(e) =>
                handleStatusChange(orders.orderID, e.target.value)
              }
              className="form-control"
              defaultValue={orders.orderSchedule}
              name="status"
              style={{ color: "white" }}
            >
              {/* <option disabled >Please Select</option> */}
              <option style={{ color: "black" }} value="Unschedule">
                Unschedule
              </option>
              <option style={{ color: "black" }} value="Schedule">
                Schedule
              </option>
             
            </select>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default Orders;
