import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILoginResponse, IUser } from "../types";
import { RootState } from "../../app/store/store";

type AuthState = {
  user: IUser | null
  access_token: string | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, access_token: null } as AuthState,
  reducers: {
    setCredentials: (state,{payload: { user, access_token }}: PayloadAction<{ user: IUser ; access_token: string }>) => {
      
      state.user = user
      state.access_token = access_token
    },
  },
})

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
