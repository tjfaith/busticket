import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { EnrollImage } from "../components";
import { useSnackbar } from "react-simple-snackbar";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
let auth = localStorage.getItem("token");

const styles = {
  backgroundImage:
    "url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzfGVufDB8fDB8fA%3D%3D&w=1000&q=80)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const [recValue, setRecValue] = useState({});

  const checkPassword = () => {
    if (password === cPassword) {
      return true;
    } else {
      return false;
    }
  };
  // CHECK IF USER EMAIL ALREADY EXIST
  const checkEmail = (email) => {
    const newValue = { fullname, phone, email, password };
    axios
      .get(`${baseUrl}/api/admin/checkemail/${email}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {

        if (response.data.message == "record found") {
          swal("Oops!", "User with email already exist", "info");
          return false;
        } else if (response.data.message == "record not found") {
          setRecValue(newValue);
          setShowImage(true);
        }
      })
      .catch(function (err) {
        console.log(err.response.data.message);
        // swal("Oops!", err.response.data.message, "info");
        if (err.response.data.message == "record not found") {
                  setRecValue(newValue);
                  setShowImage(true);
        }
        // return err.response.data.message;
      });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (checkPassword()) {
      if (checkEmail(email)) {
        console.log(checkEmail(email));
      }
    } else {
      openSnackbar("Password doesn't match");
    }
  };

  if (auth) {
    return <Navigate to="/admin/" />;
  }
  return (
    <div className="h-screen font-sans login bg-cover" style={styles}>
      <div className="container mx-auto h-full flex flex-1 justify-center items-center">
        <div className="w-full max-w-lg">
          <div className="leading-loose">
            {!showImage ? (
              <form
                onSubmit={submitForm}
                className="max-w-full m-4 p-10 bg-white text-black bg-opacity-75 rounded shadow-xl"
              >
                <p className=" font-medium text-center text-lg font-bold">
                  Admin Sign up
                </p>
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

                <div className="mt-2">
                  <label className="block  text-sm">Password</label>
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
                </div>

                <div className="mt-2">
                  <label className="block  text-sm ">Confirm Password</label>
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
                </div>
                <div className="mt-4 items-center flex justify-between">
                  <button
                    className="px-4 text-white py-1 font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                    type="submit"
                  >
                    Next
                  </button>
                  <Link
                    className="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-red-400"
                    to="/admin/login"
                  >
                    Login
                  </Link>
                </div>
              </form>
            ) : (
              <div className="max-w-full m-4  bg-white text-black bg-opacity-75 flex flex-wrap justify-center rounded shadow-xl">
                <div className="w-full bg-blue-600 text-white h-14 text-xl uppercase font-black flex items-center justify-center">
                  <h1>Face Enrollment</h1>
                </div>
                <hr />
                <EnrollImage data={recValue} />
                <div
                  className="w-full text-center mb-4 cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={() => setShowImage(false)}
                >
                  Previous
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;
