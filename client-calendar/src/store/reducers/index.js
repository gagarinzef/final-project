import { combineReducers } from "redux";
// import categoryReducer from "./category-reducer";
import projectReducer from "./project-reducer";
import taskReducer from "./task-reducer";
// import userReducer from "./user-reducer";

export const rootReducer = combineReducers({
  project: projectReducer,
  task: taskReducer,
});
