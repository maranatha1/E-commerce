import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="">
      <footer>
        <div>
          <nav>
            <Link to="/faq">FAQ</Link>
            <Link to="/privacypolicy">Privacy Policy</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
        <div className="">
          <a href="https://www.linkedin.com/in/maranatha-mantla-1b8277171/">
            <TwitterIcon style={{ fontSize: "40px", color: "white" }} />
          </a>
          <a href="https://www.linkedin.com/in/maranatha-mantla-1b8277171/">
            <InstagramIcon style={{ fontSize: "40px", color: "white" }} />
          </a>
          <a href="https://www.linkedin.com/in/maranatha-mantla-1b8277171/">
            <FacebookIcon style={{ fontSize: "40px", color: "white" }} />
          </a>
        </div>
      </footer>
    </div>
  );
}
