import { SERVER_PATH } from "../../../config";

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
    //   console.log({ result });
    return result;
  } catch (e) {
    console.log({ e });
  }
};

export { storeKey, removeKey, getKey, getUser };
