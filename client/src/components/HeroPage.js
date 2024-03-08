//import AppRoutes from "./routes";
// import { useState } from "react";
import AppFooter from "./AppFooter";
import "./../styles/heropage.css";
import "./../styles/general.css";
import { Link } from "react-router-dom";
import { Modal } from "antd";

const HeroPage = (props) => {
  const [modal, contextHolder] = Modal.useModal();

  const confirm = () => {
    modal.confirm({
      title: "Confirm",
      content:
        "Before getting start,You need to Register an account for yourself!!!",
      okText: "ok",
      cancelText: "cancel",
    });
  };

  return (
    <div>
      <section className="section-hero">
        <div className="header">
          <a href="#appimg">
            <img
              className="logo"
              alt="expense-management-logo"
              src="https://1000logos.net/wp-content/uploads/2020/04/Budget-Logo.png"
            />
          </a>
          <nav className="section-nav">
            <ul className="nav-list">
              <li>
                <Link className="hero-link" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="hero-link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="hero-link" href="#">
                  About us
                </Link>
              </li>
              <li>
                <Link className="hero-link nav-icon">
                  <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="container main-header">
          <div className="header-container">
            <h1 className="primary-heading">Welcome To Expense Management,</h1>
            <h2 className="secondary-heading">
              Here,we are with you through this application,we can helps you to
              make future budget efficiently.
            </h2>
            <p className="heading-text">
              and also helps you to track users spending by category and verify
              purchase for authorized personal purpose and It thoroghly works to
              maintain user's monthly expenses and one more finaly helps to keep
              an account record of user's.{" "}
            </p>
            <button className="main-header-btn" onClick={confirm}>
              getting started &rarr;
            </button>
            {contextHolder}
          </div>
        </div>
      </section>
      <AppFooter />
    </div>
  );
};

export default HeroPage;
