import React, { useState, useEffect } from "react"
import axios from "axios";

const FaceApi = (url,data,method) =>{
    const [result, setResult] = useState({});
    
        const options = {
            url: `https://api.kairos.com/${url}`,
            method: method,
            headers: {
                "Content-Type": "application/json",
                app_id: "444b2604",
                app_key: "54f271c863c961229940d707a218fc3f",
              },
            data: data
          };
          
          axios(options)
            .then(response => {
                console.log(response);
              setResult(response.data);
            }).catch(err => {
                setResult(err.response.data);
            })

    return (result)
}
export default FaceApi;