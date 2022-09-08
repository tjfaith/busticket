import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai"; 
import { useSnackbar } from "react-simple-snackbar";
import { baseUrl } from "../../utils/baseUrl";


const Print = () => {
  let printContents = document.getElementById("ticket").innerHTML;
  let originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
};

const PrintTicket = () => {
  const [bookingData, setBookingData] = useState({});
  const [bookingId, setBookingId] = useState("");
  const [showTicket, setShowTicket] = useState(false);
  const [openSnackbar, closeSnackbar] = useSnackbar();


    const confirmTicket = () => {
        axios.get(`${baseUrl}/api/bookedtrips/read/${bookingId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(function (response) {
            console.log(response.data.trip);
            if(response.data.message == "successfully gotten single Bookedtrip"){
                setBookingData(response.data);
                setShowTicket(true);
            }                
           
        }
        ).catch(function (error) {
            openSnackbar("Booked Data not found");
        }
        )
    }

  return (
    <div style={{ minHeight: "80vh" }} className="mx-16 mt-10">
     
      <hr />
      {!showTicket &&(<div className=" bg-gray-200">
    <div className="container h-screen flex justify-center items-center">
        <div className="relative">
            <div className="absolute top-4 left-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div> 
            <input type="text" value={bookingId} onChange={(e)=>setBookingId(e.target.value)} className="h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none" placeholder="Booking ID" />
            <div className="absolute top-2 right-2"> <button onClick={confirmTicket} className="h-10 w-20 text-white rounded-lg bg-red-500 hover:bg-red-600">Access</button> </div>
        </div>
    </div>
</div>)}
      {showTicket && (
        <div className="mt-5">
             <button
        type="button"
        className="bg-blue-800 w-48 mb-5 flex items-center justify-around hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={Print}
      >
        Print <AiFillPrinter />
      </button>
          <div className="w-64 shadow-lg" id="ticket">
            <div className="bg-blue-800 p-4 text-white text-center">
              <h2 className="font-extrabold">TRIP TICKET</h2>
              <hr />
              <h3>
                Ticket number:
                <br />
               {bookingData.trip.id}
              </h3>
            </div>
            <div className="p-4">
              <div className="font-semibold">TRIP ID</div>
              <div className="mb-3">{bookingData.trip.tripId}</div>
              <h3 className="text-blue-900 font-bold">Departure</h3>
              <div className="text-gray-500 mt-2 text-sm">
                <div className="font-semibold">Departing</div>
                <div>{bookingData.trip.available_trips.from}</div>
                <div>{bookingData.trip.available_trips.date} - {bookingData.trip.available_trips.time}</div>
                <hr className="mt-3" />
                <div className="font-semibold mt-3">Arrival</div>
                <div>{bookingData.trip.available_trips.destination}</div>
                <hr className="mt-3" />
              </div>

              <div className="text-gray-500 my-3 text-sm">
                <div className="font-semibold">Passenger Details</div>
                <div>
                  Full Name: <span>{bookingData.trip.passenger_name}</span>
                </div>
                <div>
                  Email: <span>{bookingData.trip.passenger_email}</span>
                </div>
                <div className="font-semibold text-2xl ">
                  Seat Number : <span>{bookingData.trip.seat_number}</span>
                </div>
              </div>
              <hr />
              <div className="font-semibold mt-3">Ticket Status: {bookingData.trip.booking_status}</div>
              <div className="text-md font-body">Payment Status: {bookingData.trip.payment_status}</div>
              <div className="text-md font-body">
                Amount:  
                  <span> &#8358;</span>{bookingData.trip.available_trips.price}

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintTicket;
