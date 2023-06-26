import React from "react";
import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";
import img from "../image/b1.jpg";
import { BsTelephone } from "react-icons/bs";
import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-3 ">
            <h1 className="text-center">
              <span className="about-text"> Kormakar</span>
              <span className="about-text"> Telecom </span>
            </h1>
            <div className="text-center about-img">
              <img src={img} className="about-image" />
            </div>
            <h2 className="text-white mt-2 text-center">Contact US</h2>
            <hr />
            <div class="container text-center ">
              <div className="row ">
                <div className="About-Shop col-4 col-sm-3 mt-3 border">
                  <h6 className="mt-2 text-white">Contact</h6>
                </div>
                <div className="About-Shop col-8 col-sm-8 mt-3 border ">
                  <p
                    className="text-white mt-2"
                    style={{ "letter-spacing": "2px " }}
                  >
                    <BsTelephone /> +917894561230
                  </p>
                </div>
              </div>
              <div className="row ">
                <div className="About-Shop col-4 col-sm-3 mt-2 border">
                  <h6 className="mt-2 text-white">Contact</h6>
                </div>
                <div className="About-Shop col-8 col-sm-8 mt-2 border ">
                  <p
                    className="text-white mt-2"
                    style={{ "letter-spacing": "2px " }}
                  >
                    <FaWhatsapp /> +917894561230
                  </p>
                </div>
              </div>
              <div className="row ">
                <div className="About-Shop col-4 col-sm-3 mt-2 border">
                  <h6 className="mt-2 text-white">Contact</h6>
                </div>
                <div className="About-Shop col-8 col-sm-8 mt-2 border ">
                  <p
                    className="text-white mt-2"
                    style={{ "letter-spacing": "2px " }}
                  >
                    <FaFacebookF /> +917894561230
                  </p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="About-Shop col-4 col-sm-3 mt-2 border">
                  <h6 className="mt-2 text-white">Address</h6>
                </div>
                <div className="About-Shop col-8 col-sm-8 mt-2 border ">
                  <p
                    className="text-white "
                    style={{ "letter-spacing": "2px " }}
                  >
                    Sospur Bazar, Panchberiy, Gopalnagar, North 24porganas,
                    Westbengal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Contact;
