import React from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import CatView from "../../products/CatView";

export default function Shop() {
  return (
    <div>
      <NavBar />
      <h1>Euphoria Store</h1>
      <CatView />
      <Footer />
    </div>
  );
}
