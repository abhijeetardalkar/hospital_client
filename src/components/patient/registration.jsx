import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SERVER_PATH } from "../../../config";
import Header from "../Header";
// import { joiResolver } from "@hookform/resolvers/joi";
import { yupResolver } from "@hookform/resolvers/yup";
// import Joi from "joi";
import * as yup from "yup";
// const schema2 = Joi.object({
//   firstName: Joi.string().required(),
//   email: Joi.string().email().required(),
// });

const schema = yup
  .object()
  .shape({
    loginID: yup
      .string()
      .matches(new RegExp(/^[A-Z 0-1_]+$/i))
      .required(),
    firstName: yup
      .string({ message: "Need to be string" })
      .required({ message: "Cannot be empty" })
      .matches(new RegExp(/^[A-Z]+$/i)),
    middleName: yup
      .string()
      .matches(new RegExp(/^[A-Z ]+$/i))
      .required(),
    lastName: yup
      .string()
      .matches(new RegExp(/^[A-Z ]+$/i))
      .required(),
    // .matches(new RegExp(/a-zA-z/))
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(
        new RegExp(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@ "]).*$/)
      )
      .required(),
    confirmPassword: yup
      .string()
      .matches(
        new RegExp(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@ "]).*$/)
      )
      .required(),
    mobile: yup.string().matches(new RegExp(/^\d{10}$/)),
  })
  .required();

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
  } = useForm({
    // resolver: joiResolver(schema2),
    resolver: yupResolver(schema),
  });
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
    console.log({ result });

    // if (result && result.hasOwnProperty() && !result.hasOwnProperty("error")) {
    if (result && result?.user_data && result?.user_data?.length) {
      setMessage("Patient Inserted Successfully");
      reset();
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } else if (result?.user_data?.error.code == "ER_DUP_ENTRY") {
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
  console.log({ error, message, errors });
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
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
      <Header type="patient" />
      <div class="container-fluid py-4" style={{ minHeight: "600px" }}>
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
                        <div className="row">
                          <div className="username col-xl-6 col-sm-6 mb-xl-0 mb-4">
                            <label className="form__label" for="loginID">
                              Login ID{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="loginID"
                              placeholder="Login ID"
                              {...register("loginID", { required: true })}
                              // required={true}
                              // onChange={handleChange}
                            />
                          </div>
                          <div className="username col-xl-6 col-sm-6 mb-xl-0 mb-4">
                            <label className="form__label" for="firstName">
                              First Name{" "}
                            </label>

                            <input
                              className="form-control"
                              type="text"
                              name="firstName"
                              id="firstName"
                              placeholder="First Name ad"
                              {...register("firstName", {
                                // required: true,
                              })}
                              // required={true}
                              // onChange={handleChange}
                            />
                          </div>
                          {/* {errors?.errors?.firstName?.message?.message && (
                            <p>{errors?.errors?.firstName?.message?.message}</p>
                          )} */}
                        </div>
                        <div className="row">
                          <div className="username col-xl-6 col-sm-6 mb-xl-0 mb-4">
                            <label className="form__label" for="middleName">
                              Middle Name{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="middleName"
                              placeholder="Middle Name"
                              {...register("middleName")}
                              // required={true}
                              // onChange={handleChange}
                            />
                          </div>
                          <div className="lastname col-xl-6 col-sm-6 mb-xl-0 mb-4">
                            <label className="form__label" for="lastName">
                              Last Name{" "}
                            </label>
                            <input
                              type="text"
                              name=""
                              id="lastName"
                              className="form-control"
                              placeholder="LastName"
                              {...register("lastName", { required: true })}
                              // onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="mobile  col-xl-6 col-sm-6 mb-xl-0 mb-4">
                            <label className="form__label" for="mobile">
                              Mobile{" "}
                            </label>
                            <input
                              type="mobile"
                              id="mobile"
                              className="form-control"
                              placeholder="Mobile"
                              {...register("mobile")}
                              // onChange={handleChange}
                            />
                          </div>
                          <div className="email  col-xl-6 col-sm-6 mb-xl-0 mb-4">
                            <label className="form__label" for="email">
                              Email{" "}
                            </label>
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              placeholder="Email"
                              {...register("email")}
                              // onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="password  col-xl-6 col-sm-6 mb-xl-0 mb-4">
                            <label className="form__label" for="password">
                              Password{" "}
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              id="password"
                              placeholder="Password"
                              {...register("password", { required: true })}
                              // onChange={handleChange}
                            />
                          </div>
                          <div className="confirm-password  col-xl-6 col-sm-6 mb-xl-0 mb-4">
                            <label
                              // className="form__label"
                              for="confirmPassword"
                            >
                              Confirm Password{" "}
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              id="confirmPassword"
                              placeholder="Confirm Password"
                              {...register("confirmPassword", {
                                required: true,
                              })}
                              // onChange={handleChange}
                            />
                          </div>
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
