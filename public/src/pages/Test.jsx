import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import { useState, useEffect } from "react";
export default function Test() {
  useEffect(async() =>{
    const { data } = await axios.post(loginRoute, {
      email: 'admin@gmail.com',
      password: '1234',
    });
    console.log(data)
  })
  return (
    <div>Test</div>
  )
}
