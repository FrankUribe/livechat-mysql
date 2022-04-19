import '../assets/config.css'
import { IoCodeSlashOutline,IoTimerOutline,IoPodiumOutline,IoPeopleOutline,IoPersonCircleOutline } from "react-icons/io5";
import { useState } from "react";
import RespRapid from '../components/RespRapid';
import Schedule from '../components/Schedule';
export default function Config() {
  const [control, setControl] = useState(undefined);
  const handleControl = (val) => {
    const controls = document.querySelectorAll(".control")
    controls.forEach((control) => {
      control.style.backgroundColor = "transparent";
      control.style.color = "#222";
    });
    const control = document.querySelectorAll(".control")[val];
    control.style.backgroundColor = "#007dff";
    control.style.color = "#eee";
  }
  
  const returnControl = () => {
    switch(control) {
      case "resprapid": 
        return <RespRapid/>
      case "horario":
        return <Schedule/>
      case "reporte":
        return (
          <>
          <p>Reportes</p>
          </>
        )
      case "usuarios":
        return (
          <>
          <p>Usuarios</p>
          </>
        )
      case "micuenta":
        return (
          <>
          <p>Mi cuenta</p>
          </>
        )
      default: return <h2>Configuración</h2>
    }
  }
  return (
    <>
      <div className="options">
        <div className="controls">
          <div className="control" onClick={() => {handleControl(0); setControl("resprapid")}}>
            <div className="icon"><IoCodeSlashOutline/></div>
            <div className="description">
              <b>Respuestas rápidas</b>
              <span>Configura mensajes rapidos de enviar con el indice "/"</span>
            </div>
          </div>
          <div className="control" onClick={() => {handleControl(1); setControl("horario")}}>
            <div className="icon"><IoTimerOutline/></div>
            <div className="description">
              <b>Horario</b>
              <span>Organiza tu horario de atención para mensajes entrantes</span>
            </div>
          </div>
          <div className="control" onClick={() => {handleControl(2); setControl("reporte")}}>
            <div className="icon"><IoPodiumOutline/></div>
            <div className="description">
              <b>Reportes</b>
              <span>Obten detalles de los chats y mensajes entrantes</span>
            </div>
          </div>
          <div className="control" onClick={() => {handleControl(3); setControl("usuarios")}}>
            <div className="icon"><IoPeopleOutline/></div>
            <div className="description">
              <b>Usuarios</b>
              <span>Crea, edita y elimina usuarios para el soporte del chat</span>
            </div>
          </div>
          <div className="control" onClick={() => {handleControl(4); setControl("micuenta")}}>
            <div className="icon"><IoPersonCircleOutline/></div>
            <div className="description">
              <b>Mi cuenta</b>
              <span>Configura tu nombre, perfil y credenciales</span>
            </div>
          </div>
        </div>
      </div>
      <div className="chat" style={{backgroundColor:"#ffffff70", borderRadius:"0px 25px 25px 0px", padding:'20px'}}>
        {returnControl()}
      </div>
    </>
  )
}
