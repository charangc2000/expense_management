import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Modal, Image } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncSetImage,
  asyncUpdateImage,
  asyncGetImage,
} from "../actions/imageAction";
import { removeAccount } from "../actions/userAction";

//FROM STYLES
import "./../styles/general.css";
import "./../styles/Profile.css";

const Profile = (props) => {
  const { user, profile } = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncGetImage());
  }, [dispatch]);

  const [file, setFile] = useState("");

  const [open, setOpen] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleUpdateClick = () => {
    setOpen(true);
  };

  const onOk = () => {
    const id = profile._id;
    const formData = new FormData();
    formData.append("profile", file);
    if (Object.keys(profile).length > 0) {
      dispatch(asyncUpdateImage(id, formData));
    } else {
      dispatch(asyncSetImage(formData));
    }
    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <div className="container main-container">
      <div className="back-link">
        <Link className="nav-link" to="/home">
          &larr; Back
        </Link>
      </div>
      <div className="profile-container">
        <div>
          <div className="profile-text">
            <h2 className="main-heading">Account Information</h2>
            {Object.keys(profile).length > 0 ? (
              <Image
                className="profile-img"
                width={400}
                src={`http://localhost:3333/profile/${profile.image}`}
              />
            ) : (
              <Avatar size={200} icon={<UserOutlined />} />
            )}
            <p>
              <strong>Name:</strong>
              {user.username}
            </p>
            <p>
              <strong>Email:</strong>
              {user.email}
            </p>
            <p>
              <strong>Time of Creation:</strong>
              {user.createdAt}
            </p>
            <div className="setting-btn">
              {Object.keys(profile).length > 0 ? (
                <Button
                  size="small"
                  className="button-two"
                  onClick={handleUpdateClick}
                >
                  Update Profile
                </Button>
              ) : (
                <Button
                  size="small"
                  className="button-two"
                  onClick={handleAddClick}
                >
                  Add Profile
                </Button>
              )}
              <Button
                size="small"
                className="button-two"
                onClick={() => {
                  Swal.fire("you successfully loggedOut...!!!");
                  dispatch(removeAccount());
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                Sign-Out
              </Button>
            </div>
          </div>
          <Modal
            title="Profile-Information"
            open={open}
            onOk={onOk}
            onCancel={onCancel}
          >
            <input type="file" name="file" onChange={handleFileChange} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Profile;
