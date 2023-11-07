import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  return (
    <>
      <div className="container justify-content-center py-5 px-5 my-5 ">
        <div className="container w-75" style={{ border: "2px solid black" }}>
          <div id="mainCont" className="conatiner">
            <div
              className="row justify-content-center my-5 mx-5 "
              style={{ height: "100px" }}
            >
              <h3 className="">Sign Up</h3>
            </div>

            <div className="row justify-content-center  mx-5">
              <form>
                <input
                  type="text"
                  placeholder="User id / Email id"
                  name="username"
                  id="username"
                  className="user"
                />
              </form>
            </div>

            <div className="row justify-content-center my-5 mx-5">
              <form>
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  id="password"
                  className="pass"
                />
              </form>
            </div>

            <div className="row justify-content-center my-5 ">
              <Link aria-current="page" to="/">
                <button className="btn btn-success">Register</button>
              </Link>
            </div>

            <div className="row justify-content-center my-5 " id="register">
              <p>Lets Sign In &ensp;</p>
              <Link to="/">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
