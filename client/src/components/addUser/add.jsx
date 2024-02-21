import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Add = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const inputHandle = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (user.fname === "") {
      alert("Please Enter Firstname");
      return;
    } else if (user.lname === "") {
      alert("Please Enter Lastname");
      return;
    } else if (user.email === "") {
      alert("Please Enter Email");
      return;
    } else if (user.password === "") {
      alert("Please Enter Password");
      return;
    }

    await axios
      .post("http://localhost:8000/api/create", user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addfirst">
      <Link
        className=" decoration-none bg-purple-600 hover:bg-purple-800  text-white font-medium shadow-lg border-2 p-2 px-2 rounded-md"
        to="/"
      >
        Back
      </Link>
      <h1 className=" font-bold text-3xl mt-3">Add New User</h1>
      <form className="adduser mt-5" onSubmit={submitForm}>
        <div className="adddiv">
          <label className="" htmlFor="fname">
            First Name
          </label>
          <input
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First Name"
            onChange={inputHandle}
          />
        </div>
        <div className="adddiv">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last Name"
            onChange={inputHandle}
          />
        </div>
        <div className="adddiv">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            onChange={inputHandle}
          />
        </div>
        <div className="adddiv">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
            onChange={inputHandle}
          />
        </div>
        <div>
          <button
            className=" outline-none bg-purple-700 text-white text-xl p-3 w-full mt-4 rounded cursor-pointer"
            type="submit"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
