import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { baseUrl } from "../../utils/baseUrl";

import { Header } from "../components";
import EditForm from "../components/EditForm";
import { useStateContext } from "../contexts/ContextProvider";

const Trips = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [createdInput, setCreatedInput] = useState([]);

  const { currentColor, currentMode } = useStateContext();
  const [fromState, setFromState] = useState("");
  const [toState, setToState] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState(0);
  const [dDate, setDDate] = useState("");
  const [dTime, setDTime] = useState("");
  const [editInfo, setEditInfo] = useState({
    from: "",
    destination: "",
    price: "",
    seatCount: 0,
    Date: "",
    time: "",
    id: "",
  });
  const [notDeleted, setNotDeleted] = useState(true);
  useEffect(() => {
    getTrips();
  }, [showEdit, notDeleted]);

  const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  function getTrips() {
    axios
      .get(`${baseUrl}/api/trips/read`)
      .then((res) => {
        let result = res["data"]["trips"]; 
        setCreatedInput(result);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(fromState, toState, price, seats, dDate, dTime);
    let formData = {
      from: fromState,
      destination: toState,
      price: price,
      seatCount: seats,
      date: dDate,
      time: dTime,
    };
    document.getElementById("trip-table").reset();
    setFromState("");
    setToState("");
    // const token = JSON.parse(localStorage.getItem('token'));
    // JSON.parse(localStorage.getItem('jwt'));
    setShowModal(false);

    // const config = {
    //   headers: {
    //     "Authorization": `Bearer ${token}`
    //   }
    // }

    // console.log(formData);
    // Axios code to call the api
    axios
      .post(`${baseUrl}/api/trips/create`, formData, config)
      .then((res) => {
        // console.log("the resss", res);
        if (res.status === 201) {
          //navigate(`${baseUrl}login`)
          let result = res["data"]["record"];
          setCreatedInput([result, ...createdInput]);
        }
      })
      .catch((err) => {
        console.log("ERR", err);
        // const theError = err['response']['data']['Error']
        // setRegisterError(theError);
      });
  };

  let routeState = [
    "Abia State",
    "Adamawa State",
    "Akwa Ibom State",
    "Anambra State",
    "Bauchi State",
    "Bayelsa State",
    "Benue State",
    "Borno State",
    "Cross River State",
    "Delta State",
    "Ebonyi State",
    "Edo State",
    "Ekiti State",
    "Enugu State",
    "Gombe State",
    "Imo State",
    "Jigawa State",
    "Kaduna State",
    "Kano State",
    "Katsina State",
    "Kebbi State",
    "Kogi State",
    "Kwara State",
    "Lagos State",
    "Nasarawa State",
    "Niger State",
    "Ogun State",
    "Ondo State",
    "Osun State",
    "Oyo State",
    "Plateau State",
    "Rivers State",
    "Sokoto State",
    "Taraba State",
    "Yobe State",
    "Zamfara State",
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between">
        <Header category="Page" title="New Trip" />
        <button
          onClick={() => setShowModal(true)}
          style={{ backgroundColor: currentColor }}
          type="button"
          className=" text-white font-bold py-2 h-14 px-4 rounded"
        >
          CREATE NEW TRIP
        </button>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              FROM
            </th>
            <th scope="col" className="py-3 px-6">
              {" "}
              TO
            </th>
            <th scope="col" className="py-3 px-6">
              PRICE{" "}
            </th>
            <th scope="col" className="py-3 px-6">
              DEPARTURE DATE
            </th>
            <th scope="col" className="py-3 px-6">
              DEPARTURE TIME
            </th>
            <th scope="col" className="py-3 px-6">
              AVAILABLE SEAT
            </th>
            <th scope="col" className="py-3 px-6"></th>
            <th scope="col" className="py-3 px-6"></th>
          </tr>
        </thead>

        <tbody>
          {createdInput.map((input) => {
            return (
              <tr
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={input.id}
              >
                <td className="p-4 w-4">{input.from}</td>
                <td className="py-4 px-6">{input.destination}</td>
                <td className="py-4 px-6">
                  <span>&#8358;</span> {input.price}
                </td>
                <td className="py-4 px-6">{input.date}</td>
                <td className="py-4 px-6">{input.time}</td>
                <td className="py-4 px-6">{input.seatCount}</td>
                <td>
                  <span
                    type="button"
                    className="font-medium cursor-pointer text-blue-600 dark:text-blue-500"
                    onClick={() => {
                      if ( window.confirm( "Are you sure you wish to delete this item?")) {
                        axios.delete( `${baseUrl}/api/trips/delete/${input.id}`, config)
                        .then((res) => {
                          if (res.status == 200) { 
                              setNotDeleted((prev) => !prev);
                            }
                          });
                      }
                    }}
                  >
                    DELETE
                  </span>
                </td>
                <td className="py-4 px-6">
                  {/* <!-- Modal toggle --> */}
                  <span
                    onClick={() => {
                      setShowEdit(true);
                      setEditInfo({
                        from: input.from,
                        destination: input.destination,
                        price: input.price,
                        seatCount: input.seatCount,
                        date: input.date,
                        time: input.time,
                        id: input.id,
                      });
                    }}
                    type="button"
                    className="font-medium cursor-pointer text-blue-600 dark:text-blue-500"
                  >
                    EDIT
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <div
          id="editUserModal"
          tabIndex="-1"
          className="bg-black bg-opacity-75 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center p-4 w-full md:inset-0 h-modal md:h-full flex"
          aria-modal="true"
          role="dialog"
        >
          {/* <!-- Modal content --> */}

          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                New Trip
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
            <div className="p-6 space-y-6">
              <form onSubmit={handleSubmit} id="trip-table">
                <div className="w-ull flex -mx-3 mb-6 mt-6">
                  {/* FROM  */}
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      FROM (Departure State)
                    </label>
                    <select
                      value={fromState}
                      onChange={(e) => setFromState(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      required
                    >
                      <option>Choose a State</option>
                      {routeState.map((val, index) => (
                        <option key={index}>{val}</option>
                      ))}
                    </select>
                  </div>

                  {/* TO */}
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      TO (Destination State)
                    </label>
                    <select
                      value={toState}
                      onChange={(e) => setToState(e.target.value)}
                      id="underline_select"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      required
                    >
                      <option>Choose a State</option>
                      {routeState.map((val, index) =>
                        fromState === val ? null : (
                          <option key={index}>{val}</option>
                        )
                      )}
                    </select>
                  </div>
                </div>
                <div className="w-full flex -mx-3 mb-6 mt-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Departure Date
                    </label>
                    <input
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDDate(e.target.value)}
                      required
                      style={{ backgroundColor: currentColor }}
                      type="date"
                      className="w-48 p-2 border-1 border-color rounded-md"
                    />
                  </div>

                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Departure Time
                    </label>
                    {/* <input type="text"
      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      placeholder="Select a date" />
    <label htmlFor="floatingInput" className="text-gray-700">Select a time</label> */}
                    <input
                      onChange={(e) => setDTime(e.target.value)}
                      required
                      style={{ backgroundColor: currentColor }}
                      type="time"
                      className="w-48 p-2 border-1 border-color rounded-md"
                    />
                  </div>

                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Total Available Seats
                    </label>
                    <input
                      onChange={(e) => setSeats(e.target.value)}
                      style={{ backgroundColor: currentColor }}
                      type="number"
                      placeholder="Enter route price"
                      id="underline_select"
                      className="w-48 p-2 border-1 border-color rounded-md"
                      required
                    ></input>
                  </div>

                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      PRICE
                    </label>
                    <div className="flex items-center">
                      <span className="mr-3">&#8358;</span>
                      <input
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        style={{ backgroundColor: currentColor }}
                        type="number"
                        className="w-48 p-2 border-1 border-color rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <button
                  style={{ backgroundColor: currentColor }}
                  type="submit"
                  className=" text-white font-bold py-2 px-4 rounded"
                >
                  CREATE
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {showEdit && (
        <EditForm
          editInfo={editInfo}
          showEditForm={setShowEdit}
          notDeleted={setNotDeleted}
        />
      )}
    </div>
  );
};
export default Trips;
