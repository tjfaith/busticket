import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { baseUrl } from "../../utils/baseUrl";
import { useStateContext } from "../contexts/ContextProvider";

const EditForm = (props) => {
    console.log("THE PRR", props)
    const [fromState, setFromState] = useState(props.editInfo.from);
    const [toState, setToState] = useState(props.editInfo.destination);
    const { currentColor, currentMode } = useStateContext();
    const [price, setPrice] = useState(props.editInfo.price);
    const [seats, setSeats] = useState(props.editInfo.seatCount);
    const [dDate, setDDate] = useState(props.editInfo.date);
    const [dTime, setDTime] = useState(props.editInfo.time);
    const [edited, setEdited] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = {
            from: fromState,
            destination: toState,
            price: price,
            seatCount: seats,
            date: dDate,
            time: dTime

        }
        document.getElementById("trip-table").reset();
        setFromState("");
        setToState("");
        // alert("update successful")
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        // Axios code to call the api
        axios.patch(`${baseUrl}/api/trips/update/${props.editInfo.id}`, formData, config)
            .then((res) => {
                console.log('the resss', res)
                if (res.status === 200) {
                    let result = res['data']['record'];
                    props.notDeleted(prev => !prev);
                }
            }).catch((err) => {
                console.log('ERR', err)
                // const theError = err['response']['data']['Error']
                // setRegisterError(theError);
            })
        props.showEditForm(false)

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
                        Update Trip
                    </h3>
                    <button
                        onClick={() => props.showEditForm(false)}
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
                                    value={dDate}
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
                                <input
                                    value={dTime}
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
                                    value={seats}
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
                                        value={price}
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
                            UPDATE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditForm