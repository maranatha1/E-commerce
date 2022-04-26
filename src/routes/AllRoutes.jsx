import SignIn from "../pages/authentication/SignIn";
import SignUp from "../pages/authentication/SignUp";
import ForgotPass from "../pages/authentication/ForgotPass";
import ResetPass from "../pages/authentication/ResetPass";
import Shop from "../pages/basic/Shop";
import ProductUploads from "../pages/admin/ProductUploads";
import CatView from "../products/CatView";
import FAQ from "../components/pages/FAQ";
import ContactUs from "../components/pages/ContactUs";
import SubCatView from "../products/SubCatView";
import ProductView from "../products/ProductView";
import ProdCatView from "../products/ProdCatView";
import Cart from "../pages/basic/Cart";
import PrivacyPolicy from "../components/pages/PrivacyPolicy";

//access to all child properties: RoutesObj.home.path
//OBJECT STRUCTURE:: key: {value    }
export const RoutesObj = {
  visual: {
    cart: { name: "Cart", path: "/cart", comp: <Cart />, ex: true },
    //admin
    admin: { name: "Admin ", path: "/admin", comp: <ProductUploads />, ex: true },
    //authentication
    sign_up: { name: "Register", path: "/register", ex: true, comp: <SignUp /> },
    sign_in: { name: "Login", path: "/login", comp: <SignIn />, ex: true },

    //basic

    shop: { name: "Shop", path: "/", ex: true, comp: <Shop /> }
  },
  non_visual: {
    //authentication
    forgot_pass: { name: "Forgot Password", path: "/forgot", ex: true, comp: <ForgotPass /> },
    reset_pass: { name: "Reset Password", path: "/reset", ex: true, comp: <ResetPass /> },

    faq: { name: "FAQ", path: "/faq", comp: <FAQ />, ex: true },
    privacy: { name: "Privacy Policy", path: "/privacypolicy", comp: <PrivacyPolicy />, ex: true },
    contact: { name: "Contact Us", path: "/contact", comp: <ContactUs />, ex: true },

    //Products
    category: { name: "Category Page", path: "/cat/:type", comp: <SubCatView />, ex: false },
    sub_category: { name: "Sub Category Page", path: "/subcat/:cat/:subcat", comp: <ProdCatView />, ex: false }, //All products
    products_category: { name: "Product Category Page", path: "/prod/:cat/:subcat/:index", comp: <ProductView />, ex: false }, //product
    product: { name: "Single Product Page", path: "/prod/:cat/:subcat/:index_id", comp: <ProductView />, ex: false }
  }
};

export const AllRoutes = Object.values(RoutesObj.visual);

//convert object  to an array using built in js function
/* takes obj iterates over it and pushes each values into an array and returns the array back to us to use */

// export const vis = Object.values(RoutesObj.visual);
// export const non_vis = Object.values(RoutesObj.non_visual);

// export const AllRoutes = [...non_vis, ...vis];
//ex = exact
