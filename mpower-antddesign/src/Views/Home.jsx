import React, { useEffect } from "react";
import "../Styles/Home.css";
import "../Styles/Header.css";
import "../Styles/navbar.css";
import Header from "../Components/Home/Header";
import UserService from "../Services/UserService";
import state from "../Utils/Store";
import Navbar from "../Components/Home/Navbar";

const Home = () => {
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      UserService.getProfile()
        .then((userDataMain) => {
          state.currentUser = userDataMain;
        })
        .catch((err) => {});
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
