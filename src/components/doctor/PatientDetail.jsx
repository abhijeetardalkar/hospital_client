import React from "react";

const PatientDetail = ({ patientDetail }) => {
  return (
    <div class="col-lg-4">
      <div class="card h-100">
        <div class="card-header pb-0 p-3">
          <div class="row">
            <div class="col-6 d-flex align-items-center">
              <h6 class="mb-0">Patient Information</h6>
            </div>
            <div class="col-6 text-end">
              <button class="btn btn-outline-primary btn-sm mb-0">
                View All
              </button>
            </div>
          </div>
        </div>
        <div class="card-body p-3 pb-0">
          {!patientDetail && (
            <li class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
              <div class="d-flex flex-column">
                <h6 class="mb-3 text-sm">Patient is not registered</h6>
              </div>
            </li>
          )}
          {patientDetail && (
            <div className="row">
              <div class="col-12 col-xl-12">
                <div class="card h-100">
                  <div class="card-header pb-0 p-3">
                    <div class="row">
                      <div class="col-md-8 d-flex align-items-center">
                        <h6 class="mb-0">{patientDetail?.login_id}</h6>
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
                        <strong class="text-dark">Full Name:</strong> &nbsp;{" "}
                        {`${patientDetail?.first_name} ${patientDetail?.middle_name} ${patientDetail?.last_name}`}
                      </li>
                      <li class="list-group-item border-0 ps-0 text-sm">
                        <strong class="text-dark">Mobile:</strong> &nbsp;{" "}
                        {patientDetail?.mobile}
                      </li>
                      <li class="list-group-item border-0 ps-0 text-sm">
                        <strong class="text-dark">Email:</strong> &nbsp;{" "}
                        {patientDetail?.email}
                      </li>
                      {/* <li class="list-group-item border-0 ps-0 text-sm">
                        <strong class="text-dark">Location:</strong> &nbsp;{" "}
                        {`${
                          patientDetail?.address ? patientDetail?.address : ""
                        } ${
                          patientDetail?.pincode ? patientDetail?.pincode : ""
                        }`}
                      </li> */}
                      {/* <li class="list-group-item border-0 ps-0 pb-0">
                        <strong class="text-dark text-sm">Social:</strong>{" "}
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
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
