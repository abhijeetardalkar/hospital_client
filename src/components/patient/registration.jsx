import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SERVER_PATH } from "../../../config";

const registration = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  //   const [data, setData] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    let _error = {};
    if (data?.password != data?.confirmPassword) {
      _error = "Password Mismatch";
      //   _error = { ..._error, password: "Password Mismatch" };
      console.log("Error: ", { _error });
      setError(_error);
      return;
    } else {
      if ((data?.password == data?.confirmPassword) == "") {
        _error = "Blank Password";
        // _error = { ..._error, password: "Blank Password" };

        setError(_error);
        return;
      }
      _error = null;
      //   delete _error.password;
      setError(_error);
    }

    // console.log(data, { SERVER_PATH }, { error, message });
    let _data = {
      login_id: data?.loginID,
      password: data?.password,
      first_name: data?.firstName,
      middle_name: data?.middleName || null,
      last_name: data?.lastName,
      mobile: data?.mobile || null,
      email: data?.email || null,
      dob: null,
      aadhar: null,
      pincode: null,
      address: null,
      gender: null,
      height: null,
      weight: null,
      disease: null,
      exercise: null,
      diet_plan: null,
      smoke: null,
    };
    let res = await fetch(SERVER_PATH + "/api/patient/insertPatient", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
    });
    let result = await res.json();
    // console.log({ result });

    // if (result && result.hasOwnProperty() && !result.hasOwnProperty("error")) {
    if (result && result?.pat_data && result?.pat_data?.length) {
      setMessage("Patient Inserted Successfully");
      reset();
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } else if (result?.pat_data?.error.code == "ER_DUP_ENTRY") {
      setError("Patient Insertion Failed. Duplicate Entry");
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else {
      setError("Patient Insertion Failed");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };
  console.log({ error, message });
  //   const handleSubmit = () => {
  //     console.log("data: ", data);
  //     let formm = document.getElementById("regform");
  //     console.log("form: ", formm);
  //     formm.forEach((element) => {
  //       console.log({ element });
  //     });
  //     let _error = { ...error };
  //     if (data?.password != data?.confirmPassword) {
  //       _error = { ..._error, password: "Password Mismatch" };
  //       console.log("Error: ", { _error });
  //       setError(_error);
  //       return;
  //     } else {
  //       if ((data?.password == data?.confirmPassword) == "") {
  //         _error = { ..._error, password: "Blank Password" };

  //         setError(_error);
  //         return;
  //       }
  //       delete _error.password;
  //       setError(_error);
  //     }
  //   };
  //   const handleChange = (e) => {
  //     let _data = { ...data, [e.target.id]: e.target.value };
  //     console.log({ _data }, e.target.required);
  //     setData(_data);
  //   };
  return (
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
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
                class="breadcrumb-item text-sm text-dark active"
                aria-current="page"
              >
                Dashboard
              </li>
            </ol>
            <h6 class="font-weight-bolder mb-0">Dashboard</h6>
          </nav>
          <div
            class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
            id="navbar"
          >
            <div class="ms-md-auto pe-md-3 d-flex align-items-center">
              <div class="input-group">
                <span class="input-group-text text-body">
                  <i class="fas fa-search" aria-hidden="true"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type here..."
                />
              </div>
            </div>
            <ul class="navbar-nav  justify-content-end">
              <li class="nav-item d-flex align-items-center">
                <a
                  class="btn btn-outline-primary btn-sm mb-0 me-3"
                  target="_blank"
                  // href="https://www.creative-tim.com/builder/soft-ui?ref=navbar-dashboard"
                >
                  Online Builder
                </a>
              </li>
              <li class="nav-item d-flex align-items-center">
                <a
                  // href="javascript:;"
                  class="nav-link text-body font-weight-bold px-0"
                >
                  <i class="fa fa-user me-sm-1"></i>
                  <span class="d-sm-inline d-none">Sign In</span>
                </a>
              </li>
              <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
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
                {/* <a href="javascript:;" class="nav-link text-body p-0"> */}
                <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                {/* </a> */}
              </li>
              <li class="nav-item dropdown pe-2 d-flex align-items-center">
                {/* <a
                  //  href="javascript:;"
                    class="nav-link text-body p-0"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="fa fa-bell cursor-pointer"></i>
                  </a> */}
                <ul
                  class="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li class="mb-2">
                    <a
                      class="dropdown-item border-radius-md"
                      // href="javascript:;"
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
                      // href="javascript:;"
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
                      // href="javascript:;"
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
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container-fluid py-4">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <div class="card-header pb-0">
                <h6 className="centered">New Patient Registration</h6>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <div>
                    {/* {error && <p>{error?.message}</p>} */}
                    {/* {data && <Navigate to="/dashboard" replace={true} />} */}
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-body" id="regform">
                        <div className="username">
                          <label className="form__label" for="loginID">
                            Login ID{" "}
                          </label>
                          <input
                            className="form__input"
                            type="text"
                            id="loginID"
                            placeholder="Login ID"
                            {...register("loginID", { required: true })}
                            // required={true}
                            // onChange={handleChange}
                          />
                        </div>
                        <div className="username">
                          <label className="form__label" for="firstName">
                            First Name{" "}
                          </label>
                          <input
                            className="form__input"
                            type="text"
                            id="firstName"
                            placeholder="First Name"
                            {...register("firstName", { required: true })}
                            // required={true}
                            // onChange={handleChange}
                          />
                        </div>
                        <div className="username">
                          <label className="form__label" for="middleName">
                            Middle Name{" "}
                          </label>
                          <input
                            className="form__input"
                            type="text"
                            id="middleName"
                            placeholder="Middle Name"
                            {...register("middleName")}
                            // required={true}
                            // onChange={handleChange}
                          />
                        </div>
                        <div className="lastname">
                          <label className="form__label" for="lastName">
                            Last Name{" "}
                          </label>
                          <input
                            type="text"
                            name=""
                            id="lastName"
                            className="form__input"
                            placeholder="LastName"
                            {...register("lastName", { required: true })}
                            // onChange={handleChange}
                          />
                        </div>
                        <div className="mobile">
                          <label className="form__label" for="mobile">
                            Mobile{" "}
                          </label>
                          <input
                            type="mobile"
                            id="mobile"
                            className="form__input"
                            placeholder="Mobile"
                            {...register("mobile")}
                            // onChange={handleChange}
                          />
                        </div>
                        <div className="email">
                          <label className="form__label" for="email">
                            Email{" "}
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="form__input"
                            placeholder="Email"
                            {...register("email")}
                            // onChange={handleChange}
                          />
                        </div>
                        <div className="password">
                          <label className="form__label" for="password">
                            Password{" "}
                          </label>
                          <input
                            className="form__input"
                            type="password"
                            id="password"
                            placeholder="Password"
                            {...register("password", { required: true })}
                            // onChange={handleChange}
                          />
                        </div>
                        <div className="confirm-password">
                          <label className="form__label" for="confirmPassword">
                            Confirm Password{" "}
                          </label>
                          <input
                            className="form__input"
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            {...register("confirmPassword", { required: true })}
                            // onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div class="footer">
                        <input
                          type="submit"
                          class="btn"
                          title="Submit"
                          //   onClick={handleSubmit}
                        ></input>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <span className="error-message centered">
                {/* {error?.password && error?.password} */}
                {error}
              </span>

              <span className="success-message centered">
                {message && message}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default registration;
