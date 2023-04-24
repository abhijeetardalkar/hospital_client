import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";

import Layout from "./components/Layout";
import Dashboard from "./components/admin/Dashboard";
import DashboardPatient from "./components/patient/Dashboard";
import DashboardDoctor from "./components/doctor/Dashboard";
import PatientRegistration from "./components/patient/PatientRegistration";
import SignIn from "./components/login/login";
import { getKey } from "./components/utils/commonFunctions";

// import SideMenu from "./components/SideMenu";
// import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  // return <Layout />;
  const [userID, setUserID] = useState(null);
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    let user = JSON.parse(getKey("user"));
    console.log({ user });
    setUserID(user?.user_id || null);
    setUserType(user?.user_type || null);
  });
  console.log({ userID });
  // if (!userID) {
  //   return (
  //     <Router>
  //       <Routes>
  //         <Route path="/" element={<SignIn></SignIn>}></Route>
  //       </Routes>
  //     </Router>
  //   );
  // }
  // if (!userType) return null;

  console.log({ userType });

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn></SignIn>}></Route>
        {/* <Route
          exact
          path="/dashboard"
          element={
            userType == "admin" ? (
              <Dashboard></Dashboard>
            ) : userType == "doctor" ? (
              <DashboardDoctor />
            ) : (
              <DashboardPatient />
            )
          }
        ></Route> */}

        <Route
          exact
          path="/a/dashboard"
          element={<Dashboard></Dashboard>}
        ></Route>
        <Route exact path="/d/dashboard" element={<DashboardDoctor />}></Route>
        <Route
          exact
          path="/p/dashboard"
          element={<DashboardPatient></DashboardPatient>}
        ></Route>

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
