import React, { useState, useEffect } from "react";
import { getorderDetails, getUserOrders } from "../../functions/User";
import { useSelector } from "react-redux";
import UserSidebar from "../../Components/sidebar/UserSidebar/UserSidebar";
import { Link, useNavigate } from "react-router-dom";
import "./history.css";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { getUserOrder } from "../../functions/User";
import { getUserDetails } from "../../functions/users";
import {ReqReturn} from "../../functions/return"
import Backdrop from "@mui/material/Backdrop";
import {toast} from "react-toastify"
import {
  AppBar,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [userde, setUserDe] = useState(null);
  var [product, setProduct] = useState([]);
  const [temp,setTemp] = useState(true);
  // const [product,setProduct] = useState([]);
  
  useEffect(() => {
    loadUserOrders();
  }, [loading]);

  const loadUserOrders = () =>
  getUserOrders(user.token).then((res) => {
    // console.log(JSON.stringify(res.data, null, 4));
    setOrders(res.data);
  });
  
  const emails = ["username@gmail.com", "user02@gmail.com"];
  
  const [openReturn, setOpenReturn] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  function SimpleDialog(propsReturn) {
    const { onCloseReturn, selectedValue, openReturn } = propsReturn;

    const handleCloseReturn = () => {
      onCloseReturn(selectedValue);
    };

    const handleListItemClick = (value) => {
      onCloseReturn(value);
    };
 
    return (
      <Dialog onClose={handleCloseReturn} open={openReturn}>
        <DialogTitle>Set backup account</DialogTitle>
        <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <ListItem
              button
              onClick={() => handleListItemClick(email)}
              key={email}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "blue", color: "skyblue" }}>
                  {/* <PersonIcon /> */}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItem>
          ))}
          <ListItem
            autoFocus
            button
            onClick={() => handleListItemClick("addAccount")}
          >
            <ListItemAvatar>
              <Avatar>{/* <AddIcon /> */}</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItem>
        </List>
      </Dialog>
    );
  }

  SimpleDialog.propTypes = {
    onCloseReturn: PropTypes.func.isRequired,
    openReturn: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  const showOrderInTable = (order) => {

    const handleClickReturn =async (seller,order_id,pid,product) => {
      setOpenReturn(true);
      // let orderDetail_id =""
      
      try{
          getorderDetails(order_id,pid).then(res=>{
            // localStorage.setItem("orid",res.data._id)
          
            
            var data={
              seller,
              order_id,
              product,
              orderDetail_id:res.data._id,
              buyer_email:user.email,
              user:user._id
            };
             ReqReturn(data).then(res=>{
              //  console.log("111111111111111111111",res.data)

              if(res.data == 213){
                toast.success("Request is already sent to the seller")
              }
              else{

                toast.success("Request is Sent to seller")
              }
             });
            //  toast.success("Req is Sent to Seller")
          });
          }catch(err){
        
      }
    };
  
    const handleCloseReturn = (value) => {
      setOpenReturn(false);
      setSelectedValue(value);
    };
  

    return (
      <>
        <table className="table table-dark">
          <thead>
            <tr>
              <th style={{ color: "white" }} scope="col">
                <b>Name</b>
              </th>
              <th style={{ color: "white" }} scope="col">
                <b>Total</b>
              </th>
              <th style={{ color: "white" }} scope="col">
                count
              </th>
              <th style={{ color: "white" }} scope="col">
                Color
              </th>
              <th style={{ color: "white" }} scope="col">
                Status
              </th>
              <th style={{ color: "white" }} scope="col">
                Request Return
              </th>
              
            </tr>
          </thead>
          <tbody>
            {order.products.map((p, i) => (
              <tr key={i}>
                <td>
                  <b>{p.product.title.slice(0,25)}...</b>
                </td>
                <td>{p.product.price}</td>
                {/* <td>{p.product.brand}</td> */}
                <td>{p.count}</td>
                <td>{p.color}</td>
                <td>{order.orderStatus}</td>
                <td>
                  {/* {JSON.stringify(order._id)} */}
                <Button variant="outlined" onClick={()=>handleClickReturn(p.product.Seller,order._id,p.product._id,p.product.title)}>
                  Request Return
                </Button>
                </td>
                <td>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };


  function handleSubmit(id) {
    setLoading(true);

    try {
      getUserOrder(id).then((res) => {
        setOrder(res.data);
        localStorage.setItem("order", JSON.stringify(res.data));

        getUserDetails(res.data.orderdBy).then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
        });
      });
    } catch (err) {
      console.log("order invoice", err);
    }

    setTimeout(function () {
      // ...

      navigate(`/order/invoice/`);
    }, 1000);
  }

  const showWholeOrder = () => (
    <table className="table table-dark ">
      <thead>
        <tr>
          <th style={{ color: "white" }} scope="col">
            <b>Order Id</b>
          </th>
          <th style={{ color: "white" }} scope="col">
            <b>Total</b>
          </th>
          <th style={{ color: "white" }} scope="col">
            Ordered At
          </th>
          <th style={{ color: "white" }} scope="col">
            Count
          </th>
          <th style={{ color: "white" }} scope="col">
            Payment Method
          </th>
          <th style={{ color: "white" }} scope="col">
            Invoice
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, i) => (
          <tr>
            <th style={{ width: "23%" }} scope="row">
                {/* {order.paymentIntent && order.paymentIntent.length
              <Button sx={{ color: "white" }} onClick={handleClickOpen}>
                  ? order.paymentIntent.id
              </Button>
                  : order.wallet} */}
                {(order.wallet && order.wallet !== null) || undefined
                  ? order.wallet
                  : order.paymentIntent.id}
            </th>
            <td>
              {(order.payment && order.payment !== null) || undefined
                ? order.payment
                : (order.paymentIntent.amount / 100).toLocaleString("en", {
                    style: "currency",
                    currency: "INR",
                  })}
            </td>
            <td>
              {/* {new Date(
                order.paymentIntent.created * 1000
              ).toLocaleDateString()} */}

              {order.paymentIntent && order.paymentIntent.length
                ? new Date(
                    order.paymentIntent.created * 1000
                  ).toLocaleDateString()
                : order.createdAt}
            </td>
            <td>{order.products.length}</td>
            <td>
              {(order.wallet && order.wallet !== null) || undefined
                ? "WALLET"
                : "CREDIT CARD"}
            </td>
            <td>
              <button
                style={{ color: "white" }}
                className="btn btn-sm btn-dark"
                onClick={() => {
                  handleToggle();
                  handleSubmit(order._id);
                }}
              >
                Download
              </button>

              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={opens}
                onClick={handleCloses}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

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

  const [opens, setOpens] = React.useState(false);
  const handleCloses = () => {
    setOpens(false);
  };
  const handleToggle = () => {
    setOpens(!opens);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // ======================open full=====================

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [openFull, setOpenFull] = React.useState(false);

  const handleClickOpenFull = () => {
    setOpenFull(true);
  };

  const handleCloseFull = () => {
    setOpenFull(false);
    window.location.reload();
  };

  // ======================open full=====================
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
            {/* {JSON.stringify(product)} */}
            Order Detail
          </BootstrapDialogTitle>
          <DialogContent dividers>
            {orders.map((order, i) => (
              <div key={i}>{showOrderInTable(order)}</div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Ok
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>

      <div className="category-dashboard-home">
        <UserSidebar />
        <div className="category-dashboard-homeContainer">
          <div className="category-dashboard-listContainer">
            <div className="col">
              <h3 style={{ color: "white" }}>
                {orders.length > 0 ? (
                  <>
                    <span>All orders</span>
                    <button
                      onClick={handleClickOpenFull}
                      className="btn btn-dark btn-md ml-5"
                      style={{ color: "white" }}
                    >
                      Click here to view detailed orders
                    </button>

                    <Dialog
                      sx={{ background: "#383838" }}
                      fullScreen
                      open={openFull}
                      onClose={handleCloseFull}
                      TransitionComponent={Transition}
                    >
                      <AppBar
                        sx={{ background: "#1c1e21", position: "relative" }}
                      >
                        <Toolbar>
                          <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseFull}
                            aria-label="close"
                          >
                            <CloseIcon />
                          </IconButton>
                          <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                          >
                            All Orders Details
                          </Typography>
                          <Button
                            autoFocus
                            color="inherit"
                            onClick={handleCloseFull}
                          ></Button>
                        </Toolbar>
                      </AppBar>
                      <List
                        sx={{
                          background: "#383838",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {orders.map((order, i) => (
                          <ListItem
                            sx={{ background: "#383838", width: "100%" }}
                          >
                            <div style={{ width: "100%" }} key={i}>
                              {showOrderInTable(order)}
                            </div>
                          </ListItem>
                        ))}
                        <Divider />
                      </List>
                    </Dialog>
                  </>
                ) : (
                  "No purchase orders"
                )}
              </h3>
              <hr />
              {showWholeOrder()}
              <div className="div-allorders-main"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default History;
