import moment from "moment";
import React from "react";

const TreatmentHistory = ({ historyTreatment }) => {
  //   if (!historyTreatment) return <div>No data available</div>;
  console.log({ historyTreatment });
  return (
    <div class="col-md-7 mt-4">
      <div class="card">
        <div class="card-header pb-0 px-3">
          {/* <h6 class="mb-0">Patient History</h6> */}

          <div class="row">
            <div class="col-md-3">
              <h6 class="mb-0">Patient History</h6>
            </div>
            {historyTreatment?.length && (
              <div class="col-md-9 d-flex justify-content-start align-items-center">
                <small>({historyTreatment?.length}) </small>
              </div>
            )}
          </div>
        </div>
        <div
          class="card-body pt-4 p-3"
          style={
            historyTreatment?.length
              ? { overflow: "scroll", maxHeight: "400px" }
              : {}
          }
        >
          <ul class="list-group">
            {historyTreatment?.map((item, inx) => {
              return (
                <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                  <div class="d-flex flex-column">
                    <h6 class="mb-3 text-sm">
                      {moment(item?.visit_date).format("DD MMMM yyyy")}
                    </h6>
                    <span class="mb-2 text-xs">
                      Symptom :
                      <span class="text-dark font-weight-bold ms-sm-2">
                        {item?.symptom_desc}
                      </span>
                    </span>
                    <span class="mb-2 text-xs">
                      Treatment Description:
                      <span class="text-dark ms-sm-2 font-weight-bold">
                        {item?.treatment_desc}
                      </span>
                    </span>
                    <span class="text-xs">
                      Remark:
                      <span class="text-dark ms-sm-2 font-weight-bold">
                        {item?.remark}
                      </span>
                    </span>
                  </div>
                  <div class="ms-auto text-end">
                    <a
                      class="btn btn-link text-danger text-gradient px-3 mb-0"
                      href="javascript:;"
                    >
                      Remaining : ₹ {item?.remaining_fees}
                    </a>
                    <div
                      class={`btn btn-link  px-3 mb-0 ${
                        item?.remaining_fees ? "text-dark" : "text-success"
                      }`}
                    >
                      <span>Paid : </span>₹ {item?.paid_fees}
                    </div>
                  </div>
                </li>
              );
            })}
            {(!historyTreatment || !historyTreatment?.length) && (
              <li class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
                <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm">No history available</h6>
                </div>
              </li>
            )}
            {/* <li class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
              <div class="d-flex flex-column">
                <h6 class="mb-3 text-sm">Ethan James</h6>
                <span class="mb-2 text-xs">
                  Company Name:
                  <span class="text-dark font-weight-bold ms-sm-2">
                    Fiber Notion
                  </span>
                </span>
                <span class="mb-2 text-xs">
                  Email Address:
                  <span class="text-dark ms-sm-2 font-weight-bold">
                    ethan@fiber.com
                  </span>
                </span>
                <span class="text-xs">
                  VAT Number:
                  <span class="text-dark ms-sm-2 font-weight-bold">
                    FRB1235476
                  </span>
                </span>
              </div>
              <div class="ms-auto text-end">
                <a
                  class="btn btn-link text-danger text-gradient px-3 mb-0"
                  href="javascript:;"
                >
                  <i class="far fa-trash-alt me-2"></i>Delete
                </a>
                <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
                  <i
                    class="fas fa-pencil-alt text-dark me-2"
                    aria-hidden="true"
                  ></i>
                  Edit
                </a>
              </div>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TreatmentHistory;
