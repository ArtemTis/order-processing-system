import React from 'react'
import { Outlet } from 'react-router-dom'
import Profile from './Profile';

const Account = () => {

  const isAuthorised = true;

  return (
    <div>Account
      {/* <Outlet /> */}

      {
        isAuthorised
          ? <Profile />
          : <Outlet/>
      }
    </div>
  )
}

export default Account