import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { getKey } from "./utils/commonFunctions";
import { SERVER_PATH } from "../../config";
import SideMenu from "./SideMenu";
import Header from "./Header";

const schema = yup
  .object()
  .shape({
    password_new: yup
      .string()
      .matches(
        new RegExp(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@ "]).*$/)
      )
      .required(),
    password_confirm: yup
      .string()
      .matches(
        new RegExp(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@ "]).*$/)
      )
      .required(),
    mobile: yup.string().matches(new RegExp(/^\d{10}$/)),
  })
  .required();
const ChangePassword = () => {
  const [user, setUser] = useState(JSON.parse(getKey("user")));
  const [type, setType] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError: setFError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // date_to: moment(new Date()).format("yyyy-MM-DD"),
      active: true,

      // date_to: moment(new Date())
      //   .add(NEXT_VISIT_INTERVAL, "days")
      //   .format("yyyy-MM-DD"),
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    async function a() {
      let _user = JSON.parse(getKey("user"));
      // console.log("USER>>>>>>>>", { _user });
      let type = _user?.user_type;
      //   _type = "";
      if (type == "doctor") {
        // _type = "doctor/getDoctor";

        setType(type);
      } else if (type == "admin") {
        // _type = "admin/getAdmin";

        setType(type);
      } else if (type == "patient") {
        // _type = "patient/getPatient";
        setType(type);
      }
    }
    a();
  }, [user]);
  const resetForm = () => {
    reset();
  };
  const onSubmit = async (data) => {
    console.log("INOVKED");
    let _error = {};

    // console.log(data, { SERVER_PATH }, { error, message });
    console.log({ data });
    // let vtype = VISIBILITY_TYPE?.filter((crop) => crop.label == data?.type);
    // if (!vtype && !vtype?.length) return;
    // setValue("vtype", vtype[0]?.key);
    console.log("MODIFIED", { user, type, data, errors });

    // return;
    if (data?.password_new != data?.password_confirm) {
      _error = "Password Mismatch";
      //   _error = { ..._error, password: "Password Mismatch" };
      console.log("Error: ", { _error });
      setError(_error);
      return;
    } else {
      if ((data?.password_new == data?.password_confirm) == "") {
        _error = "Blank Password";
        // _error = { ..._error, password: "Blank Password" };

        setError(_error);
        return;
      }
      _error = null;
      //   delete _error.password;
      setError(_error);
    }

    let _data = {
      password: data.password_old,
      password_new: data.password_new,
      user_id: user.user_id,
      user_type: type,
    };
    console.log("PAYLOAD>>>>>", { _data });
    // return;
    let res = await fetch(SERVER_PATH + "/api/admin/updateUserPassword", {
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
      if (result?.user_data[0].result) {
        setMessage(result?.user_data[0].result);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      } else if (result?.user_data[0].error) {
        setError(result?.user_data[0].error);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
      resetForm();
    } else {
      setError("Updation Failed");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };
  return (
    <div class="g-sidenav-show  bg-gray-100">
      <SideMenu type={"doctor"} />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Header type={"doctor"}></Header>

        <div class="container-fluid py-4" style={{ minHeight: "600px" }}>
          <div class="row">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-xl-12 col-md-12 mb-lg-0 mb-xl-0 mb-4">
                  <div class="card">
                    {/* <div class="card mt-4"> */}
                    <div class="card-header pb-0 p-3">
                      <div class="row"></div>
                      <div class="col-12">
                        {/* <div class="card mb-4"> */}
                        <div class="card-header pb-0">
                          <h6 className="centered">Change Password</h6>
                        </div>
                        <div class="card-body px-0 pt-0 pb-2">
                          <div className="row">
                            <div class="table-responsive p-0 col-12 col-xl-12">
                              <div>
                                {/* {error && <p>{error?.message}</p>} */}
                                {/* {data && <Navigate to="/dashboard" replace={true} />} */}
                                <form
                                  id="form-appointment"
                                  className="form-appointment"
                                  onSubmit={handleSubmit(onSubmit)}
                                >
                                  <div className="form-body" id="regform">
                                    <div className="row">
                                      <div className="username  col-xl-12 col-sm-12 mb-xl-0 mb-4">
                                        <label
                                          className="form__label"
                                          for="password_new"
                                        >
                                          Old Password{" "}
                                        </label>
                                        <input
                                          className="form-control"
                                          // type="text"
                                          // multiple={true}
                                          id="note"
                                          placeholder="Old Password"
                                          {...register("password_old")}
                                          required={true}
                                          // onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-body" id="regform">
                                    <div className="row">
                                      <div className="username  col-xl-12 col-sm-12 mb-xl-0 mb-4">
                                        <label
                                          className="form__label"
                                          for="password_new"
                                        >
                                          New Password{" "}
                                        </label>
                                        <input
                                          className="form-control"
                                          // type="text"
                                          // multiple={true}
                                          id="note"
                                          placeholder="New Password"
                                          {...register("password_new")}
                                          required={true}
                                          // onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-body" id="regform">
                                    <div className="row">
                                      <div className="username  col-xl-12 col-sm-12 mb-xl-0 mb-4">
                                        <label
                                          className="form__label"
                                          for="password_confirm"
                                        >
                                          Confirm Password{" "}
                                        </label>
                                        <input
                                          className="form-control"
                                          // type="text"
                                          // multiple={true}
                                          id="note"
                                          placeholder="Confirm Password"
                                          {...register("password_confirm")}
                                          required={true}
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
                                      // onClick={handleSubmit}
                                    ></input>
                                  </div>
                                  {/* <div class="footer">
                            <div
                              class="btn bg-gradient-dark mb-0"

                              onClick={onSubmit}
                            >
                              Add New Card
                            </div>
                          </div> */}
                                </form>
                              </div>
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
                        {/* </div> */}
                      </div>

                      {/* <div class="row">
              <div class="col-6 text-end">
                <a class="btn bg-gradient-dark mb-0" href="javascript:;">
                  <i class="fas fa-plus"></i>&nbsp;&nbsp;Add New Card
                </a>
              </div>
            </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;
