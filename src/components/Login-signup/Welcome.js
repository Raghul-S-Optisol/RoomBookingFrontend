import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <>
      <div className="background-image d-flex justify-content-center align-items-center">
      
        <div className="blur-background">
        <div className=""> <Link to={"/Admin"} className="btn btn-dark loc-head ">
              ADMIN
            </Link></div>
          <h1 className="single-line">BOOK YOUR ROOMS NOW...</h1><br />
          <div className="d-flex justify-content-center ">
            <Link to={"/Signup"} className="btn btn-dark w-30">
              Book
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
