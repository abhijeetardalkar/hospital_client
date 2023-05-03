import React, { useEffect, useState } from "react";
import { getKey, removeKey } from "./utils/commonFunctions";
import { SERVER_PATH } from "../../config";
import { Link, useLocation } from "react-router-dom";

const ROUTE_ARRAY = {
  dashboard: ["/d/dashboard", "/a/dashboard"],
  blog: ["/admin/create-blog", "/blogs/blog"],
};

const Header = ({ setLoginFullName }) => {
  const [user, setUser] = useState(JSON.parse(getKey("user")));
  const [loginName, setLoginName] = useState("");
  const [slag, setSlag] = useState("");
  const location = useLocation();
  // console.log({ user });
  const getUser = async (_type) => {
    try {
      let _data = {
        id: user?.user_id,
      };
      let res = await fetch(SERVER_PATH + `/api/${_type}`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_data),
      });
      let result = await res.json();
      //   console.log({ result });
      return result;
    } catch (e) {
      console.log({ e });
    }
  };

  useEffect(() => {
    async function a() {
      let _user = JSON.parse(getKey("user"));
      let type = _user?.user_type,
        _type = "";
      if (type == "doctor") {
        _type = "doctor/getDoctor";
      } else if (type == "admin") {
        _type = "admin/getAdmin";
      } else if (type == "patient") {
        _type = "patient/getPatient";
      }
      // console.log("AAHAHAH", { type });
      let res = await getUser(_type);
      console.log({ res });
      let _salutation = type == "doctor" ? "Dr. " : "Mr. ";
      if (res?.user_data?.length) {
        // console.log("USER : ", res?.user_data[0]);
        setLoginName(_salutation + res?.user_data[0].first_name);
        setLoginFullName &&
          setLoginFullName(
            _salutation +
              `${res?.user_data[0].first_name} ${res?.user_data[0].last_name}`
          );
      }
    }
    a();
  }, [user]);

  useEffect(() => {
    // console.log({})
    let _path = "";
    if (ROUTE_ARRAY.dashboard.includes(location.pathname)) {
      _path = "Dashboard";
    } else if (location.pathname == "/doctor/appointment") {
      _path = "Create Appointment";
    } else if (location.pathname == "/patient/registration") {
      _path = "Patient Registration";
    } else if (location.pathname == "/doctor/previous-appointment") {
      _path = "Previous Appointment";
    } else if (ROUTE_ARRAY.blog.includes(location.pathname)) {
      _path = "Blog";
    }

    setSlag(_path);
  }, [location]);
  // console.log({ location });
  return (
    <>
      <nav
        class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
        id="navbarBlur"
        navbar-scroll="true"
      >
        <div class="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li class="breadcrumb-item text-sm">
                <a class="opacity-5 text-dark" href="javascript:;">
                  Pages
                </a>
              </li>
              <li
                class="breadcrumb-item text-sm text-dark active font-weight-bolder"
                aria-current="page"
              >
                {slag}
              </li>
            </ol>
            {/* <h6 class="font-weight-bolder mb-0">{slag}</h6> */}
          </nav>
          <div
            class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
            id="navbar"
          >
            <div class="ms-md-auto pe-md-3 d-flex align-items-center">
              <div class="input-group">
                {/* <span class="input-group-text text-body">
                  <i class="fas fa-search" aria-hidden="true"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type here..."
                /> */}
              </div>
            </div>
            <ul class="navbar-nav  justify-content-end">
              <li class="nav-item d-flex align-items-center">
                <a
                  class="btn btn-outline-primary btn-sm mb-0 me-3"
                  target="_blank"
                  // href="https://www.creative-tim.com/builder/soft-ui?ref=navbar-dashboard"
                >
                  {/* Online Builder */}
                  {loginName}
                </a>
              </li>
              <li class="nav-item d-flex align-items-center">
                <Link
                  // href="javascript:;"
                  class="nav-link text-body font-weight-bold px-0"
                  to="/"
                >
                  <i class="fa fa-user me-sm-1"></i>
                  <span
                    class="d-sm-inline d-none"
                    onClick={() => {
                      removeKey("user");
                    }}
                  >
                    Sign Out
                  </span>
                </Link>
              </li>
              {/* <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                <a
                  href="javascript:;"
                  class="nav-link text-body p-0"
                  id="iconNavbarSidenav"
                >
                  <div class="sidenav-toggler-inner">
                    <i class="sidenav-toggler-line"></i>
                    <i class="sidenav-toggler-line"></i>
                    <i class="sidenav-toggler-line"></i>
                  </div>
                </a>
              </li>
              <li class="nav-item px-3 d-flex align-items-center">
                  <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                 </li>
              <li class="nav-item dropdown pe-2 d-flex align-items-center">
             
                <ul
                  class="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li class="mb-2">
                    <a
                      class="dropdown-item border-radius-md"
                    
                    >
                      <div class="d-flex py-1">
                        <div class="my-auto">
                          <img
                            src="./img/team-2.jpg"
                            class="avatar avatar-sm  me-3 "
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="text-sm font-weight-normal mb-1">
                            <span class="font-weight-bold">New message</span>{" "}
                            from Laur
                          </h6>
                          <p class="text-xs text-secondary mb-0 ">
                            <i class="fa fa-clock me-1"></i>
                            13 minutes ago
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li class="mb-2">
                    <a
                      class="dropdown-item border-radius-md"
                     
                    >
                      <div class="d-flex py-1">
                        <div class="my-auto">
                          <img
                            src="./img/small-logos/logo-spotify.svg"
                            class="avatar avatar-sm bg-gradient-dark  me-3 "
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="text-sm font-weight-normal mb-1">
                            <span class="font-weight-bold">New album</span> by
                            Travis Scott
                          </h6>
                          <p class="text-xs text-secondary mb-0 ">
                            <i class="fa fa-clock me-1"></i>1 day
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item border-radius-md"
                      
                    >
                      <div class="d-flex py-1">
                        <div class="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                          <svg
                            width="12px"
                            height="12px"
                            viewBox="0 0 43 36"
                            version="1.1"
                          >
                            <title>credit-card</title>
                            <g
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                            >
                              <g
                                transform="translate(-2169.000000, -745.000000)"
                                fill="#FFFFFF"
                                fill-rule="nonzero"
                              >
                                <g transform="translate(1716.000000, 291.000000)">
                                  <g transform="translate(453.000000, 454.000000)">
                                    <path
                                      class="color-background"
                                      d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                      opacity="0.593633743"
                                    ></path>
                                    <path
                                      class="color-background"
                                      d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="text-sm font-weight-normal mb-1">
                            Payment successfully completed
                          </h6>
                          <p class="text-xs text-secondary mb-0 ">
                            <i class="fa fa-clock me-1"></i>2 days
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
