import React, { useEffect, useState } from "react";
import SideMenu from "../SideMenu";
import {
  getKey,
  removeKey,
  getAppointmentData,
} from "../utils/commonFunctions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import { SERVER_PATH } from "../../../config";
import moment from "moment";
const Dashboard = () => {
  //   return <SideMenu />;
  console.log("loading dAsh");
  const navigate = useNavigate();
  const location = useLocation();
  console.log("DOC DASH Location", location.state);
  const [userID, setUserID] = useState(null);
  const [user, setUser] = useState(null);
  const [lastDayPatientCount, setLastDayPatientCount] = useState(null);
  const [doctorAppointments, setDoctorAppointments] = useState(null);
  const [doctorAppointmentsLastDay, setDoctorAppointmentsLastDay] =
    useState(null);
  const [doctorAppointmentsLastWeek, setDoctorAppointmentsLastWeek] =
    useState(null);

  useEffect(() => {
    let user = JSON.parse(getKey("user"));
    setUser(user || null);
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
        //Todays
        let res = await getAppointmentData(
          "getAppointmentByDoctor",
          new Date(),
          user?.user_id,
          "=",
          null
        );
        console.log("TODAYS:::", { res });

        if (res?.history_data?.length) {
          setDoctorAppointments(res?.history_data);
        }
        //Yesterdays
        let res2 = await getAppointmentData(
          "getAppointmentByDoctor",
          moment(new Date()).subtract(1, "days"),
          user?.user_id,
          "=",
          null
        );
        console.log("YESTER:::", { res2 });

        if (res2?.history_data?.length) {
          setDoctorAppointmentsLastDay(res2?.history_data);
        }

        //Last Week
        let res3 = await getAppointmentData(
          "getAppointmentByDoctor",
          moment(new Date()).subtract(6, "days"),
          user?.user_id,
          "=",
          moment(new Date())
        );
        console.log("LAST WEEK:::", { res3 });

        if (res3?.history_data?.length) {
          setDoctorAppointmentsLastWeek(res3?.history_data);
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
  console.log({ user });
  return (
    <div class="g-sidenav-show  bg-gray-100">
      <SideMenu type="doctor" />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        {/* <!-- Navbar --> */}
        <Header type="doctor"></Header>
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
                          Today's Patients
                        </p>
                        <h5 class="font-weight-bolder mb-0">
                          {doctorAppointments?.length}
                          <span class="text-success text-sm font-weight-bolder">
                            {"  "}{" "}
                            {doctorAppointments?.length &&
                            doctorAppointmentsLastDay?.length
                              ? `${(
                                  (doctorAppointments?.length /
                                    doctorAppointmentsLastDay?.length) *
                                  100
                                ).toFixed(2)}%`
                              : ""}
                            {/* {"  "} ({doctorAppointmentsLastDay?.length}) */}
                          </span>
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
                          Yesterday's Patients
                        </p>
                        <h5 class="font-weight-bolder mb-0">
                          {"  "} {doctorAppointmentsLastDay?.length}
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
                          Last Week Patients
                        </p>
                        <h5 class="font-weight-bolder mb-0">
                          {doctorAppointmentsLastWeek?.length}
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
          <div class="row mt-4">
            <div class="col-lg-7 mb-lg-0 mb-4">
              <div class="card">
                <div class="card-body p-3">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="d-flex flex-column h-100">
                        <p class="mb-1 pt-2 text-bold">Built by developers</p>
                        <h5 class="font-weight-bolder">Soft UI Dashboard</h5>
                        <p class="mb-5">
                          From colors, cards, typography to complex elements,
                          you will find the full documentation.
                        </p>
                        <a
                          class="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                          href="javascript:;"
                        >
                          Read More
                          <i
                            class="fas fa-arrow-right text-sm ms-1"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                      <div class="bg-gradient-primary border-radius-lg h-100">
                        <img
                          src="/img/shapes/waves-white.svg"
                          class="position-absolute h-100 w-50 top-0 d-lg-block d-none"
                          alt="waves"
                        />
                        <div class="position-relative d-flex align-items-center justify-content-center h-100">
                          <img
                            class="w-100 position-relative z-index-2 pt-4"
                            src="/img/illustrations/rocket-white.png"
                            alt="rocket"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
