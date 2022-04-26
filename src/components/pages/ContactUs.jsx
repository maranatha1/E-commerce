import React from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";

export default function ContactUs() {
  const department = ["Please select a department", "Order Status & Delivery", "Payment Assistance", "Returns & Exchanges", "Account Information"];
  return (
    <div>
      <NavBar />
      <h2>Get in touch with us</h2>
      <p style={{ color: "grey", textAlign: "center" }}>Complete the form below and we will get back to you with 24 hours</p>
      <div className="container">
        <form>
          <label className="label">Name:</label>
          <input type="text" className="input" placeholder="Your Name" />

          <label className="label">Email Address:</label>
          <input type="text" className="input" placeholder="Your Email Address" />

          <label className="label">Phone Number</label>
          <input type="text" className="input" placeholder="Your Phone Number" />

          <label className="label">What's on your mind?</label>
          <textarea type="text" className="input" placeholder="Your Subject Here" />

          <label className="label" htmlFor="Department">
            Department:
          </label>
          <select className="dropdown" name="department" id="">
            {department.map((prod, index) => {
              return (
                <option key={index} value={prod}>
                  {prod}
                </option>
              );
            })}
          </select>

          <label className="label">Give us the details</label>
          <textarea type="text" className="input" placeholder="Please be as specific as possible" />

          <br />
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
