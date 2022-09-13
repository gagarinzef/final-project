import { TASK_FETCH_SUCCESS } from "../actions/actionType";

const initState = {
  task: {},
};

export default function taskReducer(state = initState, action) {
  switch (action.type) {
    case TASK_FETCH_SUCCESS:
      return {
        ...state,
        task: action.payload,
      };
    default:
      return state;
  }
}
