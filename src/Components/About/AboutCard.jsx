import React from "react"
import "./About.css"

const AboutCard = () => {
  return (
    <>
      <div className='aboutCard mtop flex_space'>
        <div className='row row1'>
          <h4>About Us</h4>
          <h1>
            We <span>provide Solution</span> to mobility challanges faced in
            Nigeria
          </h1>
          <p>
            Transportation have economic impacts on Nigeria. Many transportation
            methods exist in various countries but developed countries use more
            transportation methods. Nevertheless
            road transportation is still the major means of transportation in
            Nigeria.
          </p>
          <p>
            Mass transit programs
Transportation costs more due to high cost of fuel in Nigeria. The Nigerian government can cut down the cost of transportation through mass transit programs which other states use. Nevertheless some mass transit vehicles are not performing this function. A lot of people prefer travelling on smaller vehicles because some government buses are not functioning well. Dirty interiors, overloads and vehicle breakdown are transportation issues.
          </p>
          <button className='secondary-btn'>
            Explore More <i className='fas fa-long-arrow-alt-right'></i>
          </button>
        </div>
        <div className='row image'>
          <img src='/images/about-img-1.jpg' alt='' />
          <div className='control-btn'>
            <button className='prev'>
              <i className='fas fa-play'></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutCard
