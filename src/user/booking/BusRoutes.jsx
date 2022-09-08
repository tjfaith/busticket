import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import PassengerInfo from './PassengerInfo';
const BusRoutes = (props) => {


  const handleSelectRoute = (bookData) => {
    props.setBookData(bookData);
    props.toggleRoutes();
    // console.log(bookData);
  };
  return (
    <div style={{ minHeight: "80vh" }} className=' mt-10'>
      {(props.data.length > 0) ? <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-lg'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='py-3 px-6'>
              TRIP ID
            </th>
            <th scope='col' className='py-3 px-6'>
              FROM
            </th>
            <th scope='col' className='py-3 px-6'>
              TO
            </th>
            <th scope='col' className='py-3 px-6'>
              DEPARTURE DATE
            </th>
            <th scope='col' className='py-3 px-6'>
              DEPARTURE TIME
            </th>
            <th scope='col' className='py-3 px-6'>
              PRICE
            </th>
            <th scope='col' className='py-3 px-6'></th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((val) => {
            return (
              <tr key={val.id} className='bg-white dark:bg-gray-800'>
                <td className='py-4 px-6'>{val.id}</td>
                <td className='py-4 px-6'>{val.from}</td>
                <td className='py-4 px-6'>{val.destination}</td>
                <td className='py-4 px-6'>{val.date}</td>
                <td className='py-4 px-6'>{val.time}</td>
                <td className='py-4 px-6'>

                  <span>&#8358; </span>{val.price}
                </td>
                <td className='py-4 px-6'>
                  {(val.bookingCount >= val.seatCount) ? <div className='border-2 p-2 rounded text-gray-800 font-body text-center'>NO SEAT</div> : <button
                    onClick={() => { handleSelectRoute(val) }}
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      padding: "10px",
                      marginLeft: "20px",
                    }}
                  >
                    SELECT
                  </button>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> : <div></div>
      }
    </div>
  );
};

export default BusRoutes;
