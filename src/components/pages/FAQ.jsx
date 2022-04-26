import React from "react";
import Divider from "@mui/material/Divider";
import NavBar from "../NavBar";
import Footer from "../Footer";

export default function FAQ() {
  return (
    <div>
      <NavBar />
      <div>
        <h2>FAQ</h2>
        <h3>What is the status of my refund? </h3>
        <h4>Returns</h4>
        <p>
          Refunds for returns will be processed once the returned item has been received and inspected at our <br />
          warehouse. It takes 3 to 5 days from collection or drop-off to receive and inspect the items at the <br />
          warehouse. Once inspected it takes up to 5 working days for the refund to reflect in your account. <br />
          <br />
          We'll also keep you updated on the progress of your return and via email.
        </p>
      </div>

      <div>
        <h4>Cancellations</h4>
        <p>
          If items have been cancelled from your order due to an inventory error we'll notify you via email and issue a refund
          <br />
          <ul>
            If you paid with Payfast, Snapscan or Ozow we’ll request your banking details so we can transfer the money into <br />
            your account. It will take 2 days to process the refund and up to 5 days for it to reflect in your account
          </ul>
          <ul>
            If you paid with Credit/Debit card, Mobicred, eBucks, Payflex or Wallet funds we’ll transfer the money <br />
            directly back to that account. It will take up to 5 days to reflect in your account.
          </ul>
        </p>
      </div>

      <div>
        <h4>Failed Delivery or Expired Collection</h4>
        <p>
          If we are unable to deliver your order, or you don’t collect from a pickup point within 7 days, we <br />
          will cancel the order and return it to the warehouse. Once the items have been received back at <br /> the warehouse we’ll issue you with a refund.
          <br />
          <ul>
            If you paid with Payfast, Snapscan or Ozow we’ll request your banking details so we can transfer the money into <br />
            your account. It will take 2 days to process the refund and up to 5 days for it to reflect in your account
          </ul>
          <ul>
            If you paid with Credit/Debit card, Mobicred, eBucks, Payflex or Wallet funds we’ll transfer the money <br />
            directly back to that account. It will take up to 5 days to reflect in your account.
          </ul>
        </p>
      </div>
      <Divider />

      <div>
        <h3>Products On Hold </h3>

        <p> A product is on hold when the last available item is reserved in another customer's cart.</p>
        <p>
          If that customer checks out, the product will move to sold out. If not, the item will become <br /> available again after approximately 30 minutes.
        </p>
        <p>
          If you add the product to your Waitlist you will be notified by email if the product becomes available again. <br />
        </p>
      </div>
      <Divider />

      <div>
        <h3>How to log a return? </h3>
        <p>
          1. Log in to your Euphoria Store account.
          <br />
          2. Enter the order number for the item you want to return on the returns page. <br />
          3. Select the items you want to return and click Proceed. <br />
          4. For each item, select whether you want a refund or to exchange it for a different size. <br />
          5. If requesting a refund, choose your refund method. <br />
          6. If requesting an exchange, choose the size you want your item exchanged for. <br />
          7. Choose your reason for wanting to return the item - we use this information <br />
          to ensure we provide the best products and the best service to you. <br />
          8. You can add notes or images to your return for our returns agents <br />
          to review when checking your return at the warehouse. <br />
          9. Repeat steps 4 to 9 for all items in your return. <br />
          10. Submit your return and accept the returns policy <br />
          11. For items being returned for refund you can choose between dropping your <br />
          return parcel at a Takealot Drop-off Point or for our couriers to collect it from your door. <br />
          12. For items being exchanged, drop off isn’t available. We will arrange for a courier to <br />
          collect your return and deliver your exchange. Please select a collection date that suits you.
          <br />
          13.Submit your return and continue shopping. We'll email you confirmation and further instructions.
        </p>
      </div>
      <Divider />

      <div>
        <h3>Delivery options </h3>
        <p>Euphoria Store offers delivery to your home or office anywhere in South Africa.</p>
        <p>
          Delivery options and estimated date will be presented to you in checkout based <br />
          on your delivery address, the location of the stock, and the availability with our couriers.{" "}
        </p>
        <h4>Standard Delivery</h4>
        <p>
          Main Centre: 2 to 4 working days <br />
          Regional: 2 to 6 working days <br />
          Remote: 3 to 10 working days
          <br />
        </p>

        <h4>Same day Delivery</h4>
        <p>
          Main Centre: EL, KTW, GHT and PE only <br />
          Delivery between 15h00 and 19h00
          <br />
        </p>

        <h4>Saturday/Sunday Delivery</h4>
        <p>
          Main Centre: EL, KTW, GHT and PE only <br />
          Delivery between 15h00 and 19h00
          <br />
        </p>
      </div>
      <Divider />

      <div>
        <h3>Payment Methods</h3>
        <p>
          Payment can be made by:
          <br />
          <ul>Credit card: VISA & Mastercard</ul>
          <ul>Debit card: VISA & Mastercard (must be 3D Secure enabled)</ul>
          <ul>Cash on Delivery (subject to availability)</ul>
          <ul>Instant EFT through Payfast or OZOW</ul>
          <ul>eBucks</ul>
        </p>
      </div>
      <Divider />

      <div>
        <h3>Operating Hours </h3>

        <p> Our website never closes – you are free to purchase 24 hours a day, 365 days a year.</p>
        <p>If you have a query you can reach out to us through the Contact Us form. Our agents will get back to you within 24 hours.</p>
        <p>
          If you would like to speak to an agent, our Customer Service team are available at the following times:
          <br />
          <ul>Monday-Friday: 08:00 to 17:00</ul>
          <ul>Public Holidays*: 10:00 to 13:00</ul>
        </p>
        <p style={{ textAlign: "center" }}>
          <em>*We are open on public holidays, with the exception of Christmas Day and New Year's Day.</em>
        </p>
      </div>
      <Footer />
    </div>
  );
}
