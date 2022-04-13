import DataTable from "react-data-table-component";
import { useState, useEffect, useRef } from "react";
import { IoTrashBin,IoPencilSharp } from "react-icons/io5";
import axios from "axios";
import { getResrapidRoute,addResrapidRoute,addReraByShortRoute,updateResrapRoute,deleteResrapRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../components/modal';
export default function RespRapid() {
  const [resrapid, setResrapid] = useState(undefined)
  const [shorts, setShorts] = useState(undefined)
  const [msg, setMsg] = useState("")
  const [resRapToEdit, setResRapToEdit] = useState(undefined)
  const [modal, setModal] = useState(false)
  const resrapidOptions = useRef();

  const handleChangeShort = async (event) => {
    setMsg(event.target.value)
    const short = event.target.value
    if (short!=="") {
      const { data } = await axios.post(addReraByShortRoute, {short});
      if (data.status === true) {
        if (data.result.length >= 1) {
          setShorts(data.result)
          resrapidOptions.current.style.display = 'block';
        }else{
          setShorts(undefined)
          resrapidOptions.current.style.display = 'none';
        }
      }
    }else{
      resrapidOptions.current.style.display = 'none';
    }
  }
  
  const [values, setValues] = useState({ short: "", text: "", })
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const getResRapid = async () => {
    const lastm = await axios.post(getResrapidRoute);
    setResrapid(lastm.data)
  }
  useEffect(() => {
    getResRapid()
  }, []);
  
  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
  
  const handleValidation = () => {
    const {short,text} = values;
    if (short==='' || text==='') {
      toast.error("Debe completar todos los datos", toastOptions)
      return false;
    }else{
      return true;
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()){
      const { short, text } = values;
      const { data } = await axios.post(addResrapidRoute, {
        short,
        text,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        toast.success(data.msg, toastOptions)
        getResRapid()
        setValues({ short: "", text: "", })
      }
    }
  }

  const handleChangeResRapEit = (event) => {
    setResRapToEdit({ ...resRapToEdit, [event.target.name]: event.target.value })
  }

  const updateResRap = async () => {
    setModal(false)
    const { data } = await axios.post(updateResrapRoute, {
      short: resRapToEdit.rera_short,
      text: resRapToEdit.rera_text,
      id: resRapToEdit._id
    });
    if (data.status === false) {
      toast.error('Algo ha salido mal, no se ha podido editar', toastOptions)
    }
    if (data.status === true) {
      getResRapid()
      setResRapToEdit(undefined)
    }
  }

  const deleteResRap = async (id) => {
    const { data } = await axios.post(deleteResrapRoute, {id});
    if (data.status === false) {
      toast.error('Algo ha salido mal, no se ha podido eliminar', toastOptions)
    }
    if (data.status === true) {
      getResRapid()
    }
  }

  //hook cada vez que se de un click se cierre el modal, solo si el modal esta abierto
  useEffect(() => {
    const clickOutsideContent = (e) => {
        if (e.target.className === 'modal active') {
          setModal(false);
        }
    };
    window.addEventListener('click', clickOutsideContent);
    return () => {
        window.removeEventListener('click', clickOutsideContent);
    };
  }, [])
  return (
    <div className="controller">
      <div className="content">
        <div className="form">
          <div className="card">
            <h4>Nuevo</h4>
            <input type="text" placeholder="/hola" name="short" onChange={(e)=>handleChange(e)} value={values.short}/>
            <textarea rows="10" name="text" onChange={(e)=>handleChange(e)} value={values.text}></textarea>
            <button className="btn btn-primary" onClick={(event) => handleSubmit(event)}>Crear</button>
          </div>
          <div className="inputPreview">
            <div className="card resrapidOptions" ref={resrapidOptions} style={{padding:'10px'}}>
              <ul>
                {shorts ? (
                shorts.map((short) =>{
                  return(
                    <li onClick={() => {setMsg(short.rera_text), resrapidOptions.current.style.display = 'none';}} key={short._id}>
                      <b>{short.rera_short}</b>
                      <span>{short.rera_text}</span>
                    </li>
                  )
                })
                ) : (
                  <p>No hay</p>
                )
                }
              </ul>
            </div>
            <small>Escribe un mensaje rápido</small>
            <input type="text" name="msg" onChange={(e)=>handleChangeShort(e)} value={msg}/>
          </div>
        </div>
        <div className="list">
          <div className="card">
          <DataTable className="datatable"
            columns={
              [
              {
                name: "Short",
                selector: row => row.rera_short,
                sortable: true,
                className: 'row_short',
              },
              {
                name: "Mensaje",
                selector: row => row.rera_text,
              },
              {
                name:"Opciones",
                cell: row => (
                  <>
                  <button onClick={() => {setResRapToEdit(row), setModal(true)}} style={{padding:'4px 6px 1px', color:'#007dff', background:'none', borderStyle:'none', cursor:'pointer'}}><IoPencilSharp/></button>
                  <button onClick={() => deleteResRap(row._id)} style={{padding:'4px 6px 1px', color:'#c51f1f', background:'none', borderStyle:'none', cursor:'pointer'}}><IoTrashBin/></button>
                  </>
                ),
              }
              ]
            }
            data={resrapid}
            paginationPerPage={20}
            paginationRowsPerPageOptions={[20, 40, 60, 100]}
            pagination
            highlightOnHover
            dense
            paginationComponentOptions={
              {
                rowsPerPageText: 'Filas por página',
                rangeSeparatorText: 'de',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Todos',
              }
            }
          />
        </div>
          </div>
      </div>
      <Modal show={modal}>
        <div className="modal-dialog" style={{width: '400px'}}>
          {
            resRapToEdit ? (
              <>
              <ModalHeader>
                <h4>Editar {resRapToEdit.rera_short}</h4>
              </ModalHeader>
              <ModalBody>
                <div className="modal-form">
                  <input type="text" name="rera_short" onChange={(e)=>handleChangeResRapEit(e)} value={resRapToEdit.rera_short}/>
                  <textarea rows="10" name="rera_text" onChange={(e)=>handleChangeResRapEit(e)} value={resRapToEdit.rera_text}></textarea>
                </div>
              </ModalBody>
              <ModalFooter>
                <button className='btn' onClick={() => setModal(false)}>No, cancelar</button>
                <button className='btn btn-primary' onClick={() => updateResRap()}>Si, actualizar</button>
              </ModalFooter>
              </>
            ):(
              <span>Nada para editar</span>
            )
          }
        </div>
      </Modal>
      <ToastContainer/>
    </div>
  )
}
