import React, { useState, useEffect } from "react";
import { useData } from "../firebase/FirebaseDataHook";
import { useNavigate } from "react-router-dom";
import { RoutesObj } from "../routes/AllRoutes";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function SubCatView() {
  const { Products } = useData();
  const [allProducts, setallProducts] = useState([]);
  const navigate = useNavigate();
  const [main, setmain] = useState("");

  useEffect(() => {
    if (Products !== null) {
      let path = window.location.href;
      let pathSplit = path.split("/");
      let cat = pathSplit[pathSplit.length - 1]; //last entry in array is our cat
      setmain(cat);

      if (Products) {
        let subCatObj = Products[cat];

        if (subCatObj !== null) {
          let subCatStrings = Object.keys(subCatObj);
          setallProducts(subCatStrings);
        }

        console.log("URL: ", path, pathSplit, cat, subCatObj); // , subCatStrings
      }
    }
  }, []);

  return (
    <div>
      <NavBar />
      <h2>{main}</h2>
      {allProducts &&
        allProducts.map((sub, index) => {
          let path = RoutesObj.non_visual.sub_category.path; // "/subcat/:cat/:subcat"
          let pathCleaned = path.replace(":cat", main).replace(":subcat", sub); //using hardcoded value
          console.log(Products[main][sub]?.img, "PATHS: ", sub, path, pathCleaned);

          return (
            <button key={index} className="image-container" onClick={() => navigate(`${pathCleaned}`)}>
              <img src={Products[main][sub]?.img} alt="broken" />
              <h2>{sub}</h2>
            </button>
          );
        })}
      <Footer />
    </div>
  );
}
