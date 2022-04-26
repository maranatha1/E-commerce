import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { useData } from "../../firebase/FirebaseDataHook";

export default function ProductUploads() {
  const { CreateProduct } = useData();

  let categoryValues = {
    mainCat: "",
    subCat: "",
    productName: "",
    productDesc: "",
    productPrice: "",
    stockLevel: "",
    images: [""]
  };

  const mainCategory = ["Kids", "Men", "Women"];
  const subCategory = ["Jackets", "Knitwear", "Pants", "Shoes", "Sleepwear", "Tops"];

  const [categoryData, setCategoryData] = useState(categoryValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
    console.log("???", { ...categoryData, [name]: value });
  };

  const submitChange = () => {
    console.log("values ", categoryData);
    CreateProduct(categoryData).then(() => {
      setCategoryData(categoryValues);
    });
  };

  useEffect(() => {}, [categoryData]);

  return (
    <div>
      <NavBar />
      <h2>Inventory:</h2>
      <div className="container">
        {/* <form onSubmit={submitChange}> */}
        <label className="label" htmlFor="Main Category">
          Main Category:
        </label>
        <select className="dropdown" name="mainCat" id="" value={categoryData.mainCat} onChange={handleChange}>
          <>
            <option>Please select an option from the list</option>
            {mainCategory.map((prod, index) => {
              return (
                <option key={index} value={prod}>
                  {prod}
                </option>
              );
            })}
          </>
        </select>

        <label className="label" htmlFor="Sub Category">
          Sub Category:
        </label>

        <select className="dropdown" name="subCat" id="" value={categoryData.subCat} onChange={handleChange}>
          <>
            <option>Please select an option from the list</option>
            {subCategory.map((subProd, index) => {
              return (
                <option key={index} value={subProd}>
                  {subProd}
                </option>
              );
            })}
          </>
        </select>

        <label className="label">Product Name:</label>
        <input value={categoryData.productName} onChange={handleChange} name="productName" type="text" className="input" placeholder="Product Name" />

        <label className="label">Description:</label>
        <input value={categoryData.productDesc} onChange={handleChange} name="productDesc" type="text" className="input" placeholder="Product Description" />

        <label className="label">Price:</label>
        <input value={categoryData.productPrice} onChange={handleChange} name="productPrice" type="text" className="input" placeholder="Product Price" min="0" />

        <label className="label">Stock Level:</label>
        <input value={categoryData.stockLevel} onChange={handleChange} name="stockLevel" type="number" className="input" placeholder="Stock Level" min="0" />

        <label htmlFor="ImageUpload" className="label">
          Image Upload:
        </label>
        <input type="text" className="input" value={categoryData.images} onChange={handleChange} name="images" required />

        <br />
        <div className="text-center">
          <button
            className="btn btn-primary w-100 theme-btn mx-auto"
            onClick={() => {
              submitChange();
            }}>
            Add Product
          </button>
        </div>
        {/* </form> */}
      </div>
      <Footer />
    </div>
  );
}

//onClick={upload}
