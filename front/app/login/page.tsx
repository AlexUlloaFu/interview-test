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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Iniciar Sesión</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
              Nombre de usuario
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          {status && (
            <p
              className={`mb-4 text-sm font-medium ${
                status.includes("Error") ? "text-red-500" : "text-green-500"
              }`}
            >
              {status}
            </p>
          )}
          <button
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="submit"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
