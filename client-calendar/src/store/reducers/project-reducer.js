import { PROJECT_FETCH_SUCCESS } from "../actions/actionType";

const initState = {
  project: [],
};

export default function projectReducer(state = initState, action) {
  switch (action.type) {
    case PROJECT_FETCH_SUCCESS:
      return {
        ...state,
        project: action.payload,
      };
    // case PRODUCT_BY_ID_FETCH_SUCCESS:
    //   return {
    //     ...state,
    //     productById: action.payload,
    //   };
    default:
      return state;
  }
}
