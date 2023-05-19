import moment from "moment";
import { SERVER_PATH } from "../../../config";
const CARD_SPACE_HEIGHT = 600;
const storeKey = (key, value) => {
  localStorage.setItem(key, value);
};

const removeKey = (key) => {
  localStorage.removeItem(key);
};
const getKey = (key) => {
  return localStorage.getItem(key);
};

const getUser = async (_type, id) => {
  try {
    let _data = {
      id: id,
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
    // console.log({ result });
    return result;
  } catch (e) {
    console.log({ e });
  }
};

// DOCTOR DASH
const getAppointmentData = async (
  _path,
  _date,
  user_id,
  operator,
  _date2,
  decrypt = false
) => {
  // console.log({ _path, _date, user_id, operator, _date2 });
  try {
    let _data = {
      doc_id: user_id,
      visit_date: _date ? moment(_date).format("yyyy-MM-DD") : null,
      equality: operator,
      visit_date2: _date2 ? moment(_date2).format("yyyy-MM-DD") : null,
      decrypt,
    };

    // console.log("ABHIII", { _data });

    let res = await fetch(SERVER_PATH + `/api/doctor/${_path}`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
    });
    let result = await res.json();
    // console.log("CALL RES", { result });
    return result;
  } catch (e) {
    console.log({ e });
  }
};

// PATIENT DASH
const getPatientAppointmentData = async (pat_id, _date, _date2) => {
  try {
    let _data = {
      pat_id: pat_id,
      visit_date: _date ? moment(_date).format("yyyy-MM-DD") : null,
      visit_date2: _date2 ? moment(_date2).format("yyyy-MM-DD") : null,
    };

    // console.log("ABHIII", { _data });
    let res = await fetch(SERVER_PATH + `/api/doctor/getAppointmentByPatient`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
    });
    let result = await res.json();
    // console.log({ result });
    return result;
  } catch (e) {
    console.log({ e });
  }
};
// ADMIN DASH
const getAdminAppointmentData = async (visit_id, _date, _date2) => {
  try {
    let _data = {
      visit_id: visit_id,
      visit_date: _date ? moment(_date).format("yyyy-MM-DD") : null,
      visit_date2: _date2 ? moment(_date2).format("yyyy-MM-DD") : null,
    };

    // console.log("ABHIII", { _data });
    let res = await fetch(SERVER_PATH + `/api/doctor/getAppointment`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
    });
    let result = await res.json();
    // console.log({ result });
    return result;
  } catch (e) {
    console.log({ e });
  }
};

export {
  storeKey,
  removeKey,
  getKey,
  getUser,
  getAppointmentData,
  getAdminAppointmentData,
  getPatientAppointmentData,
  CARD_SPACE_HEIGHT,
};
