import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SERVER_PATH } from "../../../config";
import { getKey, storeKey } from "../utils/commonFunctions";

const login = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  //   const [data, setData] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [userType, setUserType] = useState("doctor");

  const [userID, setUserID] = useState(null);
  useEffect(() => {
    let user = JSON.parse(getKey("user"));
    // setUserID(user?.user_id || null);
    console.log({ user });
    if (!user || !user?.user_id) {
      navigate("/");
      // return (
      //   <Router>
      //     <Routes>
      //       <Route path="/" element={<SignIn></SignIn>}></Route>
      //     </Routes>
      //   </Router>
      // );
    } else {
      // navigate("/dashboard");
      console.log({ userType });
      let _userType = user?.user_type;
      let path = _userType == "admin" ? "a" : _userType == "doctor" ? "d" : "p";

      navigate(`${path}/dashboard`, { state: { user_type: _userType } });
    }
  }, []);
  const handleUserType = (type) => {
    console.log({ type });
    setUserType(type);
  };

  const onSubmit = async (data) => {
    let _error = {};
    if (data?.loginID == "" || data?.password == "") {
      _error = "Please provide credentials";
      //   _error = { ..._error, password: "Password Mismatch" };
      console.log("Error: ", { _error });
      setError(_error);
      return;
    } else {
      setError(null);
    }

    console.log(data, { SERVER_PATH }, { error, message });
    let _data = {
      user_type: userType,
      login_id: data?.loginID,
      password: data?.password,
    };
    let res = await fetch(SERVER_PATH + "/api/user/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
    });
    let result = await res.json();
    console.log({ result });

    // if (result && result.hasOwnProperty() && !result.hasOwnProperty("error")) {
    if (
      result &&
      result?.user_data &&
      result?.user_data?.length &&
      result?.user_data[0].user_id != 0
    ) {
      // redirect
      console.log("Loging successfully");
      setMessage("Loging successfully!");
      setTimeout(() => {
        setMessage(null);
      }, 2000);
      let _value = {
        user_id: result?.user_data[0].user_id,
        user_type: userType,
      };
      storeKey("user", JSON.stringify(_value));
      let path = userType == "admin" ? "a" : userType == "doctor" ? "d" : "p";

      navigate(`${path}/dashboard`, { state: { user_type: userType } });
    } else {
      setError("User does not exist!");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };
  console.log({ userType });
  return (
    <>
      <main class="main-content  mt-0">
        <section class="min-vh-100 mb-8">
          <div
            class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
            style={{
              backgroundImage: "url('./img/curved-images/curved14.jpg')",
            }}
          >
            <span class="mask bg-gradient-dark opacity-6"></span>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-5 text-center mx-auto">
                  <h1 class="text-white mb-2 mt-5">Welcome!</h1>
                  <p class="text-lead text-white">
                    E-HEALTH CARE CLOUD SOLUTION
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row mt-lg-n10 mt-md-n11 mt-n10">
              <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
                <div class="card z-index-0">
                  <div class="card-header text-center pt-4">
                    <h5>Login with</h5>
                  </div>
                  <div class="row px-xl-5 px-sm-4 px-3">
                    <div class="col-3 ms-auto px-1">
                      <a
                        className={
                          userType == "doctor"
                            ? "btn btn-outline-light w-100 user-type-box-select"
                            : `btn btn-outline-light w-100 `
                        }
                        href="javascript:;"
                        onClick={() => {
                          handleUserType("doctor");
                        }}
                      >
                        <img
                          src="./img/female-doctor-icon.svg"
                          //   width={20}
                        ></img>
                        {/* <svg
                          width="24px"
                          height="32px"
                          viewBox="0 0 64 64"
                          version="1.1"
                        >
                          <g
                            id="Artboard"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g
                              id="facebook-3"
                              transform="translate(3.000000, 3.000000)"
                              fill-rule="nonzero"
                            >
                              <circle
                                fill="#3C5A9A"
                                cx="29.5091719"
                                cy="29.4927506"
                                r="29.4882047"
                              ></circle>
                              <path
                                d="M39.0974944,9.05587273 L32.5651312,9.05587273 C28.6886088,9.05587273 24.3768224,10.6862851 24.3768224,16.3054653 C24.395747,18.2634019 24.3768224,20.1385313 24.3768224,22.2488655 L19.8922122,22.2488655 L19.8922122,29.3852113 L24.5156022,29.3852113 L24.5156022,49.9295284 L33.0113092,49.9295284 L33.0113092,29.2496356 L38.6187742,29.2496356 L39.1261316,22.2288395 L32.8649196,22.2288395 C32.8649196,22.2288395 32.8789377,19.1056932 32.8649196,18.1987181 C32.8649196,15.9781412 35.1755132,16.1053059 35.3144932,16.1053059 C36.4140178,16.1053059 38.5518876,16.1085101 39.1006986,16.1053059 L39.1006986,9.05587273 L39.0974944,9.05587273 L39.0974944,9.05587273 Z"
                                id="Path"
                                fill="#FFFFFF"
                              ></path>
                            </g>
                          </g>
                        </svg> */}
                      </a>
                    </div>

                    <div class="col-3 px-1">
                      <a
                        className={
                          userType == "patient"
                            ? "btn btn-outline-light w-100 user-type-box-select"
                            : `btn btn-outline-light w-100 `
                        }
                        // class="btn btn-outline-light w-100"
                        href="javascript:;"
                        onClick={() => {
                          handleUserType("patient");
                        }}
                      >
                        <img
                          src="./img/patient-icon1.svg"

                          //   width={35}
                        ></img>
                      </a>
                    </div>
                    <div class="col-3 me-auto px-1">
                      <a
                        className={
                          userType == "admin"
                            ? "btn btn-outline-light w-100 user-type-box-select"
                            : `btn btn-outline-light w-100 `
                        }
                        // class="btn btn-outline-light w-100"
                        href="javascript:;"
                        onClick={() => {
                          handleUserType("admin");
                        }}
                      >
                        <img
                          src="./img/admin-icon.svg"

                          //   width={35}
                        ></img>
                      </a>
                    </div>
                    <div class="mt-2 position-relative text-center">
                      <p class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3">
                        {/* or */} {userType.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div class="card-body">
                    <form
                      role="form text-left"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div class="mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Login ID"
                          aria-label="loginID"
                          id="loginID"
                          aria-describedby="email-addon"
                          {...register("loginID", { required: true })}
                        />
                      </div>
                      {/* <div class="mb-3">
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Email"
                          aria-label="Email"
                          aria-describedby="email-addon"
                        />
                      </div> */}
                      <div class="mb-3">
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Password"
                          aria-label="Password"
                          id="password"
                          aria-describedby="password-addon"
                          {...register("password", { required: true })}
                        />
                      </div>
                      {/* <div class="form-check form-check-info text-left">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                          checked
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          I agree the{" "}
                          <a
                            href="javascript:;"
                            class="text-dark font-weight-bolder"
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div> */}
                      <div class="text-center">
                        <input
                          type="submit"
                          class="btn bg-gradient-dark w-100 my-4 mb-2"
                          title="Sign In"
                        ></input>
                      </div>
                      {/* <p class="text-sm mt-3 mb-0">
                        Already have an account?{" "}
                        <a
                          href="javascript:;"
                          class="text-dark font-weight-bolder"
                        >
                          Sign in
                        </a>
                      </p> */}
                      {userType == "patient" && (
                        <p class="text-sm mt-3 mb-0">
                          Don't have an account?{" "}
                          <Link
                            to="/patient/registration"
                            class="text-dark font-weight-bolder"
                          >
                            Create New!
                          </Link>
                        </p>
                      )}
                    </form>

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
          </div>
        </section>
      </main>
    </>
  );
};

export default login;
