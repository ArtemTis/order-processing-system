import { createSelector } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import { RootState } from "../../app/store/store";


// export const selectLoginResponse = userApi.endpoints.login.select("data");

// export const selectIsAuthorised = createSelector(
//    selectLoginResponse,
//    state => state.data?.access_token
// );

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectAuthToken = (state: RootState) => state.auth.access_token;

