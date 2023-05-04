import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { SERVER_PATH } from "../../../config";
const BLOGS_TO_SHOW_ON_DASH = 3;
const BlogViewer = ({
  enableCreate = false,
  showFull = false,
  type = null, // 0-both, 1-doctor, 2-patient
  articleID = null,
  userType = "admin",
}) => {
  console.log("BLOG VIEWR", { type, userType });
  // let _type = type == "patient" ? 2 : type == "doctor" ? 1 : null;
  const [articleData, setArticleData] = useState(null);
  const location = useLocation();
  useEffect(() => {
    async function f() {
      let res = await getArticles();
      console.log({ res });
      if (res) {
        setArticleData(res);
      } else {
        setArticleData(null);
      }
    }
    f();
  }, [location]);

  const getArticles = async () => {
    try {
      let _data = {
        id: articleID,
        type: type,
      };

      console.log("CALLIN BLOG---", { _data });
      let res = await fetch(SERVER_PATH + "/api/blog/getArticles", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_data),
      });
      let result = await res.json();
      // console.log({ result });

      // if (result && result.hasOwnProperty() && !result.hasOwnProperty("error")) {
      if (result && result?.article_data && result?.article_data?.length) {
        return result.article_data;
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log("ABHIJETT", { articleData, showFull });
  return (
    // <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12 mt-4">
        <div class="card mb-4">
          <div class="card-header pb-0 p-3">
            <h6 class="mb-1">Blogs</h6>
            <p class="text-sm">Information and Upcoming events</p>
          </div>
          <div class="card-body p-3">
            {articleData && articleData?.length ? (
              <div class="row">
                {articleData?.map((item, inx) => {
                  if (!showFull) {
                    if (inx < BLOGS_TO_SHOW_ON_DASH) {
                      return (
                        <div class="col-xl-3 col-md-6 mb-xl-0 mb-4">
                          <div class="card card-blog card-plain">
                            <div class="position-relative">
                              <a class="d-block shadow-xl border-radius-xl">
                                <img
                                  src={`${SERVER_PATH}${item.photo}`}
                                  // src="./img/home-decor-1.jpg"
                                  alt="img-blur-shadow"
                                  class="img-fluid shadow border-radius-xl"
                                />
                              </a>
                            </div>
                            <div class="card-body px-1 pb-0">
                              <p class="text-gradient text-dark mb-2 text-sm">
                                {moment(item.date_to).format("DD MMM yyyy")}
                              </p>
                              <a href="javascript:;">
                                <h5>{item.title}</h5>
                              </a>
                              <p class="mb-4 text-sm">{item.message}</p>
                              <div class="d-flex align-items-center justify-content-between">
                                <button
                                  type="button"
                                  class="btn btn-outline-primary btn-sm mb-0"
                                >
                                  View Blog
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  } else {
                    return (
                      <div class="col-xl-3 col-md-6 mb-xl-0 mb-4">
                        <div class="card card-blog card-plain">
                          <div class="position-relative">
                            <a class="d-block shadow-xl border-radius-xl">
                              <img
                                src={`${SERVER_PATH}${item.photo}`}
                                alt="img-blur-shadow"
                                class="img-fluid shadow border-radius-xl"
                              />
                            </a>
                          </div>
                          <div class="card-body px-1 pb-0">
                            <p class="text-gradient text-dark mb-2 text-sm">
                              {moment(item.date_to).format("DD MMM yyyy")}
                            </p>
                            <a href="javascript:;">
                              <h5>{item.title}</h5>
                            </a>
                            <p class="mb-4 text-sm">{item.message}</p>
                            <div class="d-flex align-items-center justify-content-between">
                              <Link
                                to={"/blogs/blog"}
                                state={{ articleData: articleData[inx] }}
                                type="button"
                                class="btn btn-outline-primary btn-sm mb-0"
                              >
                                View Blog
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
                {!showFull && enableCreate ? (
                  <div class="col-xl-3 col-md-6 mb-xl-0 mb-4">
                    <div class="card h-100 card-plain border">
                      <div class="card-body d-flex flex-column justify-content-center text-center">
                        <a href="javascript:;">
                          <i class="fa fa-plus text-secondary mb-3"></i>
                          <h5 class=" text-secondary"> New Blog </h5>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : !showFull ? (
                  <div class="col-xl-3 col-md-6 mb-xl-0 mb-4">
                    <div class="card h-100 card-plain border">
                      <div class="card-body d-flex flex-column justify-content-center text-center">
                        <Link
                          to="/blogs/blogsAll"
                          state={{
                            type: type,
                            userType: userType,
                            showFull: true,
                          }}
                        >
                          <i class="fa fa-plus text-secondary mb-3"></i>
                          <h5 class=" text-secondary"> View All </h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <p>No information available</p>
            )}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default BlogViewer;
