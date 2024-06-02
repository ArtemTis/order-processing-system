import { createBrowserRouter, Route, createRoutesFromElements, Navigate } from "react-router-dom"
import { ACCOUNT_PATH, CHATS_PATH, CHAT_PATH, DEALS_PATH, HOME_PATH, LOGIN_PATH, PROFILE_PATH, REGISTER_PATH, SETTINGS_PATH, STATISTICS_PATH } from "./routeConstants";
import AuthGuard from "../../guards/AuthGuard";
import AppSider from "../../../widgets/Sider";
import Main from "../../../pages/Main";
import Account from "../../../pages/auth/Account";
import Login from "../../../pages/auth/Login";
import Register from "../../../pages/auth/Register";
import Profile from "../../../pages/auth/Profile";
import NotFound from "../../NotFound";
import Settings from "../../../pages/Settings";
import Chat from "../../../pages/Chat";
import Chats from "../../../pages/Chats";
import ChatNew from "../../../pages/ChatNew";
import Statistics from "../../../pages/Statistics";
import DealsPage from "../../../pages/DealsPage";
import NewDealsPage from "../../../pages/NewDealsPage";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={HOME_PATH} element={<AppSider />} >
        <Route path={CHATS_PATH} element={<Chats />} />

        {/* <Route path={DEALS_PATH} element={<DealsPage />} /> */}
        <Route path={DEALS_PATH} element={<NewDealsPage />} />
        <Route path={STATISTICS_PATH} element={<Statistics />} />

        {/* <Route index element={<Navigate to={CHATS_PATH} />} /> */}
        <Route index element={<AuthGuard element={<Navigate to={CHATS_PATH} replace />} />} />

        <Route path={CHATS_PATH} element={<Chats />} >
          {/* <Route index element={<Navigate to={CHAT_PATH} />} /> */}
          <Route path={`${CHAT_PATH}/:chatId`} element={<Chat />} />
        </Route>



        {/* <Route path={TESTS_PATH} element={<Tests />} />
        <Route path={`${TESTS_PATH}/:testId`} element={<Test />} />
        <Route path={`${TESTS_PATH}/${CREATE_TEST_PATH}`} element={<CreateTest />} />
        <Route path={`${TESTS_PATH}/${EDIT_TEST_PATH}/:testId`} element={<EditTest />} /> */}

        <Route path={PROFILE_PATH} element={<Profile />} />

        <Route path={SETTINGS_PATH} element={<Settings />} />
        <Route path="*" element={<NotFound />} />


        {/* <Route path={ACCOUNT_PATH} element={<Account />}>
          <Route index element={<AuthGuard element={<Navigate to={PROFILE_PATH} replace />} />} />
          <Route path={LOGIN_PATH} element={<Login />} />


          <Route path={REGISTER_PATH} element={<Register />} />
          <Route path={PROFILE_PATH} element={<AuthGuard element={<Profile />} />} />
        </Route> */}


      </Route>
      {/* hakaton */}


      <Route path={ACCOUNT_PATH} element={<Account />}>
        <Route index element={<AuthGuard element={<Navigate to={PROFILE_PATH} replace />} />} />
        <Route path={LOGIN_PATH} element={<Login />} />

        <Route path={REGISTER_PATH} element={<Register />} />
        <Route path={PROFILE_PATH} element={<AuthGuard element={<Profile />} />} />
      </Route>


      {/* <Route path={ACCOUNT_PATH} element={<Account />}>
        <Route index element={<AuthGuard element={<Navigate to={PROFILE_PATH} replace />} />} />
        <Route path={LOGIN_PATH} element={<Login />} >
          <Route index element={<Navigate to={SINGIN_TEL_PATH} />} />
          <Route path={SINGIN_TEL_PATH} element={<LoginTel />} />
          <Route path={SINGIN_EMAIL_PATH} element={<LoginEmail />} />
          <Route path={SINGIN_CODE_PATH} element={<LoginCode />} />
        </Route>
        <Route path={PROFILE_PATH} element={<AuthGuard element={<Profile />} />} />
        <Route path={REGISTER_PATH} element={<Register />} />
      </Route> */}

    </>
  ));