import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../firebase/FirebaseDataHook";
import { RoutesObj } from "../routes/AllRoutes";
// import CategoryView from "../components/CategoryView";

// import women from "../../assets/women.jpg";

export default function CatView() {
  const { Products } = useData();
  const [allInventory, setallInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    SetUp();
  }, []);
  useEffect(() => {
    SetUp();
  }, [Products]);

  function SetUp() {
    if (Products) {
      let main = Object.keys(Products);
      console.log("??", main);
      setallInventory(main);
    }
  }

  return (
    <div>
      {allInventory &&
        allInventory.map((cat, index) => {
          let path = RoutesObj.non_visual.category.path; // "/cat/:type"
          let pathCleaned = path.replace(":type", cat); //using hardcoded value
          console.log(Products[cat].img, "PATHS: ", cat, path, pathCleaned);

          return (
            <button key={index} className="image-container" onClick={() => navigate(`${pathCleaned}`)}>
              <img src={Products[cat].img} alt="broken" />
              <h2>{cat}</h2>
            </button>
          );
        })}
    </div>
  );
}
