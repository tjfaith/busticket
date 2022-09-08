import React, { useEffect, useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg'; 
import useFetch from '../data/useFetch';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Dashboard = () => {
  const { currentColor, currentMode } = useStateContext();
  const [ earningAmount, setEarningAmount ] = useState(0); 
  const [ bookingDate, setBookingDate ] = useState(new Date().toISOString().substring(0, 10));
  const [ bookingCountDate, setBookingCountDate ] = useState(new Date().toISOString().substring(0, 10));
  const [ bookingCount, setBookingCount ] = useState(0);
 const [watchData, setWatchData] = useState(true);
const [text, setText] = useState();

 const {result, errorMessage} = useFetch('bookedtrips/read' , watchData);


useEffect(() => {
  if (result) {
    setEarningAmount(
      result.products?.filter(item=>item.available_trips.date === bookingDate).reduce((acc, item) => acc + item.available_trips.price, 0)
    )

  }
}, [result, bookingDate]);


useEffect(() => {
  if (result) { 
    setBookingCount(result.products?.filter(item => item.available_trips.date === bookingCountDate).length);
  }
}, [result, bookingCountDate]);

  

  return (
    <div className="mt-10 min-h-full">
      {/* TOP ROW ============== */}

      <div className="flex flex-wrap  justify-start ">
      <div
            className=" rounded-2xl  p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >

            <div className="flex flex-col items-center ">
              <div className="font-semibold text-white text-2xl">
                <span>Earnings for </span>
              <input  value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} onClick={(e) => setBookingDate(e.target.value)}   style={{ backgroundColor: currentColor }} type="date" className="w-48 p-2 border-1 border-color rounded-md"/>            
              </div>
              <div className="text-6xl text-white font-semibold">
                <span><span>&#8358;</span>{earningAmount}</span>
              </div>
            </div>

          </div>

          <div
            className=" rounded-2xl  p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex flex-col items-center ">
              <div className="font-semibold text-white text-2xl">
                <span>Total booked for </span>
              <input value={bookingCountDate} onChange={(e) => setBookingCountDate(e.target.value)} onClick={(e) => setBookingCountDate(e.target.value)} style={{ backgroundColor: currentColor }} type="date" className="w-48 p-2 border-1 border-color rounded-md"/>            
              </div>
              <div className="text-6xl text-white font-semibold">
                <span>{bookingCount}</span>
              </div>
            </div>

          </div>

          {/* <div
            className=" rounded-2xl  p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex flex-col items-center ">
              <div className="font-semibold text-white text-2xl">
                <span>Total Available Trips </span>
                     
              </div>
              <div className="text-6xl text-white font-semibold">
                <span>48</span>
              </div>
            </div>

          </div> */}

      </div>

    

      <div className="flex flex-wrap justify-start">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Active Booking</p>

          </div>
 
      <div className="mt-10 ">
           



              <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="py-3 px-6">
                              Ticket Id
                          </th>
                          <th scope="col" className="py-3 px-6">
                              Passenger Name
                          </th>
                          <th scope="col" className="py-3 px-6">
                              Time of Booking
                          </th>
                          <th scope="col" className="py-3 px-6">
                              Trip Date
                          </th>
                          <th scope="col" className="py-3 px-6">
                              From
                          </th>
                          <th scope="col" className="py-3 px-6">
                              Destination
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                  {result.products?.filter(item => item.booking_status === "ACTIVE").map((item) => (
                      <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {item.id}
                          </th>
                          <td className="py-4 px-6">
                             {item.passenger_name}
                          </td>
                          <td className="py-4 px-6">
                            {/* { item.createdAt.toLocaleString('en-US', { hour: 'numeric', hour12: true }) */}
                              {item.createdAt.substring(0, 10) + " " + item.createdAt.substring(11, 19)}
                          </td>
                          <td className="py-4 px-6">
                              {item.available_trips.date}
                          </td>
                          <td className="py-4 px-6 text-right">
                              {item.available_trips.from}
                          </td>
                          <td className="py-4 px-6 text-right">
                              {item.available_trips.destination}
                          </td>
                      </tr>
                        )
                        )}

                  </tbody>
              </table>
          </div>


          
            
          </div>
        </div>

        {/* <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Booking History</p>

          </div>


<div className="mt-10 ">
            {weeklyStats.map((item) => (
              <div key={item.title} className="flex justify-between mt-4 w-full">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{ background: item.iconBg }}
                    className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>

                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
            
          </div>
        </div> */}
       
      </div>
    </div>
  );
};

export default Dashboard;
