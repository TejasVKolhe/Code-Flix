import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  createJobReducer,
  jobDeleteReducer,
  jobsListReducer,
} from "./reducers/dataReducer";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducer";
import { commentListReducer } from "./reducers/commentReducer";

const reducer = combineReducers({
  jobList: jobsListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  createJob: createJobReducer,
  jobDelete: jobDeleteReducer,
  commentList: commentListReducer,
});

const initialState = {};

const store = configureStore({
  initialState,
  reducer,
});

export default store;
