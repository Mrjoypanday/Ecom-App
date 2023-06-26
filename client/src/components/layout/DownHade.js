import React from "react";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { FaSwatchbook } from "react-icons/fa";
import { BiHomeAlt2 } from "react-icons/bi";
import { GrUserManager } from "react-icons/gr";
import "../style/DownHade.css";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
const DownHade = () => {
  const categories = useCategory();
  const [cart] = useCart();
  return (
    <>
      <div className="container mb-5">
        <nav className="navbar fixed-bottom bg-body-tertiary">
          <div className="container p-2 mx-2">
            <div className="row ms-2">
              <Link className="nav-link  fs-2 active" to={"/"}>
                <BiHomeAlt2 />
              </Link>
            </div>
            <div className="row">
              <Link className="nav-link  fs-3 " to={"/dashbord/user/profile"}>
                <GrUserManager />
              </Link>
            </div>
            <div className="row">
              <div className="btn-group dropup">
                <button
                  type="button"
                  className="btn btn-info dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaSwatchbook />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/category"}>
                      All Category
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* <Link class="navbar-brand fs-3 Info" to={""}>
                <FaSwatchbook />
              </Link> */}
            </div>
            <div className="row me-2">
              <Badge count={cart?.length}>
                <Link className="nav-link fs-3 Info" to={"/cart"}>
                  <BsCart4 />
                </Link>
              </Badge>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default DownHade;
