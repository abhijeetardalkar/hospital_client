import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";

import Layout from "./components/Layout";
import Dashboard from "./components/admin/Dashboard";
import CreateBlog from "./components/admin/CreateBlog";
import DashboardPatient from "./components/patient/Dashboard";
import DashboardDoctor from "./components/doctor/Dashboard";
import DoctorActivation from "./components/doctor/DoctorActivation";
import ChangePassword from "./components/doctor/ChangePassword";
import PatientRegistration from "./components/patient/PatientRegistration";
import DoctorRegistration from "./components/doctor/DoctorRegistration";
import DoctorAppointment from "./components/doctor/AppointmentCopy";
import DoctorPreviousAppointment from "./components/doctor/PreviousAppointments";
import PatientPreviousAppointment from "./components/patient/PreviousAppointments";
import DoctorBlogs from "./components/blogs/blog";
import SignIn from "./components/login/login";
import BlogsAll from "./components/blogs/blogsAll";
import Blog from "./components/blogs/blog";
import Note from "./components/notes/notes";
import NotesAll from "./components/notes/notesAll";
import CreateNote from "./components/admin/CreateNote";

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
        <Route
          exact
          path="/doctor/registration"
          element={<DoctorRegistration />}
        ></Route>
        <Route
          exact
          path="/doctor/appointment"
          element={<DoctorAppointment />}
        ></Route>
        <Route
          exact
          path="/doctor/previous-appointment"
          element={<DoctorPreviousAppointment />}
        ></Route>
        <Route
          exact
          path="/patient/previous-appointment"
          element={<PatientPreviousAppointment />}
        ></Route>
        <Route
          exact
          path="/doctor/doctor-activation"
          element={<DoctorActivation />}
        ></Route>
        <Route
          exact
          path="/doctor/change-password"
          element={<ChangePassword />}
        ></Route>
        <Route exact path="/doctor/blogs" element={<DoctorBlogs />}></Route>
        <Route exact path="/admin/create-blog" element={<CreateBlog />}></Route>
        <Route exact path="/blogs/blogsAll" element={<BlogsAll />}></Route>
        <Route exact path="/blogs/blog" element={<Blog />}></Route>
        <Route exact path="/notes/notes" element={<Note />}></Route>
        <Route exact path="/notes/notesAll" element={<NotesAll />}></Route>
        <Route exact path="/admin/create-note" element={<CreateNote />}></Route>
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
