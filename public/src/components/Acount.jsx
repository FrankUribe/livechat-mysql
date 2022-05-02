import { useState, useEffect } from "react";
import { getAdminUser, getMessagesRoute, newChatUserRoute, sendMessageRoute, updateIsActiveRoute, getScheduleByDay, getUserRoute, host } from "../utils/APIRoutes";
import axios from "axios";

export default function Acount() {
  useEffect(async() => {    
    if (localStorage.getItem('authUser')) {
      const pk = JSON.parse(localStorage.getItem('authUser')).id
      const { data } = await axios.post(getUserRoute, { id: pk })
      if (data.status === true) {
        console.log(data.result[0])
      }
    }
  }, [])
  return (
    <div className="card" style={{width:'400px'}}>
      <h4>Mi cuenta</h4>
    </div>
  )
}