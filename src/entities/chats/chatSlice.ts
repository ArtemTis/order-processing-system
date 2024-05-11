import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChatSnippet, ILoginResponse, IUser } from "../types";
import { RootState } from "../../app/store/store";

type AuthState = {
    chats: IChatSnippet[] | null
}

const chatSlice = createSlice({
    name: 'chats',
    initialState: { chats: null } as AuthState,
    reducers: {
        setChats: (state, { payload }: PayloadAction<IChatSnippet[]>) => {
            state.chats = payload;
        },
    },
})

export const { setChats } = chatSlice.actions;

export default chatSlice.reducer;
