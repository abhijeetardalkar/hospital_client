import React from "react";
import BlogViewer from "./BlogViewer";
import SideMenu from "../SideMenu";
import Header from "../Header";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";

const blog = ({ type }) => {
  const location = useLocation();
  let { articleData } = location.state;
  console.log({ articleData, location });
  return (
    <>
      <div class="g-sidenav-show  bg-gray-100">
        <SideMenu type={type} />
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          {/* <!-- Navbar --> */}
          <Header type={type}></Header>
          {/* <!-- End Navbar --> */}
          <div class="container-fluid py-4">
            <div class="row">
              <div class="col-xl-12 col-sm-12 mb-xl-0 mb-4">
                <div class="card">
                  <div class="card-body p-3">
                    <div class="row">
                      <div class="col-8">
                        <div class="numbers">
                          <p class="text-sm mb-0 text-capitalize font-weight-bold">
                            {moment(articleData?.date_to).format("DD MMM yyyy")}
                          </p>
                          <h5 class="font-weight-bolder mb-0 text-success">
                            {articleData?.title}
                          </h5>
                        </div>
                      </div>
                      <div class="col-4 text-end">
                        <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                          <i
                            class="ni ni-money-coins text-lg opacity-10"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row mt-4">
                    <div class="col-lg-7 mb-lg-0 mb-4">
                      <div class="card">
                        <div class="card-body p-3">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="d-flex flex-column h-100">
                                {/* <p class="mb-1 pt-2 text-bold">
                                  Built by developers
                                </p>
                                <h5 class="font-weight-bolder">
                                  Soft UI Dashboard
                                </h5> */}
                                <p class="mb-5">{articleData?.message}</p>
                                <Link
                                  class="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                                  to="/blogs/blogsAll"
                                >
                                  <i
                                    class="fas fa-arrow-left text-sm ms-1"
                                    aria-hidden="true"
                                  >
                                    {"        "}
                                    All blogs
                                  </i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-5">
                      <div class="card h-100 p-3">
                        <div
                          class="overflow-hidden position-relative border-radius-lg bg-cover h-100"
                          style={{
                            backgroundImage: "url('./img/ivancik.jpg')",
                          }}
                        >
                          <div class="col-lg-12 ms-auto text-center mt-5 mt-lg-0">
                            <div class="bg-gradient-primary border-radius-lg h-100">
                              <img
                                src="./img/shapes/waves-white.svg"
                                class="position-absolute h-100 w-50 top-0 d-lg-block d-none"
                                alt="waves"
                              />
                              <div class="position-relative d-flex align-items-center justify-content-center h-100">
                                <img
                                  class="w-100 position-relative z-index-2 pt-4"
                                  src="./img/illustrations/rocket-white.png"
                                  alt="rocket"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default blog;
