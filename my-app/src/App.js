import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <form className="signin-form">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Sign In</button>

        <a href="#" className="forgot-password">
          Forgot Password?
        </a>
        <a href="#" className="create-account">
          Create Account
        </a>
      </form>
    </div>
  );
}

export default App;
