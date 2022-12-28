import image from "../../images/image.jpg"
import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  // const imageStyle = {
  //   width: "100%",
  //   height: "100px",
  //   objectFit: "cover",
  // };

  return (
    <Drawer
      className="text-center"
      title={`Cart (${cart.length} Products)`}
      placement="right"
      closable={false}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0] ? (
              <>
                <img style={{maxHeight:"150px", maxWidth:"150px"}} alt="" src={p.images[0].url}  />
                <p style={{backgroundColor: "gray"}} className="text-center text-light">
                {p.title.substring(0, 50).concat("...")} x {p.count} 
                </p>
              </>
            ) : (
              <>
                <img alt="" src={image} style={{maxHeight:"100px", maxWidth:"100px"}}  />
                <p className="text-center bg-dark text-light">
                {p.title.substring(0, 50).concat("...")}
                  
                  {/* {p.title} x {p.count} */}
                </p>
              </>
            )}
          </div>
        </div>
      ))}

      <Link to="/cart">
        <button
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          className="text-center btn btn-dark btn-raised btn-block"
        >
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;

