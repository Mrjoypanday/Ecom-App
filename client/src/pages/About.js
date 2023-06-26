import React from "react";
import Layout from "../components/layout/Layout";
import "../../src/components/style/About.css";
import img from "../image/b1.jpg";
import Footer from "./../components/layout/Footer";
const About = () => {
  return (
    <Layout title={"Ecommerce -about"}>
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
            <h2 className="text-white mt-2 text-center">About All</h2>
            <hr />
            <div class="container text-center ">
              <div className="row">
                <div className="About-Shop col-3 col-sm-3 mt-3 border">
                  <h4 className="mt-3 text-white">About My shop</h4>
                </div>
                <div className="About-Shop col-9 col-sm-8 mt-3 border">
                  <p className="text-white">
                    myshopstore | deals with good quality online store and also
                    provides services to help peoples to choose good quality
                    dresses, latest trending dresses.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="About-Shop col-3 col-sm-3 mt-3 border">
                  <h5 className="mt-3 text-white">About My Product</h5>
                </div>
                <div className="About-Shop col-9 col-sm-8 mt-3 border">
                  <p className="text-white">
                    myshopstore | deals with good quality online store and also
                    provides services to help peoples to choose good quality
                    dresses, latest trending dresses.
                  </p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="About-Shop col-3 col-sm-3 mt-3 border p-2">
                  <h6 className="mt-3 text-white">About My Product Ctaegory</h6>
                </div>
                <div className="About-Shop col-9 col-sm-8 mt-3 border">
                  <p className="text-white">
                    myshopstore | deals with good quality online store and also
                    provides services to help peoples to choose good quality
                    dresses, latest trending dresses.
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

export default About;
