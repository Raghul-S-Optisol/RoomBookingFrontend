import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import Validation from "./LoginValidation";
import axios from 'axios'

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    console.log(values);
    if(errors.email ==="" && errors.password ===""){
      axios.post('http://localhost:8000/signin',values)
      .then(res => {
          if(res.status===200){
            navigate('/Locations')
          }else{
            console.log('error occured')
            alert('error occured')
          }
        
      })
      .catch(err =>console.log(err))
  }
  };

  return (
    <div className="d-flex justify-content-center align-items-center background-image vh-100">
      <div className="d-flex bg-white p-3 rounded w-40">
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="heading">SIGN-IN</h2>
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Email ID"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors && errors.email && (
              <em className="error-text">{errors.email}</em>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            { values.password && errors && errors.password && (
              <em className="error-text">
                {errors.password}
              </em>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 ">
            Log-in
          </button>
          <p> </p>
          <p> </p>
          <p class="text">Are you new User?</p>
          <Link to={"/Signup"} className="btn btn-primary border w-100 ">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
