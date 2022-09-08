import React, { useState, useEffect } from "react"
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";


const useFetch = (url, watchData) =>{
    const [result, setResult] = useState({});
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {  
    axios
      // .get(url)
      .get(`${baseUrl}/api/${url}`)
      .then((res) => {
  // console.log(baseUrl)
        // console.log( res);
        setResult(res.data);
      })
      .catch((err) => {
        console.log("ERR", err);
        setErrorMessage(err);
      }); 
  
},[url, watchData])
// console.log(result);
return {result, errorMessage}
         
}
export default useFetch;