import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BusRoutes from "./BusRoutes";
import axios from "axios";
import PassengerInfo from "./PassengerInfo";
import { baseUrl } from "../../utils/baseUrl";
import useFetch from "../../admin/data/useFetch";
import NoTrip from "../../Components/ErrorMessage/NoTrip";


const Booking = () => {
  const navigate = useNavigate();
  const [fromState, setFromState] = useState("");
  const [toState, setToState] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [showBusRoutes, setShowBusRoutes] = useState(true);
  const [showPassengerInfo, setShowPassengerInfo] = useState(false);
  const [bookData, setBookData] = useState({});
  const [data, setData] = useState([]);
  const [watchData, setWatchData] = useState(false);
  const [madeRequest, setMadeRequest] = useState(false);

  // GET ROUTS FROM SERVER
  const { result, errorMessage } = useFetch('trips/read', watchData);
  let from = [... new Set(result.trips?.map((trip) => trip.from))]
  const destination = [... new Set(result.trips?.map((trip) => trip.destination))]


  const toggleRoutes = () => {
    setShowBusRoutes(!showBusRoutes)
    setShowPassengerInfo(!showPassengerInfo)
  }

  const hideChildren = () => {
    setShowBusRoutes(false)
    setShowPassengerInfo(false)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      from: fromState,
      destination: toState,
      date: departureDate,
    };

    axios
      .post(`${baseUrl}/api/trips/read-day`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        if (response.data.message == "Retrieved required trips successfully") {
          // console.log(response.data.trips)
          setData(response.data.trips);
          setShowBusRoutes(true)
          setShowPassengerInfo(false)
          if (response.data.trips.length === 0) { setMadeRequest(true) }
          else { setMadeRequest(false) }
        }
        // console.log(JSON.stringify(response, null, " "));
      }).catch(err => console.log(err))

  };
  return (
    <div className='mx-16 mt-10'>
      <div className='overflow-x-auto relative'>
        {/* SEARCH FOR ROUTES */}
        <form className='mt-5 ' onSubmit={handleSubmit}>
          <div className='grid md:grid-cols-4 md:gap-6 place-items-end'>
            <div className='relative z-0 mb-4 w-full group'>
              <label
                htmlFor='countries'
                className='block mb-2 text-sm font-medium'
              >
                TRAVELING FROM
              </label>
              <select
                required
                value={fromState}
                onChange={(e) => setFromState(e.target.value)}
                id='countries'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option>Choose a state</option>
                {from.map((states, index) => (
                  <option key={index}>{states}</option>
                ))}
              </select>
            </div>
            <div className='relative z-0 mb-4 w-full group'>
              <label
                htmlFor='countries'
                className='block mb-2 text-sm font-medium'
              >
                TRAVELING TO
              </label>
              <select
                required
                value={toState}
                onChange={(e) => setToState(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option>Choose a state</option>
                {destination.map((states, index) =>
                  fromState === states ? null : (
                    <option key={index}>{states}</option>
                  )
                )}
              </select>
            </div>
            <div className='relative z-0 mb-4 w-full group'>
              <label
                htmlFor='countries'
                className='block mb-2 text-sm font-medium'
              >
                DEPARTURE DATE
              </label>
              <input
                required
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                type='date'
                min={new Date().toISOString().split("T")[0]}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              ></input>
            </div>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4 h-12'
            >
              Search Trip
            </button>
            {/* <button
            onClick={todayTrip}
              type='button'
              className='text-white bg-slate-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4 h-12'
            >
              ALL TODAY TRIPS
            </button> */}
          </div>

          <hr />
        </form>

        {madeRequest && <NoTrip />}
        {showBusRoutes && <BusRoutes data={data} toggleRoutes={toggleRoutes} setBookData={setBookData} />}
        {showPassengerInfo && <PassengerInfo hideChildren={hideChildren} setBookData={setBookData} bookData={bookData} />}
        {!showBusRoutes && !showPassengerInfo && <div style={{ minHeight: "80vh" }}></div>}
      </div>
    </div>
  );
};

export default Booking;
