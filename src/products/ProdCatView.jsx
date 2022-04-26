import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useData } from "../firebase/FirebaseDataHook";
import { useNavigate } from "react-router-dom";
import { RoutesObj } from "../routes/AllRoutes";
import Footer from "../components/Footer";

export default function ProdCatView() {
  const { Products } = useData();
  const [ProdsArr, setProdsArr] = useState([]);
  const [main, setmain] = useState("");
  const [sub, setsub] = useState("");
  const [prod, setprod] = useState("");

  //   const [images, setImages] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let path = window.location.href;
    let pathSplit = path.split("/");
    let cat = pathSplit[pathSplit.length - 2];
    let sub = pathSplit[pathSplit.length - 1];
    setmain(cat);
    setsub(sub);
    setprod(prod);

    if (Products !== null) {
      let subCatObj = Products[cat];

      if (subCatObj !== null) {
        let prods = Products[cat][sub];

        if (prods !== null) {
          let arr = Object.values(prods.products);
          setProdsArr(arr);
          console.log("URL: ", path, pathSplit, cat, sub, subCatObj, prods, arr);
        }
      }
    }
  }, [Products]);

  return (
    <div>
      <NavBar />
      <h2>{sub}</h2>
      {/* <button>Back to {main}</button> */}
      <div className="MainContainer">
        {ProdsArr &&
          ProdsArr.map((prod, index) => {
            let path = RoutesObj.non_visual.products_category.path; // "/prod/:cat/:subcat/:index"
            let pathCleaned = path.replace(":cat", main).replace(":subcat", sub).replace(":index", index); //using hardcoded value
            console.log(prod.images, "PATHS: ", prod, path, pathCleaned);

            return (
              <div className="text">
                <button key={index} className="image-container" onClick={() => navigate(`${pathCleaned}`)}>
                  <img style={{ width: "250px", height: "250px" }} src={prod.images} alt="broken" />
                  <p>{prod.productName}</p>
                  <p>{prod.productPrice}</p>
                </button>
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
}
