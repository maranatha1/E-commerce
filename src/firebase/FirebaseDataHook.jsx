import { onValue, push, ref, set } from "firebase/database";
import React, { createContext, useContext, useState, useEffect } from "react";
import { FIREBASE_REALTIME_DB } from "./FirebaseConfig";

const PathString = "PRODUCTS/";
const DataContext = createContext({}); //creator has value
export const useData = () => useContext(DataContext);

export default function FirebaseDataHookProvider({ children, ...props }) {
  const [Products, setProducts] = useState(null); //null if empty

  //responsible for creating a product
  //product values: name, description, price, stockLevel, images
  /*
  inventory.women.jackets.products[]

  const inventory = {
      main: {
          subcat: {
              products: []
          }
      }
  } 
  */
  //read
  useEffect(() => {
    const Ref = ref(FIREBASE_REALTIME_DB, PathString);

    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      console.log("DATA", data);
      if (data !== null) {
        setProducts(data);
      }
    });
  }, []);

  useEffect(() => {}, [Products]);

  function CreateProduct(newProduct) {
    // let test = { name: "Test", desc: "test", price: 0.0, stockLevel: 1, images: [""], mainCategory: "Women", subCategory: "Jackets" };

    let path = `${PathString}${newProduct.mainCat}/${newProduct.subCat}/products`;
    let REF = ref(FIREBASE_REALTIME_DB, `${path}`);
    //get a new key for the product
    const Key = push(REF).key;
    const finalREF = ref(FIREBASE_REALTIME_DB, `${path}/${Key}`);

    return set(finalREF, newProduct);
  }

  function UpdateProduct(ProductId, newProduct, oldProduct) {}
  function DeleteProduct(ProductId) {}

  const value = {
    CreateProduct, //create
    Products, //read
    UpdateProduct, //update
    DeleteProduct //delete
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
