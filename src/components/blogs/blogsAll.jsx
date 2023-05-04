import React from "react";
import BlogViewer from "./BlogViewer";
import { useLocation } from "react-router-dom";
import SideMenu from "../SideMenu";
import Header from "../Header";

const blogsAll = () => {
  const location = useLocation();
  // const { userType, type, showFull } = location;
  const type = location?.state?.type ? location?.state?.type : null;
  console.log("blog All", { location });
  return (
    <>
      <div class="g-sidenav-show  bg-gray-100">
        <SideMenu type={type} />
        {/* <SideMenu type={userType} /> */}
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          {/* <!-- Navbar --> */}
          {/* <Header type={userType} /> */}
          <Header type={type} />

          {/* <BlogViewer showFull={true} type={type} userType={userType} /> */}
          <BlogViewer showFull={true} type={type} />
        </main>
      </div>
    </>
  );
};

export default blogsAll;
