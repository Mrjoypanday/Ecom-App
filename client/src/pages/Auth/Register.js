import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAdress] = useState("");
  const [answer, setAnswer] = useState("");
  const [pin, setPin] = useState("");
  const [landMark, setLandMark] = useState("");
  const [village, setVillage] = useState("");

  const navigate = useNavigate();

  const hendelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          phone,
          password,
          address,
          answer,
          pin,
          landMark,
          village,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
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
      <div className="register-page">
        <div className="card-ld-r">
          <h1 className="title">Register</h1>
          <p className="subtitle">
            Please Register using your Detalis and password!
          </p>
          <form onSubmit={hendelSubmit}>
            <div className="inputs_container">
              <input
                type="text"
                placeholder="Enter your Name"
                id="inputEmail4"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter your Email"
                id="inputEmail4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter your Phone Number"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="d-none"
              />
              <input
                type="text"
                placeholder="Enter your Phone Number"
                value={landMark}
                onChange={(e) => setLandMark(e.target.value)}
                className="d-none"
              />
              <input
                type="text"
                placeholder="Enter your Phone Number"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="d-none"
              />
              <input
                type="password"
                placeholder="Enter your Password"
                id="inputPassword4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter your Secret key"
                id="inputPassword4"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Enter your Adderss"
                value={address}
                onChange={(e) => setAdress(e.target.value)}
                required
              />
            </div>
            <div className="buttons">
              <button type="submit" className="login_button">
                Register
              </button>
            </div>
          </form>

          <div className="icons"></div>
        </div>
      </div>
      <div className="register-back"></div>
    </Layout>
  );
};

export default Register;
