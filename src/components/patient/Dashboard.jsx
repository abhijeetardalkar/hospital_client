import React, { useEffect, useState } from "react";
import SideMenu from "../SideMenu";
import {
  getKey,
  getPatientAppointmentData,
  removeKey,
} from "../utils/commonFunctions";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import BlogViewer from "../blogs/BlogViewer";
import moment from "moment";
const Dashboard = () => {
  //   return <SideMenu />;
  const [patientAppointments, setPatientAppointments] = useState(null);
  const [patientAppointmentsLastDay, setPatientAppointmentsLastDay] =
    useState(null);
  const [patientAppointmentsLastWeek, setPatientAppointmentsLastWeek] =
    useState(null);

  console.log("loading dAsh");
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  useEffect(() => {
    let user = JSON.parse(getKey("user"));
    setUserID(user?.user_id || null);
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
      async function a() {
        // Today
        // let res = await getPatientAppointmentData(
        //   user?.user_id,
        //   moment(new Date()),
        //   moment(new Date())
        // );
        // // console.log("ABBB LAST WEEK:::", { res });

        // if (res?.history_data?.length) {
        //   setPatientAppointments(res?.history_data);
        // }
        //Yesterday
        // let res2 = await getPatientAppointmentData(
        //   user?.user_id,
        //   moment(new Date()).subtract(1, "days"),
        //   moment(new Date())
        // );
        // // console.log("ABBB LAST WEEK:::", { res2 });

        // if (res2?.history_data?.length) {
        //   setPatientAppointmentsLastDay(res2?.history_data);
        // }

        // //Last Week
        let res3 = await getPatientAppointmentData(
          user?.user_id,
          moment(new Date()).subtract(7, "days"),
          moment(new Date())
        );
        console.log("ABBB LAST WEEK:::", { res3 });

        if (res3?.history_data?.length) {
          setPatientAppointmentsLastWeek(res3?.history_data);
        }
      }
      a();
    }
  }, []);
  if (!userID) {
    return null;
  }
  const totalDoctorCollection = (patientData) => {
    let amount_paid = 0,
      amount_rem = 0;
    patientData?.map((item, inx) => {
      amount_paid += item.paid_fees;
      amount_rem += item.remaining_fees;
    });
    return { paid: amount_paid, rem: amount_rem };
  };

  return (
    <div class="g-sidenav-show  bg-gray-100">
      <SideMenu type="patient" />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        {/* <!-- Navbar --> */}
        <Header type="patient" />
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
                          Money Paid (Due)
                        </p>
                        <h5 class="font-weight-bolder mb-0 text-success">
                          {
                            totalDoctorCollection(patientAppointmentsLastWeek)
                              .paid
                          }
                          <span class="text-danger text-sm font-weight-bolder">
                            {"  "} (
                            {
                              totalDoctorCollection(patientAppointmentsLastWeek)
                                .rem
                            }
                            )
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
            <div class="col-xl-6 col-sm-6 mb-xl-0 mb-4">
              <div class="card">
                <div class="card-body p-3">
                  <div class="row">
                    <div class="col-8">
                      <div class="numbers">
                        <p class="text-sm mb-0 text-capitalize font-weight-bold">
                          Last Appointment Remark
                        </p>
                        <h5 class="font-weight-bolder mb-0">
                          {patientAppointmentsLastWeek &&
                          patientAppointmentsLastWeek?.length
                            ? patientAppointmentsLastWeek[0]?.remark
                            : ""}
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
            {/* <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div class="card">
                <div class="card-body p-3">
                  <div class="row">
                    <div class="col-8">
                      <div class="numbers">
                        <p class="text-sm mb-0 text-capitalize font-weight-bold">
                          New Clients
                        </p>
                        <h5 class="font-weight-bolder mb-0">
                          +3,462
                          <span class="text-danger text-sm font-weight-bolder">
                            -2%
                          </span>
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
            </div> */}
            <div class="col-xl-3 col-sm-6">
              <div class="card">
                <div class="card-body p-3">
                  <div class="row">
                    <div class="col-8">
                      <div class="numbers">
                        <p class="text-sm mb-0 text-capitalize font-weight-bold">
                          Next Visit Date
                        </p>
                        <h5 class="font-weight-bolder mb-0">
                          {patientAppointmentsLastWeek &&
                          patientAppointmentsLastWeek?.length &&
                          patientAppointmentsLastWeek[0]?.next_visit_date
                            ? moment(
                                patientAppointmentsLastWeek[0]?.next_visit_date
                              ).format("DD MMM yyyy")
                            : ""}
                          {/* <span class="text-success text-sm font-weight-bolder">
                            +5%
                          </span> */}
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

          <BlogViewer type={2} userType="doctor" />

          {/* <div class="col-lg-5">
          <div class="card h-100 p-3">
            <div class="overflow-hidden position-relative border-radius-lg bg-cover h-100" style="background-image: url('../assets/img/ivancik.jpg');">
              <span class="mask bg-gradient-dark"></span>
              <div class="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                <h5 class="text-white font-weight-bolder mb-4 pt-2">Work with the rockets</h5>
                <p class="text-white">Wealth creation is an evolutionarily recent positive-sum game. It is all about who take the opportunity first.</p>
                <a class="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto" href="javascript:;">
                  Read More
                  <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
