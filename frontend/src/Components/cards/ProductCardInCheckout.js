import React from "react";
import image from '../../images/image.jpg'
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
  const colors = ["Black","Brown","Silver","White","Blue","Sky Blue","Yellow","Army green","Pink","Orange","Golden","Transparent","Not defined"];
  let dispatch = useDispatch();

  const handleColorChange = (e) => {
    console.log("color changed", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      //  console.log('cart udpate color', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const imageStyle = {
    width: "100%",
    height: "50px",
    objectFit: "cover",
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
          {p.images[0] ? (
                  <>
                    <img alt="" src={p.images[0].url} style={imageStyle} />
                    <p className="text-center bg-secondary text-light">
                    </p>
                  </>
                ) : (
                  <>
                    <img alt="" src={image} style={imageStyle} />
                    <p className="text-center bg-secondary text-light">
                    </p>
                  </>
                )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control"
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;




// import React from 'react'
// import { useDispatch } from 'react-redux';
// import { ToastContainer, toast } from "react-toastify";
// import { CheckCircleOutlined, 
//         CloseCircleOutlined,
//         CloseOutlined, 
//       }   from '@ant-design/icons';
      
//       const ProductCardInCheckout = ({ p }) => {
//   const colors = ["Black", "Brown", "Silver", "White", "Blue"];
//   let dispatch = useDispatch();

//   const handleColorChange = (e) => {
//     console.log("color changed", e.target.value);

//     let cart = [];
//     if (typeof window !== "undefined") {
//       if (localStorage.getItem("cart")) {
//         cart = JSON.parse(localStorage.getItem("cart"));
//       }

//       cart.map((product, i) => {
//         if (product._id === p._id) {
//           cart[i].color = e.target.value;
//         }
//       });

//       //  console.log('cart udpate color', cart)
//       localStorage.setItem("cart", JSON.stringify(cart));
//       dispatch({
//         type: "ADD_TO_CART",
//         payload: cart,
//       });
//     }
//   };

//   const imageStyle = {
//     width: "100%",
//     height: "50px",
//     objectFit: "cover",
//   };

//   const handleQuantityChange = (e) => {
//     // console.log("available quantity", p.quantity);
//     let count = e.target.value < 1 ? 1 : e.target.value;

//     if (count > p.quantity) {
//       toast.error(`Max available quantity: ${p.quantity}`);
//       return;
//     }

//     let cart = [];

//     if (typeof window !== "undefined") {
//       if (localStorage.getItem("cart")) {
//         cart = JSON.parse(localStorage.getItem("cart"));
//       }

//       cart.map((product, i) => {
//         if (product._id == p._id) {
//           cart[i].count = count;
//         }
//       });

//       localStorage.setItem("cart", JSON.stringify(cart));
//       dispatch({
//         type: "ADD_TO_CART",
//         payload: cart,
//       });
//     }
//   };

//   const handleRemove = () => {
//     // console.log(p._id, "to remove");
//     let cart = [];

//     if (typeof window !== "undefined") {
//       if (localStorage.getItem("cart")) {
//         cart = JSON.parse(localStorage.getItem("cart"));
//       }
//       // [1,2,3,4,5]
//       cart.map((product, i) => {
//         if (product._id === p._id) {
//           cart.splice(i, 1);
//         }
//       });

//       localStorage.setItem("cart", JSON.stringify(cart));
//       dispatch({
//         type: "ADD_TO_CART",
//         payload: cart,
//       });
//     }
//   };
  
//   return (
//     <tbody>
//         <tr>
//             <td>
//             {p.images.length ? (
//               <>
//                 <img alt="" src={p.images[0].url} style={imageStyle} />
//                 <p className="text-center bg-secondary text-light">
//                 </p>
//               </>
//             ) : (
//               <>
//                 <img alt="" src={image} style={imageStyle} />
//                 <p className="text-center bg-secondary text-light">
//                 </p>
//               </>
//             )}
//             </td>
//             <td>{p.title}</td>
//             <td>${p.price}</td>
//             <td>{p.brand}</td>
//             <td>
//               <select 
//               onChange={handleColorChange} 
//               name="color" 
//               className='form-control'
//               >
//                 {p.color ? (
//                 <option value={p.color}>{p.color}</option>
//                 ) : (
//                 <option>Select</option>
//                 ) }
//                 {colors
//                 .filter((c) => c !== p.color)
//                 .map((c) => 
//                 <option key={c} value={c}>
//                   {c}
//                   </option>)}
//               </select>
//             </td>
//             <td>
//             <input
//             width="20"
//             type="number"
//             className="form-control"
//             value={p.count}
//             onChange={handleQuantityChange}
//           />
//             </td>
//             <td className='text-center'>
//             {p.shipping === "Yes" ? (
//             <CheckCircleOutlined className="text-success" />
//           ) : (
//             <CloseCircleOutlined className="text-danger" />
//           )}
//             </td>
//             <td className='text-center'>
//             <CloseOutlined
//             onClick={handleRemove}
//             className="text-danger pointer"
//           />
//             </td>
//         </tr>
//     </tbody>
//   )
// }

// export default ProductCardInCheckout

