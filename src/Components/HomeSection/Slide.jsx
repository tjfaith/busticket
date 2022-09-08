import React, { useState } from "react";
import { Link } from "react-router-dom";
import Data from "./Data";

const Home = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  const [fromState, setFromState] = useState("");
  const [toState, setToState] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  let stateRoutes  = [
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
  ]
  const handleSubmit =(e)=>{
    e.preventDefault()
    let formData ={ fromState,  toState, departureDate }
    window.location.href='/booking'
    console.log(formData)
  }
  return (
    <>
      <section className='slider'>
        <div className='control-btn'>
          <button className='prev' onClick={prevSlide}>
            <i className='fas fa-caret-left'></i>
          </button>
          <button className='next' onClick={nextSlide}>
            <i className='fas fa-caret-right'></i>
          </button>
        </div>

        {Data.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && <img src={slide.image} alt='Home Image' />}
            </div>
          );
        })}
      </section>
      <section className='absolute left-auto top-2/3 flex items-center justify-center w-full'>
        <div className='flex justify-center bg-black bg-opacity-25 rounded-md p-5 border-2'> 

      <button class="bg-white  hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-2 border-gray-400 rounded shadow text-4xl"><Link to="/booking"> BOOK A TRIP NOW</Link></button>

        </div>
      </section>
    </>
  );
}

export default Home
