import React, { useState } from "react"
import HeadTitle from "../../Common/HeadTitle/HeadTitle"
import "./design.css"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("")
  const [enrolimage, setEnrolimage] = useState("")

  const [recValue, setRecValue] = useState([])
  const submitForm = (e) => {
    e.preventDefault()
    const newValue = { name: name, email: email, phonenumber:phonenumber ,password: password, enrolimage: enrolimage }

    setRecValue([...recValue, newValue])
    console.log(newValue)
  }
  return (
    <>
      <HeadTitle />
      <section className='forms top'>
        <div className='container'>
          <div className='sign-box'>
            <p>Don't have an account? Create your account, it takes less than a minute.</p>
            <form action='' onSubmit={submitForm}>
              <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
              <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
              <input type='number' name='phonenumber' value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} placeholder='Phone Number' required />
              <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
              <input type='text' name='enrolimage' value={enrolimage} onChange={(e) => setEnrolimage(e.target.value)} placeholder='Enrol Image' required />

              <button type='submit' className='primary-btn'>
                Create an Account
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className='show-data'>
        {recValue.map((cureentValue) => {
          return (
            <>
              <div className='sign-box'>
                <h1>Create an Account Successfully</h1>
                <h3>
                  Name : <p>{cureentValue.name}</p>
                </h3>
                <h3>
                  Email : <p>{cureentValue.email}</p>
                </h3>
                <h3>
                  <h3>
                    Phonenumber : <p>{cureentValue.phonenumber}</p>
                  </h3>
                  Password : <p>{cureentValue.password}</p>
                </h3>
                <h3>
                  Enroll Image : <p>{cureentValue.enrolimage}</p>
                </h3>
              </div>
            </>
          );
        })}
      </section>
    </>
  )
}

export default Register
