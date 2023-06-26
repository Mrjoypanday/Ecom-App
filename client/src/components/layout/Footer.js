import React from "react";
import { Link } from "react-router-dom";
import "../style/Layout.css";
const Footer = () => {
  return (
    <>
      <div className="container topper ">
        <div className="border text-light">
          <h5 className="text-center">
            Karmakar Telecom &copy; Mrityunjoy panday
          </h5>
          <p className="text-center mt-3">
            <Link className="m-1 text-white" to={"/about"}>
              About
            </Link>
            ||
            <Link className="m-1 text-white" to={"/contact"}>
              Contact
            </Link>
            ||
            <Link className="m-1 text-white" to={"/policy"}>
              Polichy
            </Link>
            ||
          </p>
        </div>
      </div>
      <div className="register-back"></div>
    </>
  );
};

export default Footer;
