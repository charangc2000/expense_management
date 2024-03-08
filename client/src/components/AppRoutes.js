import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "../containers/Profile";
import Setting from "../containers/Setting";
import Register from "../containers/Register";
import Login from "../containers/Login";
import HeroPage from "./HeroPage";
import MenuPage from "./MenuPage";

const AppRoutes = (props) => {
  return (
    <Routes>
      <Route path="/home" element={<MenuPage />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<HeroPage />}></Route>
    </Routes>
  );
};

export default AppRoutes;
