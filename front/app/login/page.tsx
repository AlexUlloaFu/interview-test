"use client";

import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      const response = await fetch("http://localhost:12345/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        setStatus("Login Realizado correctamente");
      } else {
        console.log(response.status);
        console.log(data.message);
        setStatus(`Error trying to login: ${data.message}`);
      }
    } catch (err: unknown) {
      setStatus(`Error trying to login :${err}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="username">Nombre</label>
          <input
            className="text-black"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="text-black"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {status && <p>{status}</p>}
        <button className="text-white" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
