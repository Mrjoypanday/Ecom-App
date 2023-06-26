import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "../../components/style/Login.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const hendelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, answer, newPassword }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
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
      <div className="Forgotpassword">
        <div className="card-ld">
          <h1 className="title">Reset Your Password</h1>
          <p className="subtitle-2">Please Enter Email and Secret Key</p>
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
                type="text"
                placeholder="Enter Secret Key"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Enter your new Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="buttons">
              <button type="submit" className="login_button-2">
                Reaset password
              </button>
            </div>
          </form>

          <div className="icons"></div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
