import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import { useAuth } from "../../firebase/FirebaseAuthHook";
import { useData } from "../../firebase/FirebaseDataHook";
import Footer from "../../components/Footer";

export default function Cart() {
  const { RemoveProductFromCart, CurrentUser } = useAuth();
  const { Products } = useData();

  const [CART, setCART] = useState([]);

  useEffect(() => {
    // if (CurrentUser !== null && CurrentUser.cart !== undefined && CurrentUser.cart !== null && CurrentUser.cart.length > 0) {
    //   // console.log("curr: ", CurrentUser);
    //   setCART(CurrentUser.cart);
    // }
    // if (CurrentUser !== null && CurrentUser.cart !== undefined && CurrentUser.cart !== null && CurrentUser.cart.length !== CART.length) {
    //   console.log("Something changed lets show it ");
    // }
  }, [CurrentUser]);

  useEffect(() => {
    let arr = [];
    if (CurrentUser !== null && CurrentUser.cart !== undefined && CurrentUser.cart !== null && CurrentUser.cart.length !== undefined) {
      console.log("CU", CurrentUser);
      if (Products !== null) {
        console.log("prods: ", Products);
        console.log("okay we have info lets go on with setup");
        CurrentUser.cart.map((entry, index) => {
          if (Products[entry.main]) {
            if (Products[entry.main][entry.sub]) {
              if (Products[entry.main][entry.sub].products) {
                let prods = Object.values(Products[entry.main][entry.sub].products);

                console.log("???", prods[index]);
                arr.push({
                  prod: prods[index],
                  cart: entry,
                  index
                });
              }
            }
          }
        });
      }
      console.log("arr", arr);
      setCART(arr);
    }
  }, [Products]);

  useEffect(() => {}, [CART]);

  function RunRemove(entry) {
    console.log("??? REMOVE ???", entry);
    RemoveProductFromCart(CurrentUser.uid, entry.index)
      .then(() => {
        console.log("Files array updated successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Files array updated unsuccessful".err);
      });
  }

  function DisplayCart() {
    if (CurrentUser && Products && CART && CART.length > 0) {
      return (
        <table className="items">
          <tr>
            <th></th>
            <th>Product Name:</th>
            <th>Description: </th>
            <th>Price:</th>
            <th>Quantity:</th>
          </tr>
          {CART.map((entry, index) => {
            return (
              <tr key={index}>
                <td>
                  <img style={{ width: "100px", height: "100px" }} src={entry?.prod?.images ? entry.prod.images : ""} alt="broken" />
                </td>
                <td>{entry?.prod?.productName}</td>
                <td>{entry?.prod?.productDesc}</td>
                <td>{entry?.prod?.productPrice}</td>
                <td>{entry?.cart?.quantity}</td>

                <button
                  className="button2"
                  onClick={() => {
                    RunRemove(entry);
                  }}>
                  Remove item
                </button>
              </tr>
            );
          })}
        </table>
      );
    } else {
      return <p style={{ textAlign: "center" }}>Cart is empty!</p>;
    }
  }

  return (
    <div>
      <NavBar />
      <h2>Cart</h2>
      <br />
      <br />
      {DisplayCart()}
      <br />
      <br />
      <br />
      <br />
      <br />

      <Footer />
    </div>
  );
}
