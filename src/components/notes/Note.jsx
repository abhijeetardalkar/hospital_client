import React, { useEffect, useState } from "react";
import { SERVER_PATH } from "../../../config";
import { getKey } from "../utils/commonFunctions";
import moment from "moment";
import { Link } from "react-router-dom";
const NOTES_TO_SHOW_ON_DASH = 3;
const Note = ({
  type = null, // 0-both, 1-doctor, 2-patient

  userType = "admin",
  showFull = false,
}) => {
  const [user, setUser] = useState(JSON.parse(getKey("user")));

  const [noteData, setNoteData] = useState(null);

  useEffect(() => {
    async function a() {
      //Todays
      let _data = {
        note_id: null,
        doc_id: user?.user_id,
      };
      let res = await fetch(SERVER_PATH + `/api/note/getNotes`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_data),
      });
      let result = await res.json();
      console.log({ result });
      console.log("NOTES:::", { result });

      if (result?.note_data?.length) {
        setNoteData(result?.note_data);
      }
    }
    a();
  }, []);
  return (
    // <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12 col-xl-12">
        <div class="card h-100">
          <div class="card-header pb-0 p-3">
            <h6 class="mb-0">Notes</h6>
          </div>
          <div class="card-body p-3">
            <ul class="list-group">
              {noteData?.map((note, inx) => {
                if (!showFull) {
                  if (inx < NOTES_TO_SHOW_ON_DASH) {
                    return (
                      <li class="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                        <div class="avatar me-3">
                          <img
                            src="./img/kal-visuals-square.jpg"
                            alt="kal"
                            class="border-radius-lg shadow"
                          />
                        </div>
                        <div class="d-flex align-items-start flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">
                            {moment(note.date).format("DD MMM yyyy")}
                          </h6>
                          <p class="mb-0 text-xm">{note?.note}</p>
                        </div>
                      </li>
                    );
                  }
                } else {
                  return (
                    <li class="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                      <div class="avatar me-3">
                        <img
                          src="./img/kal-visuals-square.jpg"
                          alt="kal"
                          class="border-radius-lg shadow"
                        />
                      </div>
                      <div class="d-flex align-items-start flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">
                          {moment(note.date).format("DD MMM yyyy")}
                        </h6>
                        <p class="mb-0 text-xm">{note?.note}</p>
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
            {!showFull && (
              <div>
                <Link
                  class="btn btn-link pe-3 ps-0 mb-0 ms-auto"
                  to="/notes/notesAll"
                >
                  View All
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Note;
