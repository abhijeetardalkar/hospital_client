import React, { useState } from "react";
import SideMenu from "../SideMenu";
import Registration from "./registration";
import moment from "moment";
import { useForm } from "react-hook-form";
import Header from "../Header";
import { CARD_SPACE_HEIGHT, getKey, getUser } from "../utils/commonFunctions";
import { SERVER_PATH } from "../../../config";
import axios from "axios";
const NEXT_VISIT_INTERVAL = 7;
const Appointment = () => {
  const [user, setUser] = useState(JSON.parse(getKey("user")));
  const [loginFullName, setLoginFullName] = useState("");
  const [patientDetail, setPatientDetail] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [nextVisitDate, setNextVisitDate] = useState(null);

  //   const [data, setData] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      visitDate: moment(new Date()).format("yyyy-MM-DD"),
      nextVisitDate: moment(new Date())
        .add(NEXT_VISIT_INTERVAL, "days")
        .format("yyyy-MM-DD"),
    },
  });

  const handleChangeVisitDate = (e) => {
    console.log(e.target.value);
    setValue(
      "nextVisitDate",
      moment(e.target.value)
        .add(NEXT_VISIT_INTERVAL, "days")
        .format("yyyy-MM-DD")
    );
  };
  const handleFileUpload = () => {
    console.log("UPLAOD");
  };

  const handlePatientLoginIDChange = async (e) => {
    let _id = e.target.value;
    console.log({ _id });
    let _data = await getPatientDetail(_id);
    console.log({ _data });
    if (_data) {
      setPatientDetail(_data);
    } else {
      setPatientDetail(null);
    }
  };
  const getPatientDetail = async (_id) => {
    // console.log("AAHAHAH", { type });
    let _type = "patient/getPatientByID";
    let res = await getUser(_type, _id);
    console.log({ res });

    if (res?.user_data?.length) {
      console.log("USER : ", res?.user_data[0]);
      return res?.user_data[0];
    } else {
      return null;
    }
  };
  const resetForm = () => {
    reset();
    setPatientDetail(null);
  };

  const uplaodFile = async (file) => {
    try {
      console.log("file uploa...", { file });
      let contentType = {
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
        },
      };
      var form_data = new FormData();
      form_data.set("file", file);
      // form_data.set("fileName", file.name);

      // let res = await fetch(SERVER_PATH + "/upload", {
      //   method: "post",
      //   body: _data,
      // });
      // let result = await res.json();
      let result = await axios.post(
        SERVER_PATH + "/upload",
        form_data,
        contentType
      );
      console.log({ result });
      return result;
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (data) => {
    console.log("INOVKED");
    let _error = {};
    // if (data?.password != data?.confirmPassword) {
    //   _error = "Password Mismatch";
    //   //   _error = { ..._error, password: "Password Mismatch" };
    //   console.log("Error: ", { _error });
    //   setError(_error);
    //   return;
    // } else {
    //   if ((data?.password == data?.confirmPassword) == "") {
    //     _error = "Blank Password";
    //     // _error = { ..._error, password: "Blank Password" };

    //     setError(_error);
    //     return;
    //   }
    //   _error = null;
    //   //   delete _error.password;
    //   setError(_error);
    // }

    // console.log(data, { SERVER_PATH }, { error, message });
    console.log({ data });
    let _file = data?.fileUrl?.length ? data?.fileUrl[0] : null;
    console.log(_file);
    let file_url = null;
    if (_file) {
      file_url = await uplaodFile(_file);
    }
    console.log({ file_url });
    return;
    let _data = {
      doc_id: user?.user_id,
      pat_id: patientDetail?.pat_id,
      visit_date: data?.visitDate,
      paid_fees:
        data?.paidFees != "" || data?.paidFees != null
          ? parseInt(data?.paidFees)
          : null,
      remaining_fees:
        data?.remFees != "" || data?.remFees != null
          ? parseInt(data?.remFees)
          : null,
      file_url: file_url, //
      remark: data?.remark || null,
      symptom_desc: data?.symptomDesc || null,
      treatment_desc: data?.treatmentDesc || null,
      next_visit_date: data?.nextVisitDate,
    };
    console.log("PAYLOAD>>>>>", { _data });
    return;
    let res = await fetch(SERVER_PATH + "/api/doctor/createAppointment", {
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
    if (result && result?.doc_data && result?.doc_data?.length) {
      setMessage("Appointment Created Successfully");
      resetForm();

      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } else if (result?.pat_data?.error.code == "ER_DUP_ENTRY") {
      setError("Appointment Creation Failed. Duplicate Entry");
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else {
      setError("Appointment Creation Failed");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };
  console.log({ error, message, user, patientDetail });
  return (
    <div class="g-sidenav-show  bg-gray-100">
      <SideMenu type="doctor" />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Header type="doctor" setLoginFullName={setLoginFullName} />
        <div
          class="container-fluid py-4"
          style={{ minHeight: CARD_SPACE_HEIGHT }}
        >
          <div class="row">
            <div class="col-12">
              <div class="card mb-4">
                <div class="card-header pb-0">
                  <h6 className="centered">New Appointment</h6>
                </div>
                <div class="card-body px-0 pt-0 pb-2">
                  <div className="row">
                    <div class="table-responsive p-0 col-9 col-xl-9">
                      <div>
                        {/* {error && <p>{error?.message}</p>} */}
                        {/* {data && <Navigate to="/dashboard" replace={true} />} */}
                        <form
                          id="form-appointment"
                          className="form-appointment"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="form-body" id="regform">
                            <div className="username">
                              <label className="form__label" for="doctor">
                                Doctor{" "}
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                id="doctor"
                                disabled={true}
                                placeholder="Login ID"
                                value={loginFullName}
                                // {...register("doctor")}
                                // required={true}
                                // onChange={handleChange}
                              />
                            </div>
                            <div className="row">
                              <div className="username col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                <label className="form__label" for="loginID">
                                  Patient Login ID{" "}
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="loginID"
                                  placeholder="Login ID"
                                  {...register("loginID")}
                                  required={true}
                                  onChange={handlePatientLoginIDChange}
                                />
                              </div>
                              <div className="username col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                <label className="form__label" for="visitDate">
                                  Visit Date{" "}
                                </label>
                                <input
                                  className="form-control"
                                  type="date"
                                  id="visitDate"
                                  // value={"2023-04-15"}
                                  // defaultValue={moment(new Date()).format(
                                  //   "yyyy-MM-DD"
                                  // )}
                                  // value={}
                                  {...register("visitDate")}
                                  // required={true}
                                  onChange={handleChangeVisitDate}
                                />
                              </div>
                            </div>

                            <div className="row">
                              <div className="username  col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                <label
                                  className="form__label"
                                  for="symptomDesc"
                                >
                                  Symptom Description{" "}
                                </label>
                                <textarea
                                  className="form-control"
                                  // type="text"
                                  // multiple={true}
                                  id="symptomDesc"
                                  placeholder="Symptom Description"
                                  {...register("symptomDesc")}
                                  required={true}
                                  // onChange={handleChange}
                                />
                              </div>
                              <div className="username  col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                <label
                                  className="form__label"
                                  for="treatmentDesc"
                                >
                                  Treatment Description{" "}
                                </label>
                                <textarea
                                  className="form-control"
                                  // type="text"
                                  id="treatmentDesc"
                                  placeholder="Symptom Description"
                                  {...register("treatmentDesc", {
                                    required: true,
                                  })}
                                  // required={true}
                                  // onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="username  col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                <label className="form__label" for="remark">
                                  Remark{" "}
                                </label>
                                <textarea
                                  className="form-control"
                                  id="remark"
                                  placeholder="Remark"
                                  {...register("remark")}
                                  required={true}
                                  // onChange={handleChange}
                                />
                              </div>
                              <div className="username col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                <label
                                  className="form__label"
                                  for="nextVisitDate"
                                >
                                  Next Visit Date{" "}
                                </label>
                                <input
                                  className="form-control"
                                  type="date"
                                  id="nextVisitDate"
                                  // value={"2023-04-15"}
                                  // defaultValue={moment(new Date())
                                  // .add(4, "day")
                                  // .format("yyyy-MM-DD")}
                                  // value={nextVisitDate}
                                  {...register("nextVisitDate")}
                                  // required={true}
                                  // onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div className="row">
                              <div className="username col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                <label className="form__label" for="paidFees">
                                  Paid Fees{" "}
                                </label>
                                <input
                                  className="form-control"
                                  type="number"
                                  min={0}
                                  id="paidFees"
                                  placeholder="Paid Fees"
                                  {...register("paidFees", { required: true })}
                                  required={true}
                                  // onChange={handlePatientLoginIDChange}
                                />
                              </div>
                              <div className="username col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                <label className="form__label" for="remFees">
                                  Remaining Fees{" "}
                                </label>
                                <input
                                  className="form-control"
                                  type="number"
                                  min={0}
                                  id="remFees"
                                  placeholder="Remaining Fees"
                                  {...register("remFees", { required: true })}
                                  // required={true}
                                  // onChange={handlePatientLoginIDChange}
                                />
                              </div>
                            </div>

                            <div className="row">
                              <div className="username col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                <label className="form__label" for="fileUrl">
                                  Upload File{" "}
                                </label>
                                <input
                                  className="form-control"
                                  type="file"
                                  id="fileUrl"
                                  placeholder="Select file"
                                  {...register("fileUrl")}
                                  // required={true}
                                  onChange={handleFileUpload}
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
                        </form>
                      </div>
                    </div>

                    <div
                      className="col-3 col-xl-3"
                      style={{ paddingRight: 50, paddingTop: 50 }}
                    >
                      {patientDetail && (
                        <div className="row">
                          <div class="col-12 col-xl-12">
                            <div class="card h-100">
                              <div class="card-header pb-0 p-3">
                                <div class="row">
                                  <div class="col-md-8 d-flex align-items-center">
                                    <h6 class="mb-0">Patient Information</h6>
                                  </div>
                                  <div class="col-md-4 text-end">
                                    <a href="javascript:;">
                                      <i
                                        class="fas fa-user-edit text-secondary text-sm"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Edit Profile"
                                      ></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div class="card-body p-3">
                                {/* <p class="text-sm">
                                    Hi, I’m Alec Thompson, Decisions: If you
                                    can’t decide, the answer is no. If two
                                    equally difficult paths, choose the one more
                                    painful in the short term (pain avoidance is
                                    creating an illusion of equality).
                                  </p> */}
                                <hr class="horizontal gray-light my-4" />
                                <ul class="list-group">
                                  <li class="list-group-item border-0 ps-0 pt-0 text-sm">
                                    <strong class="text-dark">
                                      Full Name:
                                    </strong>{" "}
                                    &nbsp;{" "}
                                    {`${patientDetail?.first_name} ${patientDetail?.middle_name} ${patientDetail?.last_name}`}
                                  </li>
                                  <li class="list-group-item border-0 ps-0 text-sm">
                                    <strong class="text-dark">Mobile:</strong>{" "}
                                    &nbsp; {patientDetail?.mobile}
                                  </li>
                                  <li class="list-group-item border-0 ps-0 text-sm">
                                    <strong class="text-dark">Email:</strong>{" "}
                                    &nbsp; {patientDetail?.email}
                                  </li>
                                  <li class="list-group-item border-0 ps-0 text-sm">
                                    <strong class="text-dark">Location:</strong>{" "}
                                    &nbsp;{" "}
                                    {`${
                                      patientDetail?.address
                                        ? patientDetail?.address
                                        : ""
                                    } ${
                                      patientDetail?.pincode
                                        ? patientDetail?.pincode
                                        : ""
                                    }`}
                                  </li>
                                  <li class="list-group-item border-0 ps-0 pb-0">
                                    <strong class="text-dark text-sm">
                                      Social:
                                    </strong>{" "}
                                    &nbsp;
                                    <a
                                      class="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0"
                                      href="javascript:;"
                                    >
                                      <i class="fab fa-facebook fa-lg"></i>
                                    </a>
                                    <a
                                      class="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0"
                                      href="javascript:;"
                                    >
                                      <i class="fab fa-twitter fa-lg"></i>
                                    </a>
                                    <a
                                      class="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0"
                                      href="javascript:;"
                                    >
                                      <i class="fab fa-instagram fa-lg"></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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
    </div>
  );
};

export default Appointment;
