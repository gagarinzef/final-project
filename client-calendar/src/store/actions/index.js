import { PROJECT_FETCH_SUCCESS, TASK_FETCH_SUCCESS } from "./actionType";

export const projectFetchSuccess = (payload) => {
  return { type: PROJECT_FETCH_SUCCESS, payload };
};

export const taskFetchSuccess = (payload) => {
  return { type: TASK_FETCH_SUCCESS, payload };
};

// export const productByIdFetchSuccess = (payload) => {
//   return { type: PRODUCT_BY_ID_FETCH_SUCCESS, payload };
// };

// export const categoriesFetchSuccess = (payload) => {
//   return { type: CATEGORIES_FETCH_SUCCESS, payload };
// };

// export const userFetchSuccess = (payload) => {
//   return { type: USER_FETCH_SUCCESS, payload };
// };

export const fetchData = (url, method, data, domain) => {
  return (dispatch) => {
    let option = {
      method,
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
    };

    if (data) {
      const body = JSON.stringify(data);
      option = { ...option, body };
    }

    return fetch(url, option)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((response) => {
            throw response.message;
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (domain) {
          switch (domain) {
            case "project":
              dispatch(projectFetchSuccess(data));
              break;
            case "task":
              dispatch(taskFetchSuccess(data));
              break;
            // case "categories":
            //   dispatch(categoriesFetchSuccess(data));
            //   break;
            // case "user":
            //   dispatch(userFetchSuccess(data));
            //   break;
          }
        }
        return data;
      });
  };
};
