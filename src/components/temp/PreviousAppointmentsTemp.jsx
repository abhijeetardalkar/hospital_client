import React, { useEffect, useState } from "react";
import { getAppointmentData, getKey } from "../utils/commonFunctions";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SideMenu from "../SideMenu";
import Header from "../Header";

const PreviousAppointments = () => {
  const [user, setUser] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    let user = JSON.parse(getKey("user"));
    setUser(user || null);

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
        //Last Week
        let res3 = await getAppointmentData(
          "getAppointmentByDoctor",
          moment(new Date()).subtract(1, "days"),
          user?.user_id,
          "=",
          moment(new Date())
        );
        console.log("ABBB LAST WEEK:::", { res3 });

        if (res3?.history_data?.length) {
          setAppointmentData(res3?.history_data);
        }
      }
      a();
    }
  }, []);
  if (!user) {
    return null;
  }
  return (
    <div class="g-sidenav-show  bg-gray-100">
      <SideMenu type="doctor" />

      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Header type="doctor"></Header>

        <div class="container-fluid py-4">
          <div class="row">
            <div class="col-12">
              <div class="card mb-4">
                <div class="card-header pb-0">
                  <h6>Authors table</h6>
                </div>
                <div class="card-body px-0 pt-0 pb-2">
                  <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Author
                          </th>
                          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Function
                          </th>
                          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Status
                          </th>
                          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Employed
                          </th>
                          <th class="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div class="d-flex px-2 py-1">
                              <div>
                                <img
                                  src="./img/team-2.jpg"
                                  class="avatar avatar-sm me-3"
                                  alt="user1"
                                />
                              </div>
                              <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">John Michael</h6>
                                <p class="text-xs text-secondary mb-0">
                                  john@creative-tim.com
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p class="text-xs font-weight-bold mb-0">Manager</p>
                            <p class="text-xs text-secondary mb-0">
                              Organization
                            </p>
                          </td>
                          <td class="align-middle text-center text-sm">
                            <span class="badge badge-sm bg-gradient-success">
                              Online
                            </span>
                          </td>
                          <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">
                              23/04/18
                            </span>
                          </td>
                          <td class="align-middle">
                            <a
                              href="javascript:;"
                              class="text-secondary font-weight-bold text-xs"
                              data-toggle="tooltip"
                              data-original-title="Edit user"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="d-flex px-2 py-1">
                              <div>
                                <img
                                  src="./img/team-3.jpg"
                                  class="avatar avatar-sm me-3"
                                  alt="user2"
                                />
                              </div>
                              <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">Alexa Liras</h6>
                                <p class="text-xs text-secondary mb-0">
                                  alexa@creative-tim.com
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p class="text-xs font-weight-bold mb-0">
                              Programator
                            </p>
                            <p class="text-xs text-secondary mb-0">Developer</p>
                          </td>
                          <td class="align-middle text-center text-sm">
                            <span class="badge badge-sm bg-gradient-secondary">
                              Offline
                            </span>
                          </td>
                          <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">
                              11/01/19
                            </span>
                          </td>
                          <td class="align-middle">
                            <a
                              href="javascript:;"
                              class="text-secondary font-weight-bold text-xs"
                              data-toggle="tooltip"
                              data-original-title="Edit user"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="d-flex px-2 py-1">
                              <div>
                                <img
                                  src="./img/team-4.jpg"
                                  class="avatar avatar-sm me-3"
                                  alt="user3"
                                />
                              </div>
                              <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">Laurent Perrier</h6>
                                <p class="text-xs text-secondary mb-0">
                                  laurent@creative-tim.com
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p class="text-xs font-weight-bold mb-0">
                              Executive
                            </p>
                            <p class="text-xs text-secondary mb-0">Projects</p>
                          </td>
                          <td class="align-middle text-center text-sm">
                            <span class="badge badge-sm bg-gradient-success">
                              Online
                            </span>
                          </td>
                          <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">
                              19/09/17
                            </span>
                          </td>
                          <td class="align-middle">
                            <a
                              href="javascript:;"
                              class="text-secondary font-weight-bold text-xs"
                              data-toggle="tooltip"
                              data-original-title="Edit user"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="d-flex px-2 py-1">
                              <div>
                                <img
                                  src="./img/team-3.jpg"
                                  class="avatar avatar-sm me-3"
                                  alt="user4"
                                />
                              </div>
                              <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">Michael Levi</h6>
                                <p class="text-xs text-secondary mb-0">
                                  michael@creative-tim.com
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p class="text-xs font-weight-bold mb-0">
                              Programator
                            </p>
                            <p class="text-xs text-secondary mb-0">Developer</p>
                          </td>
                          <td class="align-middle text-center text-sm">
                            <span class="badge badge-sm bg-gradient-success">
                              Online
                            </span>
                          </td>
                          <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">
                              24/12/08
                            </span>
                          </td>
                          <td class="align-middle">
                            <a
                              href="javascript:;"
                              class="text-secondary font-weight-bold text-xs"
                              data-toggle="tooltip"
                              data-original-title="Edit user"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="d-flex px-2 py-1">
                              <div>
                                <img
                                  src="./img/team-2.jpg"
                                  class="avatar avatar-sm me-3"
                                  alt="user5"
                                />
                              </div>
                              <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">Richard Gran</h6>
                                <p class="text-xs text-secondary mb-0">
                                  richard@creative-tim.com
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p class="text-xs font-weight-bold mb-0">Manager</p>
                            <p class="text-xs text-secondary mb-0">Executive</p>
                          </td>
                          <td class="align-middle text-center text-sm">
                            <span class="badge badge-sm bg-gradient-secondary">
                              Offline
                            </span>
                          </td>
                          <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">
                              04/10/21
                            </span>
                          </td>
                          <td class="align-middle">
                            <a
                              href="javascript:;"
                              class="text-secondary font-weight-bold text-xs"
                              data-toggle="tooltip"
                              data-original-title="Edit user"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="d-flex px-2 py-1">
                              <div>
                                <img
                                  src="./img/team-4.jpg"
                                  class="avatar avatar-sm me-3"
                                  alt="user6"
                                />
                              </div>
                              <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">Miriam Eric</h6>
                                <p class="text-xs text-secondary mb-0">
                                  miriam@creative-tim.com
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p class="text-xs font-weight-bold mb-0">
                              Programtor
                            </p>
                            <p class="text-xs text-secondary mb-0">Developer</p>
                          </td>
                          <td class="align-middle text-center text-sm">
                            <span class="badge badge-sm bg-gradient-secondary">
                              Offline
                            </span>
                          </td>
                          <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">
                              14/09/20
                            </span>
                          </td>
                          <td class="align-middle">
                            <a
                              href="javascript:;"
                              class="text-secondary font-weight-bold text-xs"
                              data-toggle="tooltip"
                              data-original-title="Edit user"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-8">
              <div class="row">
                <div class="col-xl-6 mb-xl-0 mb-4">
                  <div class="card bg-transparent shadow-xl">
                    <div
                      class="overflow-hidden position-relative border-radius-xl"
                      style={{
                        backgroundImage:
                          "url('./img/curved-images/curved14.jpg')",
                      }}
                    >
                      <span class="mask bg-gradient-dark"></span>
                      <div class="card-body position-relative z-index-1 p-3">
                        <i class="fas fa-wifi text-white p-2"></i>
                        <h5 class="text-white mt-4 mb-5 pb-2">
                          4562&nbsp;&nbsp;&nbsp;1122&nbsp;&nbsp;&nbsp;4594&nbsp;&nbsp;&nbsp;7852
                        </h5>
                        <div class="d-flex">
                          <div class="d-flex">
                            <div class="me-4">
                              <p class="text-white text-sm opacity-8 mb-0">
                                Card Holder
                              </p>
                              <h6 class="text-white mb-0">Jack Peterson</h6>
                            </div>
                            <div>
                              <p class="text-white text-sm opacity-8 mb-0">
                                Expires
                              </p>
                              <h6 class="text-white mb-0">11/22</h6>
                            </div>
                          </div>
                          <div class="ms-auto w-20 d-flex align-items-end justify-content-end">
                            <img
                              class="w-60 mt-2"
                              src="./img/logos/mastercard.png"
                              alt="logo"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="card">
                        <div class="card-header mx-4 p-3 text-center">
                          <div class="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                            <i class="fas fa-landmark opacity-10"></i>
                          </div>
                        </div>
                        <div class="card-body pt-0 p-3 text-center">
                          <h6 class="text-center mb-0">Salary</h6>
                          <span class="text-xs">Belong Interactive</span>
                          <hr class="horizontal dark my-3" />
                          <h5 class="mb-0">+$2000</h5>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 mt-md-0 mt-4">
                      <div class="card">
                        <div class="card-header mx-4 p-3 text-center">
                          <div class="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                            <i class="fab fa-paypal opacity-10"></i>
                          </div>
                        </div>
                        <div class="card-body pt-0 p-3 text-center">
                          <h6 class="text-center mb-0">Paypal</h6>
                          <span class="text-xs">Freelance Payment</span>
                          <hr class="horizontal dark my-3" />
                          <h5 class="mb-0">$455.00</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mb-lg-0 mb-4">
                  <div class="card mt-4">
                    <div class="card-header pb-0 p-3">
                      <div class="row">
                        <div class="col-6 d-flex align-items-center">
                          <h6 class="mb-0">Payment Method</h6>
                        </div>
                        <div class="col-6 text-end">
                          <a
                            class="btn bg-gradient-dark mb-0"
                            href="javascript:;"
                          >
                            <i class="fas fa-plus"></i>&nbsp;&nbsp;Add New Card
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="card-body p-3">
                      <div class="row">
                        <div class="col-md-6 mb-md-0 mb-4">
                          <div class="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                            <img
                              class="w-10 me-3 mb-0"
                              src="./img/logos/mastercard.png"
                              alt="logo"
                            />
                            <h6 class="mb-0">
                              ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852
                            </h6>
                            <i
                              class="fas fa-pencil-alt ms-auto text-dark cursor-pointer"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Edit Card"
                            ></i>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                            <img
                              class="w-10 me-3 mb-0"
                              src="./img/logos/visa.png"
                              alt="logo"
                            />
                            <h6 class="mb-0">
                              ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;5248
                            </h6>
                            <i
                              class="fas fa-pencil-alt ms-auto text-dark cursor-pointer"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Edit Card"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card h-100">
                <div class="card-header pb-0 p-3">
                  <div class="row">
                    <div class="col-6 d-flex align-items-center">
                      <h6 class="mb-0">Invoices</h6>
                    </div>
                    <div class="col-6 text-end">
                      <button class="btn btn-outline-primary btn-sm mb-0">
                        View All
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body p-3 pb-0">
                  <ul class="list-group">
                    <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                      <div class="d-flex flex-column">
                        <h6 class="mb-1 text-dark font-weight-bold text-sm">
                          March, 01, 2020
                        </h6>
                        <span class="text-xs">#MS-415646</span>
                      </div>
                      <div class="d-flex align-items-center text-sm">
                        $180
                        <button class="btn btn-link text-dark text-sm mb-0 px-0 ms-4">
                          <i class="fas fa-file-pdf text-lg me-1"></i> PDF
                        </button>
                      </div>
                    </li>
                    <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                      <div class="d-flex flex-column">
                        <h6 class="text-dark mb-1 font-weight-bold text-sm">
                          February, 10, 2021
                        </h6>
                        <span class="text-xs">#RV-126749</span>
                      </div>
                      <div class="d-flex align-items-center text-sm">
                        $250
                        <button class="btn btn-link text-dark text-sm mb-0 px-0 ms-4">
                          <i class="fas fa-file-pdf text-lg me-1"></i> PDF
                        </button>
                      </div>
                    </li>
                    <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                      <div class="d-flex flex-column">
                        <h6 class="text-dark mb-1 font-weight-bold text-sm">
                          April, 05, 2020
                        </h6>
                        <span class="text-xs">#FB-212562</span>
                      </div>
                      <div class="d-flex align-items-center text-sm">
                        $560
                        <button class="btn btn-link text-dark text-sm mb-0 px-0 ms-4">
                          <i class="fas fa-file-pdf text-lg me-1"></i> PDF
                        </button>
                      </div>
                    </li>
                    <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                      <div class="d-flex flex-column">
                        <h6 class="text-dark mb-1 font-weight-bold text-sm">
                          June, 25, 2019
                        </h6>
                        <span class="text-xs">#QW-103578</span>
                      </div>
                      <div class="d-flex align-items-center text-sm">
                        $120
                        <button class="btn btn-link text-dark text-sm mb-0 px-0 ms-4">
                          <i class="fas fa-file-pdf text-lg me-1"></i> PDF
                        </button>
                      </div>
                    </li>
                    <li class="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                      <div class="d-flex flex-column">
                        <h6 class="text-dark mb-1 font-weight-bold text-sm">
                          March, 01, 2019
                        </h6>
                        <span class="text-xs">#AR-803481</span>
                      </div>
                      <div class="d-flex align-items-center text-sm">
                        $300
                        <button class="btn btn-link text-dark text-sm mb-0 px-0 ms-4">
                          <i class="fas fa-file-pdf text-lg me-1"></i> PDF
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreviousAppointments;
