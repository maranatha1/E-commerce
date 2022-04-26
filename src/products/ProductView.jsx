import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Divider from "@mui/material/Divider";
import { useData } from "../firebase/FirebaseDataHook";
import { useNavigate } from "react-router-dom";
import { RoutesObj } from "../routes/AllRoutes";
import { useAuth } from "../firebase/FirebaseAuthHook";
import Footer from "../components/Footer";
// import { Divider } from "@mui/material";
// import Typography from "@mui/material/Typography";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";

export default function ProductView() {
  const { Products } = useData();
  const [final, setfinal] = useState("");
  const [main, setmain] = useState("");
  const [sub, setsub] = useState("");
  const [id, setid] = useState("");
  const [product, setproduct] = useState("");
  const nav = useNavigate();
  const { CurrentUser, AddProductToCart } = useAuth();

  // function handleClick(event) {
  //   event.preventDefault();
  //   console.info("You clicked a breadcrumb.");
  // }

  useEffect(() => {
    let path = window.location.href;
    let pathSplit = path.split("/");

    let cat = pathSplit[pathSplit.length - 3];
    let sub = pathSplit[pathSplit.length - 2];
    let id = pathSplit[pathSplit.length - 1];
    setmain(cat);
    setsub(sub);
    setproduct(product);
    setid(id);

    if (Products !== null) {
      let subCatObj = Products[cat];

      if (subCatObj !== null) {
        let prods = Products[cat][sub];

        if (prods !== null) {
          let temp = Object.values(prods.products)[id];
          if (temp !== null) {
            setfinal(temp);
            console.log("URL: ", path, pathSplit, cat, sub, subCatObj, prods, temp);
          }
        }
      }
    }
  }, [Products]);

  function AddToCart() {
    //SIGNED IN
    if (CurrentUser !== null) {
      console.log("Adding to our cart here");

      let old = CurrentUser.cart;
      console.log("OLD", old);

      let newOrder = {
        main: final.mainCat,
        sub: final.subCat,
        id: id,
        quantity: 1
      };

      if (old !== null && old !== undefined) {
        old.push(newOrder);
        console.log("old added", old);

        AddProductToCart(CurrentUser.uid, old)
          .then((res) => {
            console.log("YAY");
            window.alert("item added to cart");
          })
          .catch((err) => {
            console.log("Error ", err);
          });
      }
      //
      else {
        let cart = [];
        cart.push(newOrder);
        console.log("new added", cart);

        AddProductToCart(CurrentUser.uid, cart)
          .then((res) => {
            console.log("YAY");
            window.alert("item added to cart");
          })
          .catch((err) => {
            console.log("Error ", err);
          });
      }
    }
    //NOT SIGNED IN
    else {
      let con = window.confirm("Please log in to add to cart ");
      if (con) {
        nav(RoutesObj.visual.sign_in.path);
      }
    }
  }

  return (
    <div>
      <NavBar />
      {/* <button>Back to {sub}</button> */}

      <h2>{final.productName}</h2>
      <br />
      <br />

      <div className="MainContainer">
        <img style={{ width: "350px", height: "350px", position: "relative", right: "200px" }} src={final.images} alt="broken" />

        <div className="SubContainer">
          <p style={{ fontWeight: "bold" }}>{final.productPrice}</p>

          <p>{final.productDesc}</p>
          <p>Buy now! only {final.stockLevel} available in stock</p>

          <button
            type="submit"
            className="button1"
            onClick={() => {
              AddToCart();
            }}>
            Add to cart
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}
