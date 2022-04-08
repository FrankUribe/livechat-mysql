import { getAdminUser } from "../utils/APIRoutes";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Test() {
  const pkNewChatUser = uuidv4();
  useEffect( async () => {
    const { data } = await axios.post(getAdminUser);
    if (data.status === false) {
      console.log(data.msg)
    }else{
      console.log(data)
    }
  }, [])
  
  return (
    <div>{pkNewChatUser}</div>
  )
}
