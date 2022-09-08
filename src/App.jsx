import "./App.css";
import Navbar from "./Common/Navbar/Navbar";
import Home from "./Components/pages/Home";
import About from "./Components/About/About";
import Gallery from "./Components/gallery/Gallery";
//import Destinations from "./Components/Destinations/Destinations"
//import DHome from "./Components/Destinations/Home"
import Destinations from "./Components/Destinations/Home";

import { BrowserRouter, Routes,  Route } from "react-router-dom";
import SinglePage from "./SinglePage/SinglePage";
import Booking from "./user/booking/index"
import PrintTicket from "./user/booking/PrintTicket"

/*-------------blog------------ */
import Blog from "./Components/Blog/Blog";
import BlogSingle from "./Components/Blog/blog-single-page/BlogSingle";
import Testimonial from "./Components/Testimonial/Testimonial";
import Contact from "./Components/Contact/Contact";
import Footer from "./Common/footer/Footer";
import Login from "./Components/login/Login";
import Register from "./Components/login/Register";
/*-------------blog------------ */

/*-------------Admin------------ */
import './admin/index.css'; 

const App = ()=> {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/about' exact element={<About />} />
        <Route path='/gallery' exact element={<Gallery />} />
        <Route path='/destinations' exact element={<Destinations />} />
        <Route path='/singlepage/:id' element={<SinglePage />} />
        <Route path='/blog' exact element={<Blog />} />
        <Route path='/blogsingle/:id' element={<BlogSingle />} />
        <Route path='/testimonial' element={<Testimonial />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/sign-in' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/booking/ticket' element={<PrintTicket />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
