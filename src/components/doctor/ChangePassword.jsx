import React from "react";
import SideMenu from "../SideMenu";
import Header from "../Header";

const ChangePassword = () => {
  return (
    <div class="g-sidenav-show  bg-gray-100">
      <SideMenu type={"doctor"} />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Header type={"doctor"}></Header>
        <div class="container-fluid py-4">
          <div class="row">
            <div class="col-12 col-xl-12">
              <div class="card h-100">
                <div class="card-header pb-0 p-3">
                  <h6 class="mb-0">Change Password</h6>
                </div>
                <div class="card-body p-3"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;
