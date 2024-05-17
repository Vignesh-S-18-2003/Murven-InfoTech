import React from 'react'
import Topbar from './Topbar'
import { Outlet } from 'react-router-dom'

function Main() {
  return (
    <div>
        <Topbar/>
        <Outlet  />
    </div>
  )
}

export default Main