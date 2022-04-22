import { useState, useEffect, useRef } from "react";
import { IoSend, IoHappy, IoEllipsisVertical, IoPencil, IoAdd, IoCamera } from "react-icons/io5";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Picker from 'emoji-picker-react';
import { getMessagesRoute, sendMessageRoute, getLastMessagesRoute, updateChatUserRoute, addReraByShortRoute } from "../utils/APIRoutes";
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../components/modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChatContainer({ currentChat, currentUser, socket, fetchContacts }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const editableMsg = useRef();
  const addToMsg = useRef(null);
  const imageToMsg = useRef(null)
  const addToMsgButton = useRef(null);
  const [stateAddToMsg, setStateAddToMsg] = useState(false);
  const [stateImgToMsg, setStateImgToMsg] = useState(false);
  const textInput = useRef(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [modal, setModal] = useState(false)
  const [chatData, setChatData] = useState(currentChat)
  const [baseImage, setBaseImage] = useState("");
  const resrapidOptions = useRef();
  const [shorts, setShorts] = useState(undefined)
  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  //hook traer los mesajes del usuario actual (si existe) hacia un usuario de chat
  useEffect(async () => {
    if (currentUser) {
      const response = await axios.post(getMessagesRoute, {
        from: currentUser.id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
  }, [currentChat])
  
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

  //funcion al presionar boton de emoji, abre modal
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  //click boton +, estilos
  const handleAddToMsgHideShow = () => {
    if (stateAddToMsg===true) {
      addToMsg.current.style.display = 'none'
      addToMsgButton.current.style.transform = 'rotate(0deg)'
      addToMsgButton.current.style.transition = 'transform .2s ease-in-out'
      handleEmojiPickerHide()
    }else{
      addToMsg.current.style.display = 'flex'
      addToMsgButton.current.style.transform = 'rotate(45deg)'
      addToMsgButton.current.style.transition = 'transform .2s ease-in-out'
    }
    setStateAddToMsg(!stateAddToMsg)
  }

  //funcion al presionar caja de texto, cierra modal emoji
  const handleEmojiPickerHide = () => {
    setShowEmojiPicker(false)
  }

  //funcion seleccionar emoji, lo setea al mensaje
  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message)
    editableMsg.current.innerHTML += emoji.emoji
    console.log(emoji)
  }

  //presiona boton enviar -> funcion enviar mensaje
  const sendChat = () => {
    // event.preventDefault();    
    if (msg.length > 0) {
      const replaceChatName = msg.replace("{chat_name}", currentChat.user_name);
      handleSendMsg(replaceChatName);
      setMsg("");
      editableMsg.current.innerHTML = ""
    }else{
      textInput.current.focus();
    }
  };

  //funcion enviar mensaje asincrona
  const handleSendMsg = (msg) => {
    //backend axios envia mensaje
    axios.post(sendMessageRoute, {
      from: currentUser.id,
      to: currentChat._id,
      message: msg,
    });
    //socket emite send-msg
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser.id,
      message: msg,
    })
    //añadimos el mensaje nuevo a la variable array messages
    const msgs = [...messages]
    const d = new Date();
    const time = d.getHours() + ":" + d.getMinutes();
    msgs.push({
      fromSelf: true,
      message: msg,
      datetime: time,
    })
    setMessages(msgs)

    //traemos los contactos
    fetchContacts
  };

  //funcion traer el ultimo mensaje del chat
  const getlastmsgByUser = async (user) => {
    if (currentChat) {
      const lastm = await axios.post(getLastMessagesRoute, {
        from: currentChat._id,
        to: currentUser.id,
      });
      var lastmsgByUser = lastm.data.data[0].mesa_text;
      if (lastmsgByUser.slice(0, 10) === 'data:image') {
        lastmsgByUser = 'Imagen'
      }
      const datetimeContactChat = lastm.data.data[0].mesa_sendedAt;
      //obtenemos los valores y los damos segun el id
      const d = new Date(datetimeContactChat);
      const d_time = d.getHours() + ":" + d.getMinutes();
      const d_date = d.getDate() + "/" + d.getMonth();

      const now = new Date();
      const now_date = now.getDate() + "/" + now.getMonth();

      var datetimechat = d_time + ' ' + d_date;

      if (d_date === now_date) {
        datetimechat = d_time;
      }

      if (lastmsgByUser.length > 200) {
        document.getElementById('msg'+user+'').innerHTML = 'Mensaje HTML'
      }else{
        document.getElementById('msg'+user+'').innerHTML = lastmsgByUser
      }
      document.getElementById('dtc'+currentChat._id+'').innerHTML = datetimechat
    }
  }
  //hook para traer los mensajes con socket.io
  useEffect(() => {
    const d = new Date();
    const time = d.getHours() + ":" + d.getMinutes();
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({fromSelf:false, message: msg, datetime: time })
      })
    }else{
    }
  }, [])

  //hook que actualiza el ultimo mensaje enviado cada vez que se brinde un mensaje
  useEffect(() => {
    arrivalMessage && setMessages((prev)=>[...prev, arrivalMessage])
    getlastmsgByUser(currentChat._id)
  }, [arrivalMessage])

  //hook para desplazarse al final de la ref scrollRef (chat)
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviur: "smooth"})
  }, [messages])

  //actualiza los valores de chatData
  const handleChangeChatData = (event) => {
    setChatData({ ...chatData, [event.target.name]: event.target.value })
  }
  //envia los datos de chatdata al controlador
  const saveChatData = async () =>{
    const { data } = await axios.post(updateChatUserRoute, {
      id: chatData._id,
      name: chatData.name,
      email: chatData.email,
      phone: chatData.phone,
      country: chatData.country,
      city: chatData.city,
    });
    if (data.status === true) {
      setModal(false);
      setTimeout(() => {
        toast.success(data.msg, toastOptions)
      }, 1000);
      currentChat.user_name = chatData.name
    }else{
      toast.error('Ha ocurrido un error', toastOptions)
    }
  }

  //seteamos imagen
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  //conertimos imagen a base 64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  //funcion arir cerrar modal imagen
  const handleImgHideShow = () => {
    if (stateImgToMsg===true) {
      imageToMsg.current.style.display = 'none'
      setBaseImage("");
    }else{
      imageToMsg.current.style.display = 'flex'
    }
    setStateImgToMsg(!stateImgToMsg)
  }
  
  //funcion enviar mensaje
  const handleSendImgMsg = () => {
    handleSendMsg(baseImage)
    handleImgHideShow()
    handleAddToMsgHideShow()
  }

  //funcion detectar si existe shortcode
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
  
  return (
    <>
    <div className="chat_contact">
      <div className="chatContainerAdmin">
        <div className="chat-header">
          <div className="avatar">
              <span>{currentChat.user_name.substring(0,2).toLowerCase()}</span>
          </div>
          <div className="username">
            <b>{currentChat.user_name}</b>
          </div>
          <button onClick={() => setModal(true)} className="modalContactDetails"><IoEllipsisVertical/></button>      
        </div>
        <div className="chat-messages admin">
          <div className="chat-admin">
          {messages.map((message) => {
            const mensaje = message.message;
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message ${
                    message.fromSelf ? "sended" : "recieved"
                  }`}
                >
                  <div className="content ">
                    {
                      message.message.slice(0, 10) === 'data:image' ?
                      <>
                        <img src={message.message} 
                        style={{
                          width: '100%',
                          borderRadius: '10px'
                        }}
                        />
                        <small>{message.datetime}</small>
                      </>
                      :
                      <>
                        <div dangerouslySetInnerHTML={{__html: message.message}}></div>
                        <small>{message.datetime}</small>
                      </>
                    }
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
        <div className="chat-input">
          <div className="emoji">
            <button ref={addToMsgButton} onClick={handleAddToMsgHideShow}><IoAdd/></button>
            <div className="addToMsg" ref={addToMsg}>
              <button onClick={handleImgHideShow}><IoCamera/></button>
              <button onClick={handleEmojiPickerHideShow}><IoHappy/></button>
            </div>
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>}
          </div>
          <div className="input-container">
            <div className="card resrapidOptions" ref={resrapidOptions} style={{padding:'10px'}}>
              <ul>
                {shorts ? (
                shorts.map((short) =>{
                  return(
                    <li onClick={() => {editableMsg.current.innerHTML = short.rera_text, setMsg(short.rera_text), resrapidOptions.current.style.display = 'none';}} key={short._id}>
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
            <div className="cteditable" ref={editableMsg} 
                contentEditable="true" style={{maxHeight:120}}
                onInput={(e) => {setMsg(editableMsg.current.innerHTML), handleChangeShort(e)}}></div>
            <button onClick={sendChat}><IoSend/></button>
          </div>
        </div>
      </div>
      <div className="contactDetails">
        <div className="avatar">
          <b>{chatData.user_name.substring(0,2).toLowerCase()}</b>
        </div>
        <div className="username">
          <h4><input className="inputr" name="user_name" value={chatData.user_name}
              style={{
                width: '100%',
                textAlign: 'center',
                border: 'none',
                background: 'transparent',
                fontSize: '22px',
                padding: 0

              }}
              onChange={(e)=>handleChangeChatData(e)}/></h4>
        </div>
        <div className="email">
          <span><input className="inputr" name="user_email" value={chatData.user_email} 
                style={{
                  width: '100%',
                  textAlign: 'center',
                  border: 'none',
                  background: 'transparent',
                  fontSize: '18px',
                  padding: 0,
                  marginTop: '-10px'
                }}
                onChange={(e)=>handleChangeChatData(e)}/></span>
        </div>
        <div className="boxDetails">
          <table>
            <tbody>
              <tr>
                <td width='80px'>Telefono</td>
                <td><input className="inputr" name="user_phone" value={chatData.user_phone} onChange={(e)=>handleChangeChatData(e)}/></td>
              </tr>
              <tr>
                <td width='80px'>Pais</td>
                <td><input className="inputr" name="user_country" value={chatData.user_country} onChange={(e)=>handleChangeChatData(e)}/></td>
              </tr>
              <tr>
                <td width='80px'>Ciudad</td>
                <td><input className="inputr" name="user_city" value={chatData.user_city} onChange={(e)=>handleChangeChatData(e)}/></td>
              </tr>
            </tbody>
          </table>
        </div>        
        <button className="btn btn-primary" onClick={saveChatData}>Guardar</button>
      </div>
                
      <Modal show={modal}>
        <div className="modal-dialog" style={{width: '300px'}}>
          <ModalHeader>
            <h4>{currentChat.user_name} &nbsp; <button className="btn-sm"><IoPencil/></button></h4>
          </ModalHeader>
          <ModalBody>
          <table width='100%'>
            <tbody>
              <tr>
                <td width='80px'>Nombre</td>
                <td><input className="inputr" name="user_name" value={chatData.user_name} onChange={(e)=>handleChangeChatData(e)}/></td>
              </tr>
              <tr>
                <td width='80px'>Correo</td>
                <td><input className="inputr" name="user_email" value={chatData.user_email} onChange={(e)=>handleChangeChatData(e)}/></td>
              </tr>
              <tr>
                <td width='80px'>Telefono</td>
                <td><input className="inputr" name="user_phone" value={chatData.user_phone} onChange={(e)=>handleChangeChatData(e)}/></td>
              </tr>
              <tr>
                <td width='80px'>Pais</td>
                <td><input className="inputr" name="user_country" value={chatData.user_country} onChange={(e)=>handleChangeChatData(e)}/></td>
              </tr>
              <tr>
                <td width='80px'>Ciudad</td>
                <td><input className="inputr" name="user_city" value={chatData.user_city} onChange={(e)=>handleChangeChatData(e)}/></td>
              </tr>
            </tbody>
          </table>
          </ModalBody>
          <ModalFooter>
            <button className='btn' onClick={() => setModal(false)}>Cerrar</button>
            <button className="btn btn-primary" onClick={saveChatData}>Guardar</button>
          </ModalFooter>
        </div>
      </Modal>
    </div>
    <div className="addImage" ref={imageToMsg}>
      <input
        type="file"
        accept="image/jpeg"
        onChange={(e) => {
          uploadImage(e);
        }}
      />
      {
        baseImage !== "" ?
        <>
        <img src={baseImage} />
        <div className="btns">
          <button className="btn" onClick={handleImgHideShow}>x</button>
          <button className="btn btn-primary" onClick={handleSendImgMsg}>Enviar</button>
        </div>
        </>
        :
        <button className="btn btn-primary" onClick={handleImgHideShow}>x</button>
      }
    </div>
    <ToastContainer/>
    </>
  )
}
