import React, { useState } from "react";
import { getKey, getUser } from "../utils/commonFunctions";
import { useForm } from "react-hook-form";
import moment from "moment";
import axios from "axios";
import { SERVER_PATH } from "../../../config";
const NEXT_VISIT_INTERVAL = 7;
const NewAppointment = ({
  user,
  loginFullName,
  error,
  message,
  patientDetail,
  setPatientDetail,
  setCurrentTreatment,
  setHistoryTreatment,
  setMessage,
  setError,
}) => {
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
    // console.log({ _data });
    if (_data) {
      setPatientDetail(_data);

      //  treatment details
      let _pat_id = _data?.pat_id;
      let _doc_id = user?.user_id;

      let _tdata = await getTreatmentData(
        "getAppointmentByDoctorPatient",
        _doc_id,
        _pat_id
      );
      console.log({ _tdata });
      if (_tdata) {
        setCurrentTreatment(_tdata);
      } else {
        setCurrentTreatment(null);
        setHistoryTreatment(null);
      }
    } else {
      setPatientDetail(null);
      setCurrentTreatment(null);
      setHistoryTreatment(null);
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
    setCurrentTreatment(null);
    setHistoryTreatment(null);
  };

  const getTreatmentData = async (_path, id, id2 = null) => {
    try {
      let _data = null;
      if (!id2) {
        _data = {
          id: id,
        };
      } else {
        _data = {
          doc_id: id,
          pat_id: id2,
        };
      }
      let res = await fetch(SERVER_PATH + `/api/doctor/${_path}`, {
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
      form_data.append("folder", "patients");
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
    console.log({ data, patientDetail });
    if (!patientDetail) {
      setError("Patient is not registered!");
      setTimeout(() => {
        setError(null);
      }, 2000);

      return;
    }
    let _file = data?.fileUrl?.length ? data?.fileUrl[0] : null;
    console.log(_file);
    let file_url = null;
    if (_file) {
      file_url = await uplaodFile(_file);
      console.log("Upload url", { file_url });
      // return;
      if (!file_url && file_url?.data?.status != "uploaded") {
        setError("Some error!");
        setTimeout(() => {
          setError(null);
        }, 2000);
        return;
      }
    }

    // return;
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
      file_url: !file_url ? null : file_url?.data?.saveAs,
      remark: data?.remark || null,
      symptom_desc: data?.symptomDesc || null,
      treatment_desc: data?.treatmentDesc || null,
      next_visit_date: data?.nextVisitDate,
    };
    console.log("PAYLOAD>>>>>", { _data });
    // return;
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
    <div class="col-lg-8">
      <div class="row">
        <div class="col-xl-12 col-md-12 mb-lg-0 mb-xl-0 mb-4">
          <div class="card">
            {/* <div class="card mt-4"> */}
            <div class="card-header pb-0 p-3">
              <div class="row"></div>
              <div class="col-12">
                {/* <div class="card mb-4"> */}
                <div class="card-header pb-0">
                  <h6 className="centered">New Appointment</h6>
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
                                  // onChange={handlePatientLoginIDChange}
                                  onBlur={handlePatientLoginIDChange}
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
                                  // className="form__label"
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
                                  {...register("paidFees", {
                                    required: true,
                                  })}
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
  );
};

export default NewAppointment;
