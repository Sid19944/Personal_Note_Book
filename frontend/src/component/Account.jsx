import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getUser,
  updatePassword,
  updateUser,
} from "../store/slices/user.slice";
import { toast, ToastContainer } from "react-toastify";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PasswordIcon from "@mui/icons-material/Password";

import Loading from "../utils/Loading";

function Account() {
  const [active, setActive] = useState("updateProfile");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isUpdated, error, isAuthenticated, loading } = useSelector(
    (state) => state.user,
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [passData, setPassData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handlePassChange = (e) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    dispatch(updateUser(name, email));
  };

  const handleUpdatePassword = () => {
    dispatch(
      updatePassword(
        passData.currentPassword,
        passData.newPassword,
        passData.confirmPassword,
      ),
    );
  };

  useEffect(() => {
    if (isUpdated) {
      navigate("/");
    }
    if (!isAuthenticated) {
      dispatch(getUser());
    }
    setName(user.name);
    setEmail(user.email);
    if (error) {
      toast.error(error, { position: "bottom-left" });
    }
  }, [isAuthenticated, error, isUpdated]);

  return (
    <div className="h-screen flex justify-center p-1">
      <div className="w-full max-w-2xl ">
        <nav className="flex justify-around py-2 mb-4 border rounded-lg">
          <Link
            onClick={() => setActive("updateProfile")}
            className={`${active == "updateProfile" ? "text-blue-600 font-semibold" : ""}`}
          >
            Update <AccountBoxIcon />
          </Link>
          <Link
            onClick={() => setActive("updatePass")}
            className={`${active == "updatePass" ? "text-blue-600 font-semibold" : ""}`}
          >
            Update <PasswordIcon />
          </Link>
        </nav>

        {active == "updateProfile" && (
          <div className="mb-4">
            <div className="flex flex-col p-1 gap-2">
              <label htmlFor="name">Name</label>
              <input
                required
                type="text"
                id="name"
                name="name"
                className="border-l border-b hover:border-l-3 hover:border-b-3 active:border-l-3 active:border-b-3 hover:border-blue-600 active:border-blue-600 outline-none rounded-lg px-2 py-1"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col p-1 gap-2">
              <label htmlFor="email">Email</label>
              <input
                required
                type="email"
                id="email"
                name="email"
                className="border-l border-b hover:border-l-3 hover:border-b-3 active:border-l-3 active:border-b-3 hover:border-blue-600 active:border-blue-600 outline-none rounded-lg px-2 py-1"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        )}

        {active == "updatePass" && (
          <div className="mb-4">
            <div className="flex flex-col p-1 gap-2">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                required
                type="text"
                id="currentPassword"
                name="currentPassword"
                className="border-l border-b hover:border-l-3 hover:border-b-3 active:border-l-3 active:border-b-3 hover:border-blue-600 active:border-blue-600 outline-none rounded-lg px-2 py-1"
                defaultValue={passData.currentPassword}
                onChange={handlePassChange}
              />
            </div>
            <div className="flex flex-col p-1 gap-2">
              <label htmlFor="newPassword">New Password</label>
              <input
                required
                type="text"
                id="newPassword"
                name="newPassword"
                className="border-l border-b hover:border-l-3 hover:border-b-3 active:border-l-3 active:border-b-3 hover:border-blue-600 active:border-blue-600 outline-none rounded-lg px-2 py-1"
                defaultValue={passData.newPassword}
                onChange={handlePassChange}
              />
            </div>
            <div className="flex flex-col p-1 gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                required
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="border-l border-b hover:border-l-3 hover:border-b-3 active:border-l-3 active:border-b-3 hover:border-blue-600 active:border-blue-600 outline-none rounded-lg px-2 py-1"
                defaultValue={passData.confirmPassword}
                onChange={handlePassChange}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end">
          {active == "updateProfile" && (
            <Link
              onClick={handleUpdateProfile}
              className="outline-1 p-2 rounded-lg bg-blue-400 font-bold text-black"
            >
              Update
            </Link>
          )}

          {active == "updatePass" && (
            <Link
              onClick={handleUpdatePassword}
              className="outline-1 p-2 rounded-lg bg-blue-400 font-bold text-black"
            >
              Update
            </Link>
          )}
        </div>
      </div>
      <ToastContainer />
      {loading ? <Loading text="Loading..." /> : ""}
    </div>
  );
}

export default Account;
