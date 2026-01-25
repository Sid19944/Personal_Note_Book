import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { register } from "../../store/slices/user.slice.js";
import { useEffect } from "react";

function Register() {
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const {message,error} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(data.username, data.name, data.email, data.password));
    setData({
      username: "",
      name: "",
      email: "",
      password: "",
    });
  };

  useEffect(()=>{
    if(error){
      toast.error(error,{position : "bottom-left"})
    }
    if(message){
      toast.success(message,{position : "bottom-left"})
    }
  },[dispatch,error])

  return (
    <div className=" h-screen font-serif flex">
      <div className="w-full lg:w-1/2 flex justify-around items-center shadow-lg shadow-black">
        <form className=" rounded-lg w-[95%] md:w-4/5 lg:w-3/4 shadow-lg shadow-black">
          <h2 className="text-3xl font-semibold text-center m-6 ">Register</h2>
          <p className="text-center text-gray-500">Don't forgot Email ID</p>

          <div className="mb-6">
            <label htmlFor="username" className="font-semibold">
              username
            </label>
            <br />
            <input
              required
              type="username"
              id="username"
              placeholder="Enter username"
              className="border-b  focus:border-b-indigo-500 focus:border-b-3 focus:outline-hidden  p-3 w-full  invalid:border-red-500 invalid:ring-red-500"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="name" className="font-semibold ">
              Full Name
            </label>
            <br />
            <input
              required
              type="name"
              id="name"
              placeholder="Enter fullname"
              className=" border-b  focus:border-b-indigo-500 focus:border-b-3 focus:outline-hidden  p-3 w-full  invalid:border-red-500 invalid:ring-red-500"
              name="name"
              value={data.name}
              onChange={handleChange}
              minLength={8}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="font-semibold ">
              Email
            </label>
            <br />
            <input
              required
              type="email"
              id="email"
              placeholder="Enter Email ID"
              className=" border-b  focus:border-b-indigo-500 focus:border-b-3 focus:outline-hidden  p-3 w-full  invalid:border-red-500 invalid:ring-red-500"
              name="email"
              value={data.email}
              onChange={handleChange}
              minLength={8}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="font-semibold ">
              Password
            </label>
            <br />
            <input
              required
              type="password"
              id="password"
              placeholder="Enter password"
              className=" border-b  focus:border-b-indigo-500 focus:border-b-3 focus:outline-hidden  p-3 w-full  invalid:border-red-500 invalid:ring-red-500"
              name="password"
              value={data.password}
              onChange={handleChange}
              minLength={8}
            />
          </div>
          <div className="justify-self-end mb-2">
            <Link to={"/login"} className="text-blue-700  hover:underline">
              Already have a account
            </Link>
          </div>

          <button
            type="submit"
            // disabled={
            //   loading ||
            //   loginDate.email === "" ||
            //   loginDate.password === "" ||
            //   loginDate.password.length < 8
            // }
            onClick={handleSubmit}
            className="w-full block text-center bg-blue-400 font-semibold py-2 text-black hover:rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer disabled:cursor-not-allowed"
          >
            Register
            {/* {loading ? "" : <LoginIcon />} */}
          </button>
        </form>
      </div>

      <img
        src="/hero.png"
        alt="Image"
        className="lg:w-1/2 object-cover  hidden lg:block"
      />
      <ToastContainer />
      {/* {loading ? <Loading text="Logging..." /> : ""} */}
    </div>
  );
}

export default Register;
