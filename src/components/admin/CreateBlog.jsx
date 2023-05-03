import React, { useState } from "react";
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
const CreateBlog = () => {
  const [user, setUser] = useState(JSON.parse(getKey("user")));

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
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
    let vtype = VISIBILITY_TYPE?.filter((crop) => crop.label == data?.type);
    if (!vtype && !vtype?.length) return;
    // setValue("vtype", vtype[0]?.key);
    console.log("MODIFIED", { vtype, data });

    let _file = data?.fileUrl?.length ? data?.fileUrl[0] : null;
    console.log(_file);
    let file_url = null;
    if (_file) {
      // file_url = await uplaodFile(_file);
    }
    console.log({ file_url });
    // return;
    let _data = {
      title: data?.title,
      message: data?.message,
      active: data?.active,
      file_url: null, //file_url, //
      type: vtype[0]?.key,
      // date: data?.date,
      date_to: data?.date_to,
    };
    console.log("PAYLOAD>>>>>", { _data });
    // return;
    let res = await fetch(SERVER_PATH + "/api/blog/insertarticle", {
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
    if (result && result?.article_data && result?.article_data?.length) {
      setMessage("Blog Created Successfully");
      resetForm();

      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } else if (result?.article_data?.error.code == "ER_DUP_ENTRY") {
      setError("Blog Creation Failed. Duplicate Entry");
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else {
      setError("Blog Creation Failed");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };
  console.log({ error, message, user });

  return (
    <div class="g-sidenav-show  bg-gray-100">
      <SideMenu type="admin" />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Header type="admin" />
        <div class="container-fluid py-4">
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
                          <h6 className="centered">New Blog </h6>
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
                                          Blog Date
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
                                    </div>

                                    <div className="row">
                                      <div className="username  col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                        <label
                                          className="form__label"
                                          for="type"
                                        >
                                          Visibility Type{" "}
                                        </label>
                                        <select
                                          className="form-control"
                                          // type="text"
                                          // multiple={true}
                                          id="type"
                                          placeholder="type"
                                          {...register("type")}
                                          required={true}
                                          // onChange={handleChange}
                                          //   value={"Doctor"}
                                          onChange={(e) => {
                                            console.log(e.target.value);
                                            setValue("vtype", e.target.key);
                                          }}
                                        >
                                          {VISIBILITY_TYPE?.map((item) => {
                                            return (
                                              <option key={item.key}>
                                                {item.label}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                      <div className="username col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                        <label
                                          className="form__label"
                                          for="fileUrl"
                                        >
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
                                    <div className="row">
                                      <div className="username  col-xl-12 col-sm-12 mb-xl-0 mb-4">
                                        <label
                                          className="form__label"
                                          for="title"
                                        >
                                          Blog Title{" "}
                                        </label>
                                        <input
                                          className="form-control"
                                          // type="text"
                                          // multiple={true}
                                          id="title"
                                          placeholder="Blog Title"
                                          {...register("title")}
                                          required={true}
                                          // onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
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

export default CreateBlog;
