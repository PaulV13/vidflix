import React from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

import "./ProfileScreen.css";

function ProfileScreen() {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_info">
          <img
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt=""
          />
          <div className="profileScreen_details">
            <h2>{user.email}</h2>
            <div className="profileScreen_plans">
              <h3>Plans</h3>
              <button
                onClick={() => {
                  auth.signOut();
                  history.push("/");
                }}
                className="profileScreen_signOut"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
