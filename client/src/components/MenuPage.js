import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Image, Space, Drawer } from "antd";
import "../App.css";
import { asyncDeleteData, asyncGetExpenses } from "../actions/expenseAction";
import DeletedExpense from "./DeletedExpense";
import Home from "../containers/Home";
//FROM STYLE PAGE
import "./../styles/MenuPage.css";

const MenuPage = (props) => {
  const { user } = useSelector((state) => {
    return state;
  });

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const onClose = () => {
    setVisible(false);
    dispatch(asyncGetExpenses());
  };

  return (
    <>
      <div className="AppHeader">
        <div>
          <Image
            className="header-img"
            width={100}
            src="https://1000logos.net/wp-content/uploads/2020/04/Budget-Logo.png"
          ></Image>
        </div>
        <div>
          {Object.keys(user).length > 0 && (
            <>
              <ul className="menu-nav">
                <li className="menu-list">
                  <ion-icon
                    style={{ color: "black" }}
                    name="home-sharp"
                  ></ion-icon>
                  <Link className="menu-link" to="/home">
                    Home
                  </Link>
                  <ion-icon name="caret-down-sharp"></ion-icon>
                </li>
                <li className="menu-list">
                  <ion-icon
                    style={{ color: "black" }}
                    name="settings-sharp"
                  ></ion-icon>
                  <Link className="menu-link" to="/setting">
                    setting
                  </Link>
                  <ion-icon name="caret-down-sharp"></ion-icon>
                </li>
                <li className="menu-list">
                  <ion-icon
                    style={{ color: "black" }}
                    name="person-sharp"
                  ></ion-icon>
                  <Link className="menu-link" to="/profile">
                    Profile
                  </Link>
                  <ion-icon name="caret-down-sharp"></ion-icon>
                </li>
                <li className="menu-list">
                  {" "}
                  <Button
                    onClick={() => {
                      setVisible(true);
                      dispatch(asyncDeleteData());
                    }}
                  >
                    <ion-icon name="archive-sharp"></ion-icon>
                  </Button>
                </li>
              </ul>
              <div>
                <Drawer
                  title="listing of deleted expenses"
                  style={{
                    width: "100%",
                  }}
                  open={visible}
                  //body
                  // onClose={() => {
                  //   setVisible(false);
                  // }}
                  extra={
                    <Space>
                      <Button type="primary" size="small" onClick={onClose}>
                        OK
                      </Button>
                    </Space>
                  }
                >
                  <DeletedExpense />
                </Drawer>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <Home />
      </div>
    </>
  );
};

export default MenuPage;
