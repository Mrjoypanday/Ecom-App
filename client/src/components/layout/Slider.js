import React from "react";
import img from "../../image/a1.jpg";
import img1 from "../../image/b1.jpg";
import img2 from "../../image/c1.jpg";

const Slider = () => {
  return (
    <>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide  "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img} className="d-block w-100 h-80" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img1} className="d-block w-100 h-80" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img2} className="d-block w-100 h-80" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Slider;
