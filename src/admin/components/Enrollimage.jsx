import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import swal from "sweetalert";

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

const Enrollimage = (props) => {
  const [image, setImage] = useState("");
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  });

  const imageData = {
    image: image,
    subject_id: "admin",
    gallery_name: "busBooking",
    selector: "liveness",
  };

  const headers = {
    "Content-Type": "application/json",
    app_id: "444b2604",
    app_key: "54f271c863c961229940d707a218fc3f",
  };

  // SAVE TO MY LOCAL DATABASE
  const saveToLocal = (data) => {
    axios
      .post(`${baseUrl}/api/admin/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        if (response.data.message == "registered successfully") {
          swal("Successful", response.data.message, "success");
          window.location.href = "/admin/login";
        }
      })
      .catch(function (err) {
        console.log(err);
        swal("Oops!", err.response.data.message, "info");
      });
  };

  // CHECK IF USER EMAIL ALREADY EXIST
  const checkEmail = (email) => {
    axios
      .get(`${baseUrl}/api/admin/checkemail/${email}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) { 
        if (response.data.message == "record found") {
          swal("Oops!", response.data.message, "info");
          return 1;
        } else if (response.data.message == "record not found") {
          enrollImage( imageData, headers);
        }
      })
      .catch(function (err) {
        // console.log(err.response.data.message);
        // swal("Oops!", err.response.data.message, "info");
        if(err.response.data.message == "record not found"){
          enrollImage( imageData, headers);
        }
        // return err.response.data.message;
      });
  };

  // ENROLL IMAGE TO FACE API
  const enrollImage = (imageData, headers) => {
    axios
      .post("https://api.kairos.com/enroll", imageData, { headers })
      .then((response) => {
        let data = JSON.stringify({
          email: props.data.email,
          password: props.data.password,
          fullname: props.data.fullname,
          phone: props.data.phone,
          image: image,
          face_id: response.data.face_id,
        }); 
        // console.log(response.data.images[0].transaction.face_id); 
        console.log(data)
        // console.log(data);
        // console.log(data.face_id =response.data.face_id);
        saveToLocal(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {

    axios
      .post("https://api.kairos.com/recognize", imageData, { headers })
      .then(function (response) {
        // console.log(JSON.stringify(response.data, null, " "));
        try {
          let status = response.data.images[0].transaction.status;

          if (status === "failure") {  
            let userEmail = checkEmail(props.data.email); 
            if (userEmail === 0) {
              enrollImage( imageData, headers);
            }
          } else if (status === "success") {
            swal("Oops!", "User already registered", "info");
          }
        } catch (error) {
          if (response.data.Errors[0].Message == "gallery name not found") {
            enrollImage( imageData, headers);
          }
          return 0;
        }
      })

      .catch(function (err) {
        console.log(err);
        swal("Oops!", "An error has occurred", "error");

        return 0;
      });
  };

  return (
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
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Enrollimage;
