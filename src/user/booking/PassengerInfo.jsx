import axios from "axios";
import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useSnackbar } from "react-simple-snackbar";
import { baseUrl } from "../../utils/baseUrl";

const PassengerInfo = ({ bookData, setBookData, hideChildren }) => {
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const navigate = useNavigate();

  const componentProps = {
    email: bookData.passenger_email,
    amount: bookData.price * 100,
    metadata: {
      name: bookData.passenger_name,
      phone: bookData.passenger_phone,
    },
    publicKey: "pk_test_2978dab69d89f9280f457a9d8b9dfa4fbb572f8a",
    text: "Pay Now",
    onSuccess: () => {
      book_ticket();
    },
    onClose: () => {
      openSnackbar("Transaction Cancelled");
    },
  }; 
  const send_email = (id) => {
    axios
    .post(`${baseUrl}/api/mail`, {
      to: bookData.passenger_email, 
      subject : "EXPRESS TRAVELS BOOKINGS",
      text : "Your ticket has been booked successfully. Thanks for your patronage",
      html: `<h1>Click the bellow link to download your ticket</h1><p>This is your Booking Id: ${id}</p><br><a href="http://127.0.0.1:5173/booking/ticket">Download Ticket</a>`,
     }, 
     {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  }

  const book_ticket = () => {
    // e.preventDefault()
    setBookData((bookData.payment_status = "PAID"));
    setBookData((bookData.booking_status = "ACTIVE"));

    let formData = {
      tripId: bookData.id,
      passenger_name: bookData.passenger_name,
      passenger_phone: bookData.passenger_phone,
      passenger_email: bookData.passenger_email,
      payment_status: bookData.payment_status,
      booking_status: bookData.booking_status,
      seat_number: bookData.bookingCount + 1,
      bookingCount: bookData.bookingCount + 1,
    };
   

    axios
      .post(`${baseUrl}/api/bookedtrips/create`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (trip) {
        console.log(trip.data);
        swal( "Success", "Ticket Booked Successfully, CHECK YOUR EMAIL BOX FOR MORE DETAILS, YOU MIGHT NEED TO CHECK YOUR SPAM BOX IF YOU CANT FIND EMAIL IN YOUR INBOX. have a safe trip!", "success" );
        hideChildren();
        send_email(trip.data.record.id)
        // window.open(`/booking/ticket/${trip.data.record.id}`,'_blank')
        // navigate(`/booking/ticket/${trip.data.record.id}`, { replace: true });
      }) 
      .catch(function (err) {
        console.log(err);
        openSnackbar("An error has occurred");
      });
  };

  return (
    <div style={{ minHeight: "80vh" }} className="mt-10">
      <div className=" flex justify-between">
        {/* PASSENGER INFO */}
        <div className="w-full mr-4">
          <form className="w-full">
            <div className="bg-blue-800 p-4 text-white text-center">
              <h2>PERSONAL INFORMATION</h2>
            </div>
            <div className="shadow-lg p-5">
              {/* <form className="w-full "> */}
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Full Name
                  </label>
                  <input
                    value={bookData.passenger_name}
                    onChange={(e) =>
                      setBookData({
                        ...bookData,
                        passenger_name: e.target.value,
                      })
                    }
                    required
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Full Name"
                  />
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Email
                  </label>
                  <input
                    value={bookData.passenger_email}
                    onChange={(e) =>
                      setBookData({
                        ...bookData,
                        passenger_email: e.target.value,
                      })
                    }
                    required
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="email"
                    placeholder="Passenger E-mail"
                  />
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Phone Number
                  </label>
                  <input
                    value={bookData.passenger_phone}
                    onChange={(e) =>
                      setBookData({
                        ...bookData,
                        passenger_phone: e.target.value,
                      })
                    }
                    required
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="tel"
                    placeholder="Telephone Number"
                  />
                </div>
              </div>
              {/* </form> */}
            </div>
          </form>
          {/* PAYMENT*/}
          <div className="w-full mt-4">
            {bookData.passenger_email &&
              bookData.passenger_name &&
              bookData.passenger_phone && (
                <PaystackButton
                  {...componentProps}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                />
              )}
          </div>
        </div>

        <div className="w-64 shadow-lg">
          <div className="bg-blue-800 p-4 text-white text-center">
            <h2>YOUR TRIP SUMMARY</h2>
          </div>
          <div className="p-4">
            <div className="font-semibold">TRIP ID</div>
            <div className="mb-3">{bookData.id}</div>
            <h3 className="text-blue-900 font-bold">Departure</h3>
            <div className="text-gray-500 mt-2 text-sm">
              <div className="font-semibold">Departing</div>
              <div>{bookData.from}</div>
              <div>
                {bookData.date} - {bookData.time}
              </div>
              <hr className="mt-3" />
              <div className="font-semibold mt-3">Arrival</div>
              <div>{bookData.destination}</div>
              <hr className="mt-3" />
              <div className="font-semibold mt-3">Trip Cost</div>
              <div className="text-4xl font-body">
                <span>&#8358; </span>
                {bookData.price}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
