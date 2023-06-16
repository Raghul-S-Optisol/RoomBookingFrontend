import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Default credentials
    const defaultEmail = "admin@gmail.com";
    const defaultPassword = "admin@123";

    if (email === defaultEmail && password === defaultPassword) {
      console.log("Login successful");
      setLoginStatus(true);
      navigate("/AdminLocations");
    } else {
      console.log("Invalid email or password");
      setLoginStatus(false);
      alert("Enter valid email and password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center Login-bg vh-100">
      <div className="d-flex bg-white p-3 rounded w-40">
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="heading">ADMIN-LOGIN</h2>
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Email ID"
              name="email"
              onChange={handleEmail}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handlePassword}
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Log-in
          </button>
        </form>
        <p>{loginStatus}</p>
      </div>
    </div>
  );
}

export default Admin;






