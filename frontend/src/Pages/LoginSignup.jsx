import React, { useState } from 'react'
import './css/LoginSignup.css'

export const LoginSignup = () => {
  const [state, setState] = useState("Login"); 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Login Function
  const login = async () => {
    console.log("Login function Executed", formData);
    try {
      let response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      let responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/"); // redirect home
      } else {
        alert(responseData.errors || "Login failed. Try again!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  // Signup Function
  const signup = async () => {
    console.log("Signup Function Executed", formData);
    try {
      let response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      let responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/"); // redirect home
      } else {
        alert(responseData.errors || "Signup failed. Try again!");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>

        <button onClick={() => (state === "Login" ? login() : signup())}>
          Continue
        </button>

        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?
            <span onClick={() => setState("Login")}> Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an Account?
            <span onClick={() => setState("Sign Up")}> Click here</span>
          </p>
        )}

        <div className="loginsignupagree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy</p>
        </div>
      </div>
    </div>
  );
};
