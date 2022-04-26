import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllRoutes, RoutesObj } from "./AllRoutes";

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        {AllRoutes.map((entry, index) => {
          return <Route key={index} exact={entry.ex} path={entry.path} element={entry.comp} />;
        })}

        {Object.values(RoutesObj.non_visual).map((entry, index) => {
          return <Route key={index} exact={entry.ex} path={entry.path} element={entry.comp} />;
        })}
        {/* <Route key='404' path='*' element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

//.map () ensures we always have a returned value
