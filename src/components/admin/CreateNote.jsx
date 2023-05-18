import React, { useEffect, useState } from "react";
import { getKey, getUser } from "../utils/commonFunctions";
import { useForm } from "react-hook-form";
import moment from "moment";
import axios from "axios";
import { SERVER_PATH } from "../../../config";
import SideMenu from "../SideMenu";
import Header from "../Header";
const NEXT_VISIT_INTERVAL = 2;
const VISIBILITY_TYPE = [
  { key: 0, label: "Patient + Doctor" },
  { key: 1, label: "Doctor" },
  { key: 2, label: "Patient" },
];
const CreateNote = () => {
  const [user, setUser] = useState(JSON.parse(getKey("user")));

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [doctorList, setDoctorList] = useState(null);
  const [selectedList, setSelectedList] = useState([]);

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
      date_to: moment(new Date()).format("yyyy-MM-DD"),
      active: true,
      // date_to: moment(new Date())
      //   .add(NEXT_VISIT_INTERVAL, "days")
      //   .format("yyyy-MM-DD"),
    },
  });

  const handleChangeBlogDate = (e) => {
    console.log(e.target.value);
    setValue(
      "date_to",
      moment(e.target.value)
        .add(NEXT_VISIT_INTERVAL, "days")
        .format("yyyy-MM-DD")
    );
  };
  const handleFileUpload = () => {
    console.log("UPLAOD");
  };

  const resetForm = () => {
    reset();
    // setPatientDetail(null);
    setSelectedList([]);
  };

  useEffect(() => {
    async function a() {
      //Todays
      let res = await fetch(SERVER_PATH + `/api/doctor/allDoctors`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let result = await res.json();
      console.log({ result });
      console.log("DOCTORS:::", { result });

      if (result?.user_data?.length) {
        setDoctorList(result?.user_data);
      }
    }
    a();
  }, []);

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
      form_data.append("folder", "blogs");
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
      console.log("Upload:", { result });
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
    // let vtype = VISIBILITY_TYPE?.filter((crop) => crop.label == data?.type);
    // if (!vtype && !vtype?.length) return;
    // setValue("vtype", vtype[0]?.key);
    console.log("MODIFIED", { selectedList, data, errors });

    let _file = data?.fileUrl?.length ? data?.fileUrl[0] : null;
    console.log(_file);
    let file_url = null;

    // return;
    if (!selectedList || !selectedList?.length) {
      setError("Please select doctors!");
      // setFError("doc_list", "Doctors not selected!");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }

    let _data = {
      note: data?.note,
      active: data?.active ? 1 : 0,
      docIDs: selectedList?.map((itm) => itm.doc_id).join(),
      idCount: selectedList.length,
      // date: data?.date,
      date: data?.date_to,
    };
    console.log("PAYLOAD>>>>>", { _data });
    // return;
    let res = await fetch(SERVER_PATH + "/api/note/insertnote", {
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
    if (result && result?.note_data && result?.note_data?.length) {
      setMessage("Note Created Successfully");
      resetForm();

      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } else {
      setError("Note Creation Failed");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const handleDocListChange = (e) => {
    let _newID = e.target.value;
    console.log("IDDDDD", _newID);

    if (_newID == "all") {
      setSelectedList(doctorList);
      return;
    } else if (_newID == "allrem") {
      setSelectedList([]);
      setValue("doc_list", "");
      return;
    } else if (_newID == "") {
      return;
    }

    let alreadyExists = selectedList?.filter((itm) => itm.doc_id == _newID);
    if (alreadyExists?.length > 0) return;
    // setValue("vtype", e.target.key);

    console.log({ doctorList });

    let row = doctorList?.filter((itm) => itm.doc_id == _newID);
    console.log({ row });
    let _new_doc = {
      doc_id: _newID,
      first_name: row[0]?.first_name,
      middle_name: row[0]?.middle_name,
      last_name: row[0]?.last_name,
    };

    let _list = [...selectedList];
    _list.push(_new_doc);
    console.log({ _list });
    setSelectedList(_list);
  };
  console.log({ error, message, user });

  return (
    <div class="g-sidenav-show  bg-gray-100">
      <SideMenu type="admin" />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Header type="admin" />
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
                          <h6 className="centered">New Note </h6>
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
                                      <div className="username col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                        <label
                                          className="form__label"
                                          for="active"
                                        >
                                          {/* Show Upto Date{" "} */}
                                          Active
                                        </label>
                                        <input
                                          // className="form-control"
                                          type="checkbox"
                                          id="active"
                                          // checked={}
                                          // value={"2023-04-15"}
                                          // defaultValue={moment(new Date())
                                          // .add(4, "day")
                                          // .format("yyyy-MM-DD")}
                                          // value={nextVisitDate}
                                          {...register("active")}
                                          // required={true}
                                          // onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      {/* <div className="username col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                        <label
                                          className="form__label"
                                          for="date"
                                        >
                                          Blog Date{" "}
                                        </label>
                                        <input
                                          className="form-control"
                                          type="date"
                                          id="date"
                                          // value={"2023-04-15"}
                                          // defaultValue={moment(new Date()).format(
                                          //   "yyyy-MM-DD"
                                          // )}
                                          // value={}
                                          {...register("date")}
                                          // required={true}
                                          onChange={handleChangeBlogDate}
                                        />
                                      </div> */}
                                      <div className="username col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                        <label
                                          className="form__label"
                                          for="date_to"
                                        >
                                          {/* Show Upto Date{" "} */}
                                          Note Date
                                        </label>
                                        <input
                                          className="form-control"
                                          type="date"
                                          id="date_to"
                                          // value={"2023-04-15"}
                                          // defaultValue={moment(new Date())
                                          // .add(4, "day")
                                          // .format("yyyy-MM-DD")}
                                          // value={nextVisitDate}
                                          {...register("date_to")}
                                          // required={true}
                                          // onChange={handleChange}
                                        />
                                      </div>
                                      <div className="username  col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                        <label
                                          className="form__label"
                                          for="doc_list"
                                        >
                                          Doctors{" "}
                                        </label>
                                        <select
                                          className="form-control"
                                          // doc_list="text"
                                          // multiple={true}
                                          id="doc_list"
                                          // placeholder="doc_list"
                                          // {...register("doc_list")}
                                          // required={true}
                                          // onChange={handleChange}
                                          //   value={"Doctor"}
                                          onChange={(e) => {
                                            handleDocListChange(e);
                                          }}
                                        >
                                          {doctorList?.map((item, inx) => {
                                            let full_name = `${
                                              item.first_name
                                            } ${
                                              item.middle_name
                                                ? item.middle_name
                                                : ""
                                            } ${item.last_name}`;
                                            if (inx == 0) {
                                              return (
                                                <>
                                                  <option value={""}>
                                                    {"Select"}
                                                  </option>
                                                  <option value={"all"}>
                                                    {"Select All"}
                                                  </option>
                                                  <option value={"allrem"}>
                                                    {"Remove All"}
                                                  </option>

                                                  <option value={""} disabled>
                                                    {"───────────────────"}
                                                  </option>

                                                  <option value={item.doc_id}>
                                                    {full_name}
                                                  </option>
                                                </>
                                              );
                                            } else {
                                              return (
                                                <option value={item.doc_id}>
                                                  {full_name}
                                                </option>
                                              );
                                            }
                                          })}
                                        </select>
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="username col-xl-12 col-sm-12 mb-xl-0 mb-4">
                                        {selectedList?.map((docs, jx) => {
                                          let full_name = `${docs.first_name} ${
                                            docs.middle_name
                                              ? docs.middle_name
                                              : ""
                                          } ${docs.last_name}`;
                                          return (
                                            <>
                                              {" "}
                                              <label
                                                className="form__label mx-4"
                                                for="doc_name"
                                              >
                                                <a
                                                  class="mb-0 cursor-pointer"
                                                  style={{ width: 1 }}
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    let _lst =
                                                      selectedList.filter(
                                                        (itm) =>
                                                          itm.doc_id !=
                                                          docs.doc_id
                                                      );
                                                    console.log({ _lst });
                                                    setSelectedList(_lst);
                                                  }}
                                                >
                                                  <i class="fas fa-minus mx-5"></i>
                                                </a>
                                                {"   "}
                                                {full_name}
                                              </label>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="username  col-xl-12 col-sm-12 mb-xl-0 mb-4">
                                        <label
                                          className="form__label"
                                          for="note"
                                        >
                                          Note{" "}
                                        </label>
                                        <input
                                          className="form-control"
                                          // type="text"
                                          // multiple={true}
                                          id="note"
                                          placeholder="Note"
                                          {...register("note")}
                                          required={true}
                                          // onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    {/* <div className="row">
                                      <div className="username  col-xl-12 col-sm-12 mb-xl-0 mb-4">
                                        <label
                                          className="form__label"
                                          for="message"
                                        >
                                          Blog Message{" "}
                                        </label>
                                        <textarea
                                          className="form-control"
                                          // type="text"
                                          // multiple={true}
                                          id="message"
                                          placeholder="Message"
                                          {...register("message")}
                                          required={true}
                                          // onChange={handleChange}
                                        />
                                      </div>
                                    </div> */}
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

export default CreateNote;
