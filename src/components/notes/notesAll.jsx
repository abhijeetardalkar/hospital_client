import React from "react";
import Note from "./Note";
import Header from "../Header";
import SideMenu from "../SideMenu";
import { useLocation } from "react-router-dom";

const notesAll = () => {
  const location = useLocation();
  const { userType, type, showFull } = location;
  console.log({ location });
  return (
    <div class="g-sidenav-show  bg-gray-100">
      <SideMenu type={userType} />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        {/* <!-- Navbar --> */}
        <Header type={userType}></Header>
        <Note showFull={true} />
      </main>
    </div>
  );
};

export default notesAll;
