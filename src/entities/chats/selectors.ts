import { RootState } from "../../app/store/store";

export const selectAllChats = (state: RootState) => state.chats.chats;


