// import React from "react";
import { Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
// import Register from "./pages/register";

function App() {
  console.log("App");
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Routes>
        {/* <Route
          path="/"
          element={
            <div>
              <h1>Home</h1>
            </div>
          }
        /> */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </div>
  );
}

export default App;
