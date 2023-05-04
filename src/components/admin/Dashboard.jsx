import React, { useEffect, useState } from "react";
import SideMenu from "../SideMenu";
import {
  getAdminAppointmentData,
  getAppointmentData,
  getKey,
  removeKey,
} from "../utils/commonFunctions";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import moment from "moment";
const Dashboard = () => {
  //   return <SideMenu />;
  console.log("loading dAsh");
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [doctorAppointments, setDoctorAppointments] = useState(null);
  const [doctorAppointmentsLastDay, setDoctorAppointmentsLastDay] =
    useState(null);
  const [doctorAppointmentsLastWeek, setDoctorAppointmentsLastWeek] =
    useState(null);
  const [allAppointments, setAllAppointments] = useState(null);
  const [groupData, setGroupData] = useState(null);

  const createGroup = (data) => {
    let _obj = {};
    data.forEach(async (element, inx) => {
      // console.log({ element, _obj });
      let docID = element.doc_id;
      // let totPatient = await getDoctorAppointments(docID);
      // console.log({ totPatient });
      let _vArr =
        _obj && _obj[docID]?.length
          ? [..._obj[docID], element.visit_id]
          : [element.visit_id];
      // console.log({ _vArr });
      _obj = {
        ..._obj,

        [docID]: [..._vArr],
      };
    });
    // console.log("GROUPED", { data, _obj });

    setGroupData(_obj);
  };
  const getDoctorAppointments = async (doc_id) => {
    //Todays
    console.log("CALLING DOC PAT COUNT:");
    let res = await getAppointmentData(
      "getAppointmentByDoctor",
      new Date(),
      doc_id,
      "=",
      null
    );
    // console.log("TODAYS:::FOR", { doc_id }, { res });

    if (res?.history_data?.length) {
      return res?.history_data;
    }
  };
  useEffect(() => {
    let user = JSON.parse(getKey("user"));
    setUserID(user?.user_id || null);
    console.log("aaa", { user });
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
      async function a() {
        //All appointments
        let res_all = await getAdminAppointmentData(null, null, null);
        console.log("ALL APPO:::", { res_all });

        if (res_all?.user_data?.length) {
          setAllAppointments(res_all?.user_data);
          // createGroup(res_all?.user_data);
        }

        //Todays
        let res = await getAdminAppointmentData(
          null, //visit_id
          new Date(),
          new Date()
        );
        console.log("TODAYS:::", { res });

        if (res?.user_data?.length) {
          setDoctorAppointments(res?.user_data);
          createGroup(res?.user_data);
        }
        //Todays
        let res2 = await getAdminAppointmentData(
          null, //visit_id
          moment(new Date()).subtract(1, "days"),
          new Date()
        );
        console.log("YESTERDAYS:::", { res2 });

        if (res2?.user_data?.length) {
          setDoctorAppointmentsLastDay(res2?.user_data);
        }

        //Last Week
        let res3 = await getAdminAppointmentData(
          null, //visit_id
          moment(new Date()).subtract(7, "days"),
          new Date()
        );
        console.log("TODAYS:::", { res3 });

        if (res3?.user_data?.length) {
          setDoctorAppointmentsLastWeek(res3?.user_data);
        }
      }
      a();
    }
  }, []);
  if (!userID) {
    return null;
  }
  const totalDoctorCollection = () => {
    let amount_paid = 0,
      amount_rem = 0;
    doctorAppointments?.map((item, inx) => {
      amount_paid += item.paid_fees;
      amount_rem += item.remaining_fees;
    });
    return { paid: amount_paid, rem: amount_rem };
  };
  console.log({ groupData });
  const filterByID = (field, idd, dataSet) => {
    console.log({ idd, allAppointments });
    let row = dataSet?.filter((itm) => itm[field] == idd);
    console.log({ row });
    return row;
  };
  console.log("ARDAL", { doctorAppointments });
  return (
    <div class="g-sidenav-show  bg-gray-100">
      <SideMenu type="admin" />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        {/* <!-- Navbar --> */}
        <Header type="admin" />
        {/* <!-- End Navbar --> */}
        <div class="container-fluid py-4">
          <div class="row">
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div class="card">
                <div class="card-body p-3">
                  <div class="row">
                    <div class="col-8">
                      <div class="numbers">
                        <p class="text-sm mb-0 text-capitalize font-weight-bold">
                          Today's Patients
                        </p>
                        <h5 class="font-weight-bolder mb-0">
                          {doctorAppointments?.length}
                          <span class="text-success text-sm font-weight-bolder">
                            {doctorAppointments?.length &&
                            doctorAppointmentsLastDay?.length
                              ? ` (${(
                                  (doctorAppointments?.length /
                                    doctorAppointmentsLastDay?.length) *
                                  100
                                ).toFixed(2)}%)`
                              : ""}
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div class="col-4 text-end">
                      <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          class="ni ni-money-coins text-lg opacity-10"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div class="card">
                <div class="card-body p-3">
                  <div class="row">
                    <div class="col-8">
                      <div class="numbers">
                        <p class="text-sm mb-0 text-capitalize font-weight-bold">
                          Yesterday's Patients
                        </p>
                        <h5 class="font-weight-bolder mb-0">
                          {doctorAppointmentsLastDay?.length}
                          {/* <span class="text-success text-sm font-weight-bolder">
                            +3%
                          </span> */}
                        </h5>
                      </div>
                    </div>
                    <div class="col-4 text-end">
                      <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          class="ni ni-world text-lg opacity-10"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div class="card">
                <div class="card-body p-3">
                  <div class="row">
                    <div class="col-8">
                      <div class="numbers">
                        <p class="text-sm mb-0 text-capitalize font-weight-bold">
                          Last Week Patients
                        </p>
                        <h5 class="font-weight-bolder mb-0">
                          {doctorAppointmentsLastWeek?.length}
                          {/* <span class="text-danger text-sm font-weight-bolder">
                            -2%
                          </span> */}
                        </h5>
                      </div>
                    </div>
                    <div class="col-4 text-end">
                      <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          class="ni ni-paper-diploma text-lg opacity-10"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6">
              <div class="card">
                <div class="card-body p-3">
                  <div class="row">
                    <div class="col-8">
                      <div class="numbers">
                        <p class="text-sm mb-0 text-capitalize font-weight-bold">
                          Today's Money
                        </p>
                        <h5 class="font-weight-bolder mb-0 text-success">
                          {totalDoctorCollection().paid}
                          <span class="text-danger text-sm font-weight-bolder">
                            {"  "} ({totalDoctorCollection().rem})
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div class="col-4 text-end">
                      <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          class="ni ni-cart text-lg opacity-10"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-7 mt-4">
              <div class="card">
                <div class="card-header pb-0 px-3">
                  <h6 class="mb-0">Latest Doctor Appointments</h6>
                </div>
                <div class="card-body pt-4 p-3">
                  <ul class="list-group">
                    {groupData ? (
                      Object.entries(groupData).map((item) => {
                        console.log({ item });
                        let _doc_id = parseInt(item[0]);
                        let _pat_count = item[1]?.length;
                        let _visit_info = filterByID(
                          "doc_id",
                          item[0],
                          doctorAppointments
                        );
                        console.log("NEW DOC----", {
                          _doc_id,
                          _pat_count,
                          _visit_info,
                        });
                        // let _doc_name = _visit_info?.doc_name;
                        return (
                          <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                            <div class="d-flex flex-column">
                              <h6 class="mb-3 text-sm">
                                {_visit_info[0].doc_name}
                              </h6>
                              <span class="mb-2 text-xs">
                                Patient Count:
                                <span class="text-dark font-weight-bold ms-sm-2">
                                  {_visit_info?.length}
                                </span>
                              </span>
                              {/*<span class="mb-2 text-xs">
                                Email Address:
                                <span class="text-dark ms-sm-2 font-weight-bold">
                                  oliver@burrito.com
                                </span>
                              </span>
                              <span class="text-xs">
                                VAT Number:
                                <span class="text-dark ms-sm-2 font-weight-bold">
                                  FRB1235476
                                </span>
                              </span> */}
                            </div>
                            <div class="ms-auto text-end">
                              {/* <a
                                class="btn btn-link text-danger text-gradient px-3 mb-0"
                                href="javascript:;"
                              >
                                <i class="far fa-trash-alt me-2"></i>
                              </a> */}
                              {/* <a
                                class="btn btn-link text-dark px-3 mb-0"
                                href="javascript:;"
                              >
                                <i
                                  class="fas fa-pencil-alt text-dark me-2"
                                  aria-hidden="true"
                                ></i>
                                Edit
                              </a> */}
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <h5>No Data</h5>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-5 mt-4">
              {/* <div class="card h-100 mb-4">
                <div class="card-header pb-0 px-3">
                  <div class="row">
                    <div class="col-md-6">
                      <h6 class="mb-0">Your Transaction's</h6>
                    </div>
                    <div class="col-md-6 d-flex justify-content-end align-items-center">
                      <i class="far fa-calendar-alt me-2"></i>
                      <small>23 - 30 March 2020</small>
                    </div>
                  </div>
                </div>
                <div class="card-body pt-4 p-3">
                  <h6 class="text-uppercase text-body text-xs font-weight-bolder mb-3">
                    Newest
                  </h6>
                  <ul class="list-group">
                    <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                      <div class="d-flex align-items-center">
                        <button class="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">
                          <i class="fas fa-arrow-down"></i>
                        </button>
                        <div class="d-flex flex-column">
                          <h6 class="mb-1 text-dark text-sm">Netflix</h6>
                          <span class="text-xs">
                            27 March 2020, at 12:30 PM
                          </span>
                        </div>
                      </div>
                      <div class="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold">
                        - $ 2,500
                      </div>
                    </li>
                    <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                      <div class="d-flex align-items-center">
                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">
                          <i class="fas fa-arrow-up"></i>
                        </button>
                        <div class="d-flex flex-column">
                          <h6 class="mb-1 text-dark text-sm">Apple</h6>
                          <span class="text-xs">
                            27 March 2020, at 04:30 AM
                          </span>
                        </div>
                      </div>
                      <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold">
                        + $ 2,000
                      </div>
                    </li>
                  </ul>
                  <h6 class="text-uppercase text-body text-xs font-weight-bolder my-3">
                    Yesterday
                  </h6>
                  <ul class="list-group">
                    <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                      <div class="d-flex align-items-center">
                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">
                          <i class="fas fa-arrow-up"></i>
                        </button>
                        <div class="d-flex flex-column">
                          <h6 class="mb-1 text-dark text-sm">Stripe</h6>
                          <span class="text-xs">
                            26 March 2020, at 13:45 PM
                          </span>
                        </div>
                      </div>
                      <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold">
                        + $ 750
                      </div>
                    </li>
                    <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                      <div class="d-flex align-items-center">
                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">
                          <i class="fas fa-arrow-up"></i>
                        </button>
                        <div class="d-flex flex-column">
                          <h6 class="mb-1 text-dark text-sm">HubSpot</h6>
                          <span class="text-xs">
                            26 March 2020, at 12:30 PM
                          </span>
                        </div>
                      </div>
                      <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold">
                        + $ 1,000
                      </div>
                    </li>
                    <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                      <div class="d-flex align-items-center">
                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">
                          <i class="fas fa-arrow-up"></i>
                        </button>
                        <div class="d-flex flex-column">
                          <h6 class="mb-1 text-dark text-sm">Creative Tim</h6>
                          <span class="text-xs">
                            26 March 2020, at 08:30 AM
                          </span>
                        </div>
                      </div>
                      <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold">
                        + $ 2,500
                      </div>
                    </li>
                    <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                      <div class="d-flex align-items-center">
                        <button class="btn btn-icon-only btn-rounded btn-outline-dark mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">
                          <i class="fas fa-exclamation"></i>
                        </button>
                        <div class="d-flex flex-column">
                          <h6 class="mb-1 text-dark text-sm">Webflow</h6>
                          <span class="text-xs">
                            26 March 2020, at 05:00 AM
                          </span>
                        </div>
                      </div>
                      <div class="d-flex align-items-center text-dark text-sm font-weight-bold">
                        Pending
                      </div>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
