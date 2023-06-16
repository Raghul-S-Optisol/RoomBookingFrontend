import React ,{ useState }from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './Signupvalidation'
import axios from 'axios'


function Signup() {

  const [values, setValues] = useState({
    name:"",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if(errors.name === "" && errors.email ==="" && errors.password ===""){
        axios.post('http://localhost:8000/signup',values)
        .then(res => {
          console.log(res);
          navigate('/Login')
        })
        .catch(err =>alert('Something Went Wrong'))
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center background-image vh-100'>
    <div className='d-flex bg-white p-3 rounded w-20'>
      <form onSubmit={handleSubmit}>
          <div className='mb-3'>
              <div><h2 className='heading'>SIGN-UP</h2></div>
              <label htmlFor='name'><strong>Name</strong></label>
              <input type='text' placeholder='Name' name="name"
               onChange={handleInput}
              className='form-control rounded-0.5'/>
              {errors && errors.name && (
              <em className="error-text">
                {errors.name}
              </em>
            )}
          </div>
          <div className='mb-3'>
              <label htmlFor='email'><strong>Email</strong></label>
              <input type='email' placeholder='Email ID' name="email"
               onChange={handleInput}
              className='form-control rounded-0.5'/>
              {errors && errors.email && (
              <em className="error-text">{errors.email}</em>
            )}
          </div>
          <div className='mb-3'>
              <label htmlFor='password'><strong>Password</strong></label>
              <input type='password' placeholder='Password' name="password"
               onChange={handleInput}
              className='form-control rounded-0.5' />
              {errors && errors.password && (
              <em className="error-text">
                {errors.password}
              </em>
            )}
          </div>
          <button type='submit' className='btn btn-success w-100 '>Sign-Up</button>
            <p> </p><p> </p>
            <p class="text">Already hava an account?</p>
            <Link to={'/Login'} className='btn btn-primary border w-100 ' >Log-in</Link>
      </form>
    </div>
  </div>
  )
}

export default Signup
