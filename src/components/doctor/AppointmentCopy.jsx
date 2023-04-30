import React, { useState } from "react";
import SideMenu from "../SideMenu";
import Registration from "./registration";
import moment from "moment";
import { useForm } from "react-hook-form";
import Header from "../Header";
import { getKey, getUser } from "../utils/commonFunctions";
import { SERVER_PATH } from "../../../config";
import axios from "axios";
import TreatmentCurrent from "./TreatmentCurrent";
import TreatmentHistory from "./TreatmentHistory";
import PatientDetail from "./PatientDetail";
import NewAppointment from "./NewAppointment";
const NEXT_VISIT_INTERVAL = 7;
const Appointment = () => {
  const [user, setUser] = useState(JSON.parse(getKey("user")));
  const [loginFullName, setLoginFullName] = useState("");
  const [patientDetail, setPatientDetail] = useState(null);
  const [currentTreatment, setCurrentTreatment] = useState(null);
  const [historyTreatment, setHistoryTreatment] = useState(null);
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

  // const handlePatientLoginIDChange = async (e) => {
  //   let _id = e.target.value;
  //   console.log({ _id });
  //   let _data = await getPatientDetail(_id);
  //   console.log({ _data });
  //   if (_data) {
  //     setPatientDetail(_data);
  //   } else {
  //     setPatientDetail(null);
  //   }
  // };
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
        <div class="container-fluid py-4">
          <div class="row">
            <NewAppointment
              user={user}
              loginFullName={loginFullName}
              error={error}
              message={message}
              patientDetail={patientDetail}
              setPatientDetail={setPatientDetail}
              setCurrentTreatment={setCurrentTreatment}
              setHistoryTreatment={setHistoryTreatment}
              setError={setError}
              setMessage={setMessage}
            />
            <PatientDetail patientDetail={patientDetail} />
          </div>
          <div className="row">
            <TreatmentCurrent
              currentTreatment={currentTreatment?.history_data}
            />
            <TreatmentHistory
              historyTreatment={currentTreatment?.history_data}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Appointment;
