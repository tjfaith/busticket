import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { baseUrl } from "../../utils/baseUrl";
import { Header, Ticket } from "../components";
import swal from "sweetalert";

const Bookings = () => {
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState([]);
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    bookedTrips();
  }, []);

  function bookedTrips() {
    axios
      .get(`${baseUrl}/api/bookedtrips/read`)
      .then((res) => {
        if (res.status === 200) {
          let result = res["data"]["products"];
          setDetails(result);
        }
      })
      .catch(() => {});
  }

  const showDetails = (data) => {
    setBookingData(data);
    setShowModal(true);
  };

  const Print = () => {
    let printContents = document.getElementById("ticket").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const sendMail = () => {
    axios
      .post(
        `${baseUrl}/api/mail`,
        {
          to: bookingData.passenger_email,
          subject: "EXPRESS TRAVELS BOOKINGS",
          text: "Your ticket has been booked successfully. Thanks for your patronage",
          html: `<h1>Click the bellow link to download your ticket</h1><p>This is your Booking Id: ${bookingData.id}</p><br><a href="http://127.0.0.1:5173/booking/ticket">Download Ticket</a>`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.message == "email sent successfully") {
          swal("Successful", response.data.message, "success");
          setShowModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="m-2 mt-24 p-5 md:p-5 bg-white rounded-3xl">
      <Header category="Page" title="Trips Booking" />

      <div className="overflow-x-auto relative">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <div className="flex justify-between items-center py-4 bg-white dark:bg-gray-800"></div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Trip ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Passenger Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Passenger Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Booking Status
                </th>
                <th scope="col" className="py-3 px-6">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {details.map((trip) => {
                return (
                  <tr
                    key={trip.id}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4 w-4">{trip.id}</td>
                    <td className="py-4 px-6">{trip.tripId}</td>
                    <td className="py-4 px-6">{trip.passenger_name}</td>
                    <td className="py-4 px-6">{trip.passenger_email}</td>
                    <td className="py-4 px-6">{trip.booking_status}</td>
                    <td className="py-4 px-6">{trip.payment_status}</td>
                    <td className="py-4 px-6">
                      {/* <!-- Modal toggle --> */}
                      <span
                        onClick={() => showDetails(trip)}
                        type="button"
                        className="font-medium cursor-pointer text-blue-600 dark:text-blue-500"
                      >
                        View
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* <!-- Edit user modal --> */}
          {showModal && (
            <div
              id="editUserModal"
              tabIndex="-1"
              className="bg-black bg-opacity-75 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center p-4 w-full md:inset-0 h-modal md:h-full flex"
              aria-modal="true"
              role="dialog"
            >
              <div className="relative w-full max-w-2xl h-full md:h-auto">
                {/* <!-- Modal content --> */}
                <form
                  action="#"
                  className="relative  rounded-lg shadow dark:bg-gray-700"
                >
                  {/* <!-- Modal header --> */}
                  <div className="flex justify-center items-start p-4 rounded-t">
                    <h3 className="text-xl font-semibold text-white">
                      Passenger Ticket
                    </h3>
                    <button
                      onClick={() => setShowModal(false)}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="editUserModal"
                    >
                      <AiOutlineClose className="w-4 h-4" />
                    </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div className="flex justify-center">
                    <Ticket bookingData={bookingData} />
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div className="flex items-center justify-center p-6 space-x-2 rounded-b">
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={Print}
                    >
                      Print
                    </button>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={sendMail}
                    >
                      send as email
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
