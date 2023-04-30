import React from "react";
import SideMenu from "../SideMenu";
import Registration from "./registration";
const DoctorRegistration = () => {
  return (
    <div class="g-sidenav-show  bg-gray-100">
      <SideMenu type="doctor" />
      <Registration />
    </div>
  );
};

export default DoctorRegistration;
