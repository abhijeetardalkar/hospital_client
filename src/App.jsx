import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";

import Layout from "./components/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import PatientRegistration from "./components/patient/PatientRegistration";
// import SideMenu from "./components/SideMenu";
// import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const [count, setCount] = useState(0);
  // return <Layout />;
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard></Dashboard>}></Route>
        <Route
          exact
          path="/patient/registration"
          element={<PatientRegistration />}
        ></Route>
      </Routes>
    </Router>
  );

  return (
    <div className="App">
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div>
  );
}

export default App;
