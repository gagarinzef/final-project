import {
  PROJECT_FETCH_SUCCESS,
  PROJECTS_FETCH_SUCCESS,
} from "../actions/actionType";

const initState = {
  project: [],
  projects: [],
  UserId: "",
};

export default function projectReducer(state = initState, action) {
  switch (action.type) {
    case PROJECT_FETCH_SUCCESS:
      return {
        ...state,
        project: action.payload,
      };
    case PROJECTS_FETCH_SUCCESS:
      return {
        ...state,
        projects: action.payload,
      };
    default:
      return state;
  }
}
