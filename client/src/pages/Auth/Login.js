import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import axios from "axios";
import "../../components/style/Login.css";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const loction = useLocation();

  const hendelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          users: res.data.users,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(loction.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went rong");
    }
  };
  return (
    <Layout>
      <div className="Login-page">
        <div className="card-ld-l">
          <h1 className="title">Login</h1>
          <p className="subtitle">
            Please log in using your Email and password!
          </p>
          <form onSubmit={hendelSubmit}>
            <div className="inputs_container">
              <input
                type="text"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="buttons">
              <button type="submit" className="login_button">
                Login
              </button>
              <Link
                to={"/register"}
                className="login_button text-decoration-none text center"
              >
                Register
              </Link>
            </div>
          </form>
          <div className="link_container">
            <Link to={"/forgot-password"} className="small">
              Forgot Password?
            </Link>
          </div>
          <div className="icons"></div>
        </div>
      </div>
      <div className="login-back"></div>
    </Layout>
  );
};

export default Login;
