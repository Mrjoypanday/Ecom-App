import React from "react";
import "../style/Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
// import { GrUserManager } from "react-icons/gr";
const Header = () => {
  const [auth, setAuth] = useAuth();

  const handelLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout Successfully");
    window.location.reload();
  };

  return (
    <>
      <nav
        id="Nave"
        className="navbar navbar-expand-lg bg-primary justify-content-evenly"
      >
        <div className="container-fluid  ">
          <Link className="navbar-brand" to={"/"}>
            <span className="text-white">KT</span>
          </Link>
          <SearchInput />
          {!auth.users ? (
            <>
              <Link className="nav-link active  text-white" to={"/login"}>
                Login
              </Link>
            </>
          ) : (
            <>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="dropdown-menu nave-drop">
                  <li>
                    <Link className="dropdown-item">{auth?.users?.name}</Link>
                  </li>
                  {auth?.users?.role === 1 ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to={`/dashbord/admin`}>
                          dashbord
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to={"/dashbord/admin/profile"}
                        >
                          profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to={"/dashbord/admin/oders"}
                        >
                          Oders
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          className="dropdown-item"
                          to={"/dashbord/user/profile"}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to={"/dashbord/user/oders"}
                        >
                          Oders
                        </Link>
                      </li>
                    </>
                  )}

                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={handelLogout}
                      to={"/login"}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
