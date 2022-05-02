import DataTable from "react-data-table-component";
import { useState, useEffect, useRef } from "react";
import { IoTrashBin,IoPencilSharp, IoHappy } from "react-icons/io5";
import axios from "axios";
import { getResrapidRoute,addResrapidRoute,addReraByShortRoute,updateResrapRoute,deleteResrapRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../components/modal';
import Picker from 'emoji-picker-react';
export default function RespRapid() {
  const [resrapid, setResrapid] = useState(undefined)
  const [shorts, setShorts] = useState(undefined)
  const [msg, setMsg] = useState("")
  const [resRapToEdit, setResRapToEdit] = useState(undefined)
  const [modal, setModal] = useState(false)
  const resrapidOptions = useRef();
  const contentToUpdate = useRef()
  const editableMsg = useRef();  
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showEmojiPickerEdit, setShowEmojiPickerEdit] = useState(false);

  const handleChangeShort = async (event) => {    
    const short = editableMsg.current.innerHTML
    const letter = short.charAt(0);
    if (letter==="/") {
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
  
  const [inputshort, setInputshort] = useState("")
  const [inputcontent, setInputcontent] = useState(undefined);

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
    if (inputshort==='' || inputcontent===undefined) {
      toast.error("Debe completar todos los datos", toastOptions)
      return false;
    }else{
      return true;
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()){
      const { data } = await axios.post(addResrapidRoute, {
        short: inputshort,
        text: inputcontent,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        toast.success(data.msg, toastOptions)
        getResRapid()
        setInputshort("")
        setInputcontent(undefined)
        document.getElementById('cteditablecreate').innerHTML = ""
      }
    }
  }

  const handleUpdateShortCode = (event) => {
    setResRapToEdit({ ...resRapToEdit, rera_short: event.target.value })
  }

  const updateResRap = async () => {
    setModal(false)
    const { data } = await axios.post(updateResrapRoute, {
      short: resRapToEdit.rera_short,
      text: contentToUpdate.current.innerHTML,
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

  //funcion al presionar boton de emoji, abre modal
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  //funcion al presionar caja de texto, cierra modal emoji
  const handleEmojiPickerHide = () => {
    setShowEmojiPicker(false)
  }

  //funcion al presionar boton de emoji, abre modal
  const handleEmojiPickerHideShowEdit = () => {
    setShowEmojiPickerEdit(!showEmojiPickerEdit)
  }

  //funcion al presionar caja de texto, cierra modal emoji
  const handleEmojiPickerHideEdit = () => {
    setShowEmojiPickerEdit(false)
  }

  //funcion seleccionar emoji, lo setea al mensaje
  const handleEmojiClick = (event, emoji) => {
    const img = '<span><img class="emoji-img" style="width: auto; max-width:16px; margin-bottom:-3px; position:relative" src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/'+emoji.unified+'.png"/></span>'
    let message = msg;
    message += img;
    // setMsg(message)
    document.getElementById('cteditablecreate').innerHTML += img
  }
  
  //funcion seleccionar emoji, lo setea al mensaje
  const handleEmojiClickEdit = (event, emoji) => {
    const img = '<span><img class="emoji-img" style="width: auto; max-width:16px; margin-bottom:-3px; position:relative" src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/'+emoji.unified+'.png"/></span>'
    let message = msg;
    message += img;
    // setMsg(message)
    contentToUpdate.current.innerHTML += img
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
          <div className="card resrap">
            <h4>Nuevo</h4>
            <input type="text" placeholder="/hola" name="short" onChange={(e) => setInputshort(e.target.value)} value={inputshort} onSelect={(e) => handleEmojiPickerHide()}/>
            {/* <textarea rows="10" name="text" onChange={(e)=>handleChange(e)} value={values.text}></textarea> */}
            <div className="cteditable" id="cteditablecreate"
                contentEditable="true"
                style={{minHeight:'200px', maxHeight:'200px'}}
                onInput={(e) => {setInputcontent(e.target.innerHTML), handleEmojiPickerHide()}}
                onClick={(e) => handleEmojiPickerHide()}></div>
            <div className="btns" style={{display:'flex', justifyContent:'space-between'}}>
              <button className="btn" onClick={handleEmojiPickerHideShow} style={{color:'#666', display:'flex', flexDirection:'column', alignItems:'center', fontSize:'16px'}}><IoHappy/></button>
              <button className="btn btn-primary" onClick={(event) => {handleSubmit(event), handleEmojiPickerHide()}}>Crear</button>
            </div>
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>}
          </div>
          <div className="inputPreview">
            <div className="card resrapidOptions" ref={resrapidOptions} style={{padding:'10px'}}>
              <ul>
                {shorts ? (
                shorts.map((short) =>{
                  return(
                    <li onClick={() => {editableMsg.current.innerHTML = short.rera_text, resrapidOptions.current.style.display = 'none';}} key={short._id}>
                      <b>{short.rera_short}</b>
                      <span style={{maxHeight:50, overflow:'hidden'}}>{short.rera_text}</span>
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
            <div className="cteditable" ref={editableMsg} 
                contentEditable="true"
                onInput={(e) => handleChangeShort(e)}></div>
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
        <div className="modal-dialog modaleditresrap" style={{width: '400px'}}>
          {
            resRapToEdit ? (
              <>
              <ModalHeader>
                <h4>Editar {resRapToEdit.rera_short}</h4>
              </ModalHeader>
              <ModalBody>
                <div className="modal-form">
                  <input type="text" onChange={(e)=>handleUpdateShortCode(e)} value={resRapToEdit.rera_short} onClick={(e) => handleEmojiPickerHideEdit()}/>
                  <div className="cteditable" ref={contentToUpdate}
                    contentEditable="true" style={{minHeight:'200px',maxHeight:'200px'}}
                    suppressContentEditableWarning={true}
                    dangerouslySetInnerHTML={{__html: resRapToEdit.rera_text}}
                    onClick={(e) => handleEmojiPickerHideEdit()}>
                  </div>
                  <button className="btn" onClick={handleEmojiPickerHideShowEdit} style={{color:'#666', display:'flex', flexDirection:'column', alignItems:'center', fontSize:'16px', width:'60px'}}><IoHappy/></button>
                  {showEmojiPickerEdit && <Picker onEmojiClick={handleEmojiClickEdit}/>}
                </div>
              </ModalBody>
              <ModalFooter>
                <button className='btn' onClick={() => {setModal(false), handleEmojiPickerHideEdit()}}>No, cancelar</button>
                <button className='btn btn-primary' onClick={() => {updateResRap(), handleEmojiPickerHideEdit()}}>Si, actualizar</button>
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
