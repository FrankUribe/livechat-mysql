import { useEffect, useState } from "react";
import axios from "axios";
import { getScheduleRoute, updateScheduleRoute } from "../utils/APIRoutes"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Schedule() {
  const [ schedule, setSchedule ] = useState([])

  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  const getSchedule = async () => {
    const sched = await axios.post(getScheduleRoute);
    setSchedule(sched.data.result)
  }
  useEffect(() => {
    getSchedule()
  }, []);

  const handleChange = (e) =>{
    const inputclsname = e.target.className
    const index = inputclsname.slice(-1);
    const day = inputclsname.substring(0,4);
    const objIndex = schedule.findIndex((obj => obj._id == index));
    if (day==="open") {
      schedule[objIndex].sche_open = e.target.value
    }else{
      schedule[objIndex].sche_close = e.target.value
    }
  }

  const handleUpdate = () => {
    var countdaysupdated = 0
    schedule.map((day) =>{
      const update = axios.post(updateScheduleRoute, {
        open: day.sche_open,
        close: day.sche_close,
        id: day._id,
      })
      if (update) {
        countdaysupdated++
      }
    })
    countdaysupdated===7 ? (
      toast.success('Horario actualizado', toastOptions)
    ):(
      toast.error('Hubo un error', toastOptions)
    )
  }

  return (
    <>
    <div className="card">
      <table style={{textAlign:'left'}}>
        <thead>
          <tr>
            <th style={{padding:'0px 10px'}}>Día</th>
            <th style={{padding:'0px 10px'}}>Hr inicio</th>
            <th style={{padding:'0px 10px'}}>Hr fin</th>
          </tr>
        </thead>
        <tbody>
          {
            schedule.map((day) =>{
              return(
                <tr key={day._id}>
                  <td style={{padding:'0px 10px'}}>{day.sche_day}</td>
                  <td style={{padding:'0px 10px'}}><input type="time" className={'open'+day._id} defaultValue={day.sche_open} onChange={(e) => handleChange(e)}/></td>
                  <td style={{padding:'0px 10px'}}><input type="time" className={'close'+day._id} defaultValue={day.sche_close} onChange={(e) => handleChange(e)}/></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <center style={{padding:10}}>
        <button className="btn btn-primary" onClick={(e) => handleUpdate(e)}>Guardar</button>
      </center>
    </div>
    
    <ToastContainer/>
    </>
  );
}
