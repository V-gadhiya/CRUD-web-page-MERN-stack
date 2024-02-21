import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const User = () => {
  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/${userId}`)
      .then((responce) => {
        setUser((prev) => prev.filter((user) => user._id !== userId));
        toast.success(responce.data.msg, { position: "top-right" });
      })
      .catch((error) => console.log(error));
  };

  const [user, setUser] = useState([]);
  useEffect(() => {
    const fatchData = async () => {
      const responce = await axios.get("http://localhost:8000/api/getall");
      setUser(responce.data);
    };
    fatchData();
  }, []);
  return (
    <div className=" justify-center text-center items-center bg-white shadow-zinc-900 mx-12 rounded p-5">
      <Link
        className=" decoration-none bg-purple-600 hover:bg-purple-800  text-white font-medium shadow-lg border-2 p-2 rounded-md"
        to={"/add"}
      >
        Add user
      </Link>
      <table className="mx-auto mt-8 border-collapse w-[80%]">
        <thead>
          <tr>
            <th className="border-solid border-2 border-black">S.No</th>
            <th className="border-solid border-2 border-black">User Name</th>
            <th className="border-solid border-2 border-black">Email</th>
            <th className="border-solid border-2 border-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => {
            return (
              <tr key={user.id}>
                <td className="border-solid border-2 border-black">
                  {index + 1}
                </td>
                <td className="border-solid border-2 border-black">
                  {user.fname} {user.lname}
                </td>
                <td className="border-solid border-2 border-black">{user.email}</td>
                <td className="border-solid border-2 border-black">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="outline-none bg-red-600 cursor-pointer text-white px-3 py-2 my-1 mx-2 rounded"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <Link
                    className="outline-none bg-green-600 text-white px-3 py-2.5 my-1 mx-2 rounded"
                    to={`/edit/` + user._id}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
