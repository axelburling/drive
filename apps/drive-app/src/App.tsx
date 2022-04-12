// import { fs, path } from "@tauri-apps/api";
// import "./App.css";

// function App() {
//   (async () => {
//     console.log(await path.appDir());
//     const files = await fs.readDir(await path.appDir());
//   })();

//   return (
//     <div className="App">
//       <h1>hello</h1>
//     </div>
//   );
// }

// export default App;

/* eslint-disable react/no-children-prop */
// import { useRouter } from "next/router";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

// import { FaLock } from "react-icons/fa";
// import { FiMail } from "react-icons/fi";
// import IsLoggedIn from "../components/isLoggedIn";
// import { AuthContext } from "../context/authContext";

// const CFaUserAlt = chakra(FiMail);
// const CFaLock = chakra(FaLock);

const App = () => {
  // const { login } = useContext(AuthContext)!;
  // const router = useRouter();

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      {/* // <Routes>
    //   <Route path="/" element={<Login />} />
    // </Routes>
    // <IsLoggedIn> */}
      <h1>hello</h1>
      {/* </IsLoggedIn> */}
    </>
  );
};

export default App;
