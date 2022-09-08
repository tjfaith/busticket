import React from "react";
import './Ticket.scss';  



const Ticket = ({bookingData}) => {
  return (
      <div className="w-64 shadow-lg" id="ticket">
    <div className="bg-blue-800 p-4 text-white text-center">
      <h2 className="font-extrabold">TRIP TICKET</h2>
      <hr />
      <h3>
        Ticket number:
        <br />
       {bookingData.id}
      </h3>
    </div>
    <div className="p-4 bg-white">
      <div className="font-semibold">TRIP ID</div>
      <div className="mb-3">{bookingData.tripId}</div>
      <h3 className="text-blue-900 font-bold">Departure</h3>
      <div className="text-gray-500 mt-2 text-sm">
        <div className="font-semibold">Departing</div>
        <div>{bookingData.available_trips.from}</div>
        <div>{bookingData.available_trips.date} - {bookingData.available_trips.time}</div>
        <hr className="mt-3" />
        <div className="font-semibold mt-3">Arrival</div>
        <div>{bookingData.available_trips.destination}</div>
        <hr className="mt-3" />
      </div>

      <div className="text-gray-500 my-3 text-sm">
        <div className="font-semibold">Passenger Details</div>
        <div>
          Full Name: <span>{bookingData.passenger_name}</span>
        </div>
        <div>
          Email: <span>{bookingData.passenger_email}</span>
        </div>
        <div className="font-semibold text-2xl ">
          Seat Number : <span>{bookingData.seat_number}</span>
        </div>
      </div>
      <hr />
      <div className="font-semibold mt-3">Ticket Status: {bookingData.booking_status}</div>
      <div className="text-md font-body">Payment Status: {bookingData.payment_status}</div>
      <div className="text-md font-body">
        Amount:  
          <span> &#8358;</span>{bookingData.available_trips.price}

      </div>
    </div>
  </div>
  );
};

export default Ticket;
