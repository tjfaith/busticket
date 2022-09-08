import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import swal from 'sweetalert';

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

const LoginImage = (s) => {
  const [image, setImage] = useState("");
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
 
    setImage(imageSrc);
  });

  const handleSubmit = () => {

    const imageData = {
      image: image,
      subject_id: "admin",
      gallery_name: "busBooking",
      selector: "liveness",
    };
    axios
      .post("https://api.kairos.com/recognize", imageData, {
        headers: {
          "Content-Type": "application/json",
          app_id: "444b2604",
          app_key: "54f271c863c961229940d707a218fc3f",
        },
      })
      .then(function (response) {
        console.log(JSON.stringify(response.data, null, " "));
        try {
          if (response.data.images[0].transaction.status == "success") {
            console.log('@44',response.data.images[0].transaction.face_id)
        const newValue = {face_id: response.data.images[0].transaction.face_id}

            axios.post(`${baseUrl}/api/admin/imageLogin`, newValue, {
              headers: {
                "Content-Type": "application/json",
              },
            }).then(function (response) {
              console.log(response.data.message);
              if (response.data.message == "Login successful") {
                localStorage.setItem("token", JSON.stringify(response.data.token))
                localStorage.setItem("admin", JSON.stringify(response.data.User))
                window.location.href = "/admin/" 
              }
            }).catch(function (err) {
              console.log(err);
        swal("Oops!", "An error has occurred", "error");

            });
            // window.location.href = "/admin/";
          
          }else if(response.data.images[0].transaction.status == "failure"){
            swal("Unauthorized!", "Invalid user, authentication failed", "info");
          }
        } catch (error) {
          console.log(error);
        swal("Oops!",response.data.Errors[0].Message, "error");

        }
      })
      .catch(function (err) {
        console.log(err);
        swal("Oops!", "An error has occurred", "error");
        
      });

    // console.log(image)
  };

  return (
    <div className="max-w-full m-4  bg-white text-black bg-opacity-75 flex flex-wrap justify-center rounded shadow-xl">
      <div className="flex flex-col justify-center m-10">
        <div className="object-cover h-96 w-full bg-black rounded-full">
          {image == "" ? (
            <Webcam
              className="w-full h-full bg-black rounded-full"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          ) : (
            <img className="w-full h-full bg-black rounded-full" src={image} />
          )}
        </div>
        <div className="flex justify-center mt-10 items-center">
          {image != "" ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setImage("");
              }}
              className="bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Retake Image
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Capture
            </button>
          )}
          {image != "" && (
            <button
              className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => handleSubmit()}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginImage;
