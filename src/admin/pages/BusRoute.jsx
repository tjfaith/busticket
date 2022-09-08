import React, { useState } from "react";
import { GrFormAdd, GrUpdate } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { Header } from "../components";

const BusRoute = () => {
  const [showModal, setShowModal] = useState(false);

  const [fromState, setFromState] = useState("");
  const [toState, setToState] = useState("");
  const [price, setPrice] = useState("");
  const handleCreate = (e) => {
    document.getElementById("route-form").reset();
    e.preventDefault();
    alert("Created");
    let routeData = {
      from: fromState,
      to: toState,
      price: price,
    };
    setPrice("");
    console.log(routeData);
  };

  const [uFromState, setUFromState] = useState("");
  const [uToState, setUToState] = useState("");
  const [uPrice, setUPrice] = useState("");
  const handleUpdate = (e) => {
    e.preventDefault();
    document.getElementById("route-form-update").reset();
    e.preventDefault();
    alert("Updated");
    let routeData = {
      from: fromState,
      to: toState,
      price: price,
    };
    setUPrice("");
    setShowModal(false);

    console.log(routeData);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    alert("Deleted");
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
      <Header category="Page" title="Routes" />

      {/* CREATE NEW ROUTE */}
      <form
        onSubmit={handleCreate}
        className="w-full flex -mx-3 mb-6"
        id="route-form"
      >
        {/* DEPARTURE */}
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

        {/* DESTINATION */}
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
            {routeState.map((val, index) => (
              (fromState === val)? null :<option key={index}>{val}</option>
            ))}
          </select>
        </div>

        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            PRICE
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Enter route price"
            id="underline_select"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            required
          ></input>
        </div>

        <button
          type="submit"
          className=" bg-slate-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          +
        </button>
      </form>

      {/* LIST OF ALL ROUTES */}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              FROM
            </th>
            <th scope="col" className="py-3 px-6">
              TO
            </th>
            <th scope="col" className="py-3 px-6">
              PRICE
            </th>
            <th scope="col" className="py-3 px-6"></th>
            <th scope="col" className="py-3 px-6"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4 w-4">LAGOS</td>
            <td className="py-4 px-6">ABUJA</td>
            <td className="py-4 px-6">
              <span>&#8358;</span> 3000
            </td>
            <td className="py-4 px-6">
              {/* <!-- Modal toggle --> */}
              <span
                onClick={handleDelete}
                type="button"
                className="font-medium cursor-pointer text-blue-600 dark:text-blue-500"
              >
                DELETE
              </span>
            </td>
            <td className="py-4 px-6">
              {/* <!-- Modal toggle --> */}
              <span
                onClick={() => setShowModal(true)}
                type="button"
                className="font-medium cursor-pointer text-blue-600 dark:text-blue-500"
              >
                EDIT
              </span>
            </td>
          </tr>
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
              id="route-form-update"
              onSubmit={handleUpdate}
              className="relative bg-white rounded-lg shadow dark:bg-gray-700"
            >
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Route
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
                <div className="w-full flex -mx-3 mb-6  ">
                  {/* DEPARTURE */}
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      FROM (Departure State)
                    </label>
                    <select
                      value={uFromState}
                      onChange={(e) => setUFromState(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option>Choose a State</option>
                      {routeState.map((val, index) => (
                        <option key={index}>{val}</option>
                      ))}
                    </select>
                  </div>

                  {/* DESTINATION */}
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      TO (Destination State)
                    </label>
                    <select
                      value={uToState}
                      onChange={(e) => setUToState(e.target.value)}
                      id="underline_select"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option>Choose a State</option>
                      {routeState.map((val, index) => (
                       (uFromState === val)? null :<option key={index}>{val}</option>

                      ))}
                    </select>
                  </div>

                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      PRICE
                    </label>
                    <input
                      value={uPrice}
                      onChange={(e) => setUPrice(e.target.value)}
                      type="number"
                      placeholder="Enter route price"
                      id="underline_select"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    ></input>
                  </div>

                  <button
                    type="submit"
                    className=" bg-slate-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <GrUpdate />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusRoute;
