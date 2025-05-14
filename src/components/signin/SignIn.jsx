import React, { useState } from 'react';
import { signInSchema } from '../../data/validation.js';
import './SignIn.css';
import { useNavigate } from 'react-router';

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = signInSchema.validate({ username, password });

    if (error) {
      setError(error.details[0].message);
      setSuccess("");
      return;
    }

    if (username === "admin" && password === "password") {
      setSuccess("Inloggning lyckades!");
      setError("");
      localStorage.setItem("isLoggedIn", "true");
      navigate("/edit");
    } else {
      setError("Fel användarnamn eller lösenord.");
      setSuccess("");
    }
  };



  const navigate = useNavigate();


  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2 className="signin-title">Admin Login</h2>

        <input
          className="signin-input"
          placeholder="Användarnamn"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="signin-input"
          placeholder="Lösenord"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="signin-error">{error}</p>}
        {success && <p className="signin-success">{success}</p>}

        <button type="submit" className="signin-button">Logga in</button>

      </form>
    </div>
  );
}

export default SignIn;
