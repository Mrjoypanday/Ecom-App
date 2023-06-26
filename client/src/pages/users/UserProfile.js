import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const UserProfile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [address, setAdress] = useState("");
  const [village, setVillage] = useState("");
  const [landMark, setLandMark] = useState("");
  const [pin, setPin] = useState("");

  const navigate = useNavigate();

  const hendelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, phone, address, village, landMark, pin }
      );
      if (data?.error) {
        toast.error("update fals");
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.users = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Update Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("error went rong");
    }
  };
  useEffect(() => {
    const { email, name, phone, village, landMark, pin, address } = auth?.users;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setVillage(village);
    setLandMark(landMark);
    setPin(pin);
    setAdress(address);
  }, [auth?.users]);

  return (
    <Layout>
      <div className="register-page">
        <div className="card-ld-r">
          <h1 className="title">User Profile</h1>

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
                disabled
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
                placeholder="Enter your Village Name"
                id="inputPassword4"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter your Land Mark"
                id="inputPassword4"
                value={landMark}
                onChange={(e) => setLandMark(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter your pincode"
                id="inputPassword4"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
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
            <div className="buttons-update">
              <button type="submit" className="login_button">
                Update
              </button>

              <button
                type="submit"
                className="login_button"
                onClick={() => navigate("/cart")}
              >
                Next
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

export default UserProfile;
