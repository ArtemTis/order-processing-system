import React from 'react'
import { Outlet } from 'react-router-dom'

const Chats = () => {
  return (
    <div>Chats
      <Outlet />
    </div>
  )
}

export default Chats