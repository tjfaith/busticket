import React, { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"; 
import face from '../data/facelogin.png';
import {AiOutlineClose} from 'react-icons/ai';
import { LoginImage } from '../components';
import useFace from "../data/FaceApi";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import swal from 'sweetalert';
let auth = localStorage.getItem('token')


const styles = {
  backgroundImage: "url(https://content.jdmagicbox.com/comp/def_content/bus_ticketing_agents/default-bus-ticketing-agents-8.jpg?clr=3d2929)",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};



const AdminLogin = () => {
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [showImage, setShowImage] = useState(false);
  const [recValue, setRecValue] = useState([])


const checkPassword = () => {
  if(password === cPassword){
    return true
  }
  else{
    return false
  }
}

  const submitForm = (e) => {
    e.preventDefault();  
      const newValue = {email, password}

      axios.post(`${baseUrl}/api/admin/login`, newValue,{
        headers: {
          "Content-Type": "application/json",
          },
          }).then(function (response) {
            if (response.data.message == "Login successful"){ 

              localStorage.setItem("token", JSON.stringify(response.data.token))
              localStorage.setItem("admin", JSON.stringify(response.data.User))
              window.location.href = "/admin/"
            }
            else{ 
        swal("Oops!", response.data.message, "info");

            }
          })
          .catch(function (error) { 
            console.log(error);
            if(error.response.data.message == "Incorrect Email or password"){
        swal("Oops!", error.response.data.message, "info");
            }

          });
  

      // setRecValue([...recValue, newValue])
      // console.log(newValue)
  
  
  }
  if (auth) {
    return <Navigate to = "/admin/" />
  }
  return ( 
    <div
      className="h-screen font-sans login bg-cover" style={styles }  >
      <div className="container mx-auto h-full flex flex-1 justify-center items-center">
        <div className="w-full max-w-lg">
          <div className="leading-loose bg-white p-4">
           <form onSubmit={submitForm} className="max-w-full  p-10  text-black bg-opacity-75 rounded hover:shadow-xl">
              <p className=" font-medium text-center text-lg font-bold">
                Admin Login 
              </p>
              <div className="mt-2">
                <label className="block text-sm" htmlFor="username">
                  Email
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                  type="text"
                  id="username"
                  name="email"
                  placeholder="Admin Username"
                  aria-label="username"
                  value={email} onChange={(e) => setEmail(e.target.value)}
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
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div> 
              <div className="mt-4 items-center flex justify-between">
                <button
                  className="px-4 text-white py-1 font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                  type="submit"
                >
                  Login
                </button>
                <Link
                  className="inline-block right-0 align-baseline font-bold text-sm text-500 text-black hover:text-red-400"
                  to="/admin/signup"
                >
                  Signup
                </Link>
              </div>
            </form>
            
        
            <div className="flex flex-wrap divide-y justify-center w-full p-10">
              <div className="w-full text-center mb-4">Or</div>
            <img onClick={()=>setShowImage(true)}  className="cursor-pointer hover:shadow-xl pt-4 w-48" src={face} />
            </div>


            {/* face login modal */}

            {/* <!-- Modal toggle --> */}


{/* <!-- Main modal --> */}
{showImage && <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="bg-black bg-opacity-75 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex items-center">
    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto m-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <div className='w-full  text-black h-14 text-xl uppercase font-black flex items-center justify-center'>
            <h1>Face Login</h1>
            </div>
                <button type="button" onClick={()=>setShowImage(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <AiOutlineClose className="w-4 h-4" />
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6">
            <LoginImage />
            </div>
            {/* <!-- Modal footer --> */}
          
        </div>
    </div>
</div>}







          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
