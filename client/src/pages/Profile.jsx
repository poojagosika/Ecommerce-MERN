import React from "react";
import { Link } from "react-router-dom";
import { ContextStore } from "../Context/StoreContext.jsx";

const Profile = () => {
  const { allUserData } = ContextStore();
  return (
    <div className="container m-4">
      <div className="card">
        <div className="card-header">Profile Details</div>
        <div className="card-body">
          <h5 className="card-title">First Name: {allUserData.firstName}</h5>
          <h5 className="card-title">Last Name: {allUserData.lastName}</h5>
          <h5 className="card-title">Email: {allUserData.email}</h5>
          <h5 className="card-title">Phone Number: +91 {allUserData.phone}</h5>
          <h5 className="card-title">Address: {allUserData.address}</h5>
          <h5 className="card-title">Gender: {allUserData.gender}</h5>
          <h5 className="card-title">Role: {allUserData.role}</h5>
          <Link className="btn btn-warning" to={"/updateprofile"}>
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
