import moment from "moment";
import React, { useEffect, useState } from "react";

const TreatmentCurrent = ({ currentTreatment }) => {
  // if (!currentTreatment) return <div>No data available</div>;
  const [lastRow, setLastRow] = useState(null);

  useEffect(() => {
    console.log({ currentTreatment });
    if (!currentTreatment && !currentTreatment?.length) {
      setLastRow(null);
      return;
    }

    // _length = currentTreatment?.length - 1;
    setLastRow(currentTreatment[0]);
  }, [currentTreatment]);
  return (
    <div class="col-md-5 mt-4">
      <div class="card h-100">
        {/* <div class="card h-100 mb-4"> */}
        <div class="card-header pb-0 px-3">
          <div class="row">
            <div class="col-md-6">
              <h6 class="mb-0">Current Treatment</h6>
            </div>
            {lastRow && (
              <div class="col-md-6 d-flex justify-content-end align-items-center">
                <i class="far fa-calendar-alt me-2"></i>
                <small>
                  {moment(lastRow?.visit_date).format("DD MMMM yyyy")}
                </small>
              </div>
            )}
          </div>
        </div>
        {lastRow && (
          <div class="card-body pt-4 p-3">
            <h6 class="text-uppercase text-body text-xs font-weight-bolder mb-3">
              Newest
            </h6>

            <ul class="list-group">
              <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                <div class="d-flex align-items-center">
                  <button class="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">
                    <i class="fas fa-circle" aria-hidden="true"></i>
                  </button>
                  <div class="d-flex flex-column">
                    <h6 class="mb-1 text-dark text-sm">{"Symptoms"}</h6>
                    <span class="text-xs">{lastRow?.symptom_desc}</span>
                  </div>
                </div>{" "}
                <div class="d-flex flex-column">
                  <h6 class="mb-1 text-dark text-sm text-xs">
                    {" "}
                    Next Visit Date
                  </h6>
                  <div class="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold">
                    {moment(lastRow?.next_visit_date).format("DD MMMM yyyy")}
                  </div>
                  {/* <span class="text-xs">27 March 2020, at 12:30 PM</span> */}
                </div>
              </li>
              <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                <div class="d-flex align-items-center">
                  <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">
                    <i class="fas fa-circle"></i>
                  </button>
                  <div class="d-flex flex-column">
                    <h6 class="mb-1 text-dark text-sm">
                      {"Treatment Description"}
                    </h6>
                    <span class="text-xs"> {lastRow?.treatment_desc}</span>
                  </div>
                </div>
              </li>
              <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                <div class="d-flex align-items-center">
                  <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">
                    <i class="fas fa-circle"></i>
                  </button>
                  <div class="d-flex ">
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">{"Remark"}</h6>
                      <span class="text-xs"> {lastRow?.remark}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            {/* <h6 class="text-uppercase text-body text-xs font-weight-bolder my-3">
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
                  <span class="text-xs">26 March 2020, at 13:45 PM</span>
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
                  <span class="text-xs">26 March 2020, at 12:30 PM</span>
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
                  <span class="text-xs">26 March 2020, at 08:30 AM</span>
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
                  <span class="text-xs">26 March 2020, at 05:00 AM</span>
                </div>
              </div>
              <div class="d-flex align-items-center text-dark text-sm font-weight-bold">
                Pending
              </div>
            </li>
          </ul> */}
          </div>
        )}
        {(!currentTreatment || !currentTreatment?.length) && (
          <div class="card-body pt-4 p-3">
            <ul class="list-group">
              <li class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
                <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm">No history available</h6>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentCurrent;
