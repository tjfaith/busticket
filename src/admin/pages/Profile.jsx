import React, { useState } from "react";
import { Header } from "../components";
import { useSnackbar } from "react-simple-snackbar";
import { AiOutlineDown } from "react-icons/ai";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import swal from "sweetalert";

const adminData = JSON.parse(localStorage.getItem("admin"));

console.log(adminData);
const Profile = () => {
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const [fullname, setFullname] = useState(adminData.fullname);
  const [email, setEmail] = useState(adminData.email);
  const [phone, setPhone] = useState(adminData.phone);
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const checkPassword = () => {
    if (password === cPassword) {
        updateProfile({password});
        swal("Success!", "Profile updated successfully", "success");
    } else {
        openSnackbar("Password doesn't match");
      
    }
  };

  const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //   UPDATE PROFILE
  const updateProfile = (formData) => { 
    console.log(phone);
    axios
      .patch(`${baseUrl}/api/admin/update/${adminData.id}`, formData, config)
      .then(function (response) {
        console.log(response.data);
        if (response.data.message == "You have successfully updated admin") {
          swal("Success!", "Profile updated successfully", "success");
          window.location.reload();
          localStorage.setItem("admin", JSON.stringify(response.data.record));
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Profile" />
      <div className="h-screen font-sans login bg-cover">
        <form
          onSubmit={(e)=>(e.preventDefault(), updateProfile({ fullname, email, phone }))}
          className="max-w-full p-5  bg-white text-black bg-opacity-75"
        >
          <div className="mt-2">
            <label className="block text-sm" htmlFor="fullname">
              Full Name
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="text"
              name="fullname"
              placeholder="Admin Fullname"
              aria-label="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          <div className="mt-2">
            <label className="block text-sm" htmlFor="email">
              E-mail
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="email"
              id="email"
              name="email"
              placeholder="Admin E-mail"
              aria-label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-2">
            <label className="block text-sm" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="telephone"
              id="phone"
              placeholder="Admin Phone Number"
              name="phone"
              aria-label="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mt-4 items-center flex space-x-4">
            <button
              className="px-4 text-white py-1 font-light tracking-wider bg-green-900 hover:bg-gray-800 rounded"
              type="submit"
            >
              Update Profile
            </button>

            <button
              className="px-4 text-white py-1 font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
              type="button"
            >
              Update Image
            </button>
          </div>
        </form>
        <hr className="my-10" />

        <div className="mt-10 p-5 ">
          <button
            className="flex items-center cursor-pointer"
            onClick={() => setIsDisabled(!isDisabled)}
          >
            <span>Change Password</span> <AiOutlineDown />
          </button>
          {isDisabled && (
            <div className="mt-5">
              <label className="block  text-sm ">Password</label>

              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                type="password"
                id="password"
                name="password"
                minLength="8"
                placeholder="Password"
                arial-label="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label className="block mt-5  text-sm ">Confirm Password</label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                minLength="8"
                placeholder="confirm Password"
                arial-label="confirmPassword"
                value={cPassword}
                onChange={(e) => setcPassword(e.target.value)}
                required
              />

              <button
                className="px-4 mt-5 text-white py-1 font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                type="button"
                onClick={checkPassword}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
