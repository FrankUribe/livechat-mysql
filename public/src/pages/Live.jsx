import '../assets/live.css'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from "react";
import Picker from 'emoji-picker-react';
import iconCcip from '../assets/icon.png'
import { IoSend, IoHappy, IoAdd, IoCamera, IoChatbubblesOutline, IoDocument } from "react-icons/io5";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";
import { getAdminUser, getMessagesRoute, newChatUserRoute, sendMessageRoute, updateIsActiveRoute, getScheduleByDay, getUserRoute, host } from "../utils/APIRoutes";

// window.global = window;
export default function Live() {
  const textInput = useRef(null);
  const [msg, setMsg] = useState("");
  const [formComplete, setFormComplete] = useState("");
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [adminUser, setAdminUser] = useState({})
  const [messages, setMessages] = useState([]);
  const [userChat, setUserChat] = useState({
    name: "",
    email: "",
  })
  //Obtener el dia en capitalize y español; y la hora
  const datenow = new Date();
  const daynow = datenow.toLocaleDateString('es-ES', {weekday: 'long'})
  const capitalDay = daynow.charAt(0).toUpperCase() + daynow.slice(1);
  const timenow = datenow.toLocaleTimeString('es-ES', { timeZone: 'America/Lima' });
  const [hora, setHora] = useState(false)
  const [horario, setHorario] = useState({})

  const scrollRef = useRef();
  const socket = useRef();  
  const addToMsg = useRef(null);
  const imageToMsg = useRef(null)
  const fileToMsg = useRef(null)
  const addToMsgButton = useRef(null);
  const fileToSend = useRef(null)
  const [baseImage, setBaseImage] = useState("");
  const [baseFile, setBaseFile] = useState("");
  const [stateAddToMsg, setStateAddToMsg] = useState(false);
  const [stateImgToMsg, setStateImgToMsg] = useState(false);
  const [stateFileToMsg, setStateFileToMsg] = useState(false);
  
  var pkuser = ''
  var pkadmin = ''
  // traer el pk del admin para chatear
  const traerAdminUser = async () => {
    const { data } = await axios.post(getAdminUser);
    if (data.status === true) {
      setAdminUser(data.id)
      pkadmin = data.id
    }
  }  

  //traer el pk del usario, sino exite en la db, borramos el local
  const traerChatUser = async () => {
    if (localStorage.getItem('chatUser')) {
      const pk = JSON.parse(localStorage.getItem('chatUser')).id
      const { data } = await axios.post(getUserRoute, { id: pk })
      if (data.status === true) {
        setCurrentUser(JSON.parse(localStorage.getItem('chatUser')));
        axios.post(updateIsActiveRoute, {
          id: pk,
          status: 1,
        })
        socket.current = io(host);
        socket.current.emit("setActiveUser")
        pkuser = pk
      } else {
        localStorage.removeItem("chatUser");
      }
    }
  }

  const consultSchedule = async () => {
    const data = await axios.get(`${getScheduleByDay}/${capitalDay}`);
    if (data) {
      setHorario(data.data.result[0])
      const open = data.data.result[0].sche_open;
      const close = data.data.result[0].sche_close;

      if (open < timenow && close > timenow) {
        setHora(true)
      }else{
        setHora(false)
      }
    }
  }


  useEffect(async () => {
    await traerChatUser()
    await traerAdminUser()
    await consultSchedule()
  }, [])
  
  useEffect( async () => {
    const { data } = await axios.post(getAdminUser);
    const pkadmin = data.id
    // si existe un chat user en el local
    const startgetting = async () => {
      if (localStorage.getItem('chatUser')) {
        const pk = JSON.parse(localStorage.getItem('chatUser')).id
        const { data } = await axios.post(getUserRoute, { id: pk })
        if (data.status === true) {
          setCurrentUser(JSON.parse(localStorage.getItem('chatUser')));
          axios.post(updateIsActiveRoute, {
            id: pk,
            status: 1,
          })
          socket.current = io(host);
          socket.current.emit("setActiveUser")          
          pkuser = pk
          const response = await axios.post(getMessagesRoute, {
            from: pk,
            to: pkadmin,
          });
          setMessages(response.data);
        } else {
          localStorage.removeItem("chatUser");
        }
      }
    };
    startgetting()
  }, [])
  
  const handleisActive = async () => {
    await axios.post(updateIsActiveRoute, {
      id: currentUser.id,
      status: 1,
    })
  };
  const handleisNotActive = async () => {
    await axios.post(updateIsActiveRoute, {
      id: currentUser.id,
      status: 0,
    })
  };

  window.onbeforeunload = function (e) {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("setActiveUser")
      handleisNotActive()
    }
  };

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }
  const handleEmojiPickerHide = () => {
    setShowEmojiPicker(false)
  }
  const handleEmojiClick = (event, emoji) => {
    const img = '<span><img class="emoji-img" style="width: auto; max-width:16px; margin-bottom:-3px; position:relative" src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/'+emoji.unified+'.png"/></span>'
    let message = msg;
    message += img;
    setMsg(message)
  }  
  
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

  const handleChange = (event) => {
    setUserChat({ ...userChat, [event.target.name]: event.target.value })
  }

  const handleValidation = () => {
    const inputname = document.getElementById('name');
    const inputemail = document.getElementById('email');
    const inputs = [  inputname, inputemail ];
    const {name,email} = userChat;
    if (name==='' || email==='' ) {
      inputs.forEach((input) => {
        if (input.value==='') {
          input.style.border = "1px solid red";
        }else{
          input.style.border = "1px solid #aaa";
        }
      });
      setFormComplete('Completa los campos')
      return false;
    }else{
      setFormComplete('')
      inputs.forEach((input) => {
        input.style.border = "1px solid #aaa";
      });
      return true;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation() && !currentUser){
      const { email, name } = userChat;
      const pkNewChatUser = uuidv4();
      const { data } = await axios.post(newChatUserRoute, {
        id: pkNewChatUser,
        email,
        name,
      });
      if (data.status === false) {
        setFormComplete('No se pudo guardar')
      }
      if (data.status === true) {
        localStorage.setItem('chatUser', JSON.stringify(data.data))
        setCurrentUser(await JSON.parse(localStorage.getItem('chatUser')));
        setTimeout(
          function(){
            sendIniciarMsg(data.data)
          }, 2000);
        pkuser = pkNewChatUser
      }
    }
  }
  //presiona boton enviar/
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }else{
      textInput.current.focus();
    }
  };

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser.id,
      to: adminUser,
      message: msg,
    });
    socket.current.emit("send-msg", {
      from: currentUser.id,
      to: adminUser,
      message: msg,
    })
    const msgs = [...messages]
    const d = new Date();
    const time = d.getHours() + ":" + d.getMinutes();
    msgs.push({
      fromSelf: true,
      message: msg,
      datetime: time,
    })
    setMessages(msgs)    
    const response = await axios.post(getMessagesRoute, {
      from: currentUser.id,
      to: adminUser,
    });
    setMessages(response.data);
  };

  const sendIniciarMsg = async (user) => {
    await axios.post(sendMessageRoute, {
      from: user.id,
      to: adminUser,
      message: "Iniciar",
    });
    const msgs = [...messages]
    const d = new Date();
    const time = d.getHours() + ":" + d.getMinutes();
    msgs.push({
      fromSelf: true,
      message: "Iniciar",
      datetime: time,
    })
    
    setMessages(msgs)

    setTimeout(
      function(){
        sendWellcomeMsg(user)
      }
    ,1000);
  };

  const sendWellcomeMsg = async (user) => {
    await axios.post(sendMessageRoute, {
      from: adminUser,
      to: user.id,
      message: "Hola "+user.name+" un asistente se unirá al chat en breve...",
    });
    const msgs = [...messages]
    const d = new Date();
    const time = d.getHours() + ":" + d.getMinutes();
    msgs.push({
      fromSelf: false,
      message: "Hola "+user.name+" un asistente se unirá al chat en breve...",
      datetime: time,
    })
    setMessages(msgs)
  };

  
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.id);

      const d = new Date();
      const time = d.getHours() + ":" + d.getMinutes();
      if (socket.current) {
        socket.current.on("msg-recieve", (msg) => {
          setArrivalMessage({fromSelf:false, message: msg, datetime: time})
        console.log('recived')
        })
      }else{
        console.log('no hay socket.current')
      }
    }
  }, [currentUser]);

  useEffect(() => {
    arrivalMessage && setMessages((prev)=>[...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviur: "smooth"})
  }, [messages])


  
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

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

  const handleImgHideShow = () => {
    if (stateImgToMsg===true) {
      imageToMsg.current.style.display = 'none'
      setBaseImage("");
    }else{
      imageToMsg.current.style.display = 'flex'
      handleAddToMsgHideShow()
    }
    setStateImgToMsg(!stateImgToMsg)
  }
  
  const handleSendImgMsg = () => {
    handleSendMsg(baseImage)
    handleImgHideShow()
    handleAddToMsgHideShow()
  }

  
  const handleFileHideShow = () => {
    if (stateFileToMsg===true) {
      fileToMsg.current.style.display = 'none'
      setBaseFile("");
    }else{
      fileToMsg.current.style.display = 'flex'
      handleAddToMsgHideShow()
    }
    setStateFileToMsg(!stateFileToMsg)
  }
  
  const handleSendFileMsg = async () => {
    const file = fileToSend.current.files[0];
    const username = JSON.parse(localStorage.getItem('chatUser')).name
    if (file) {
      const fileName = fileToSend.current.files[0].name;
      const fileNameToPath = username+' - '+fileToSend.current.files[0].name;
      const tomsg = '<a href="https://chat.ccipperu.com/upload/chatfiles/'+fileNameToPath+'" target="blank">'+fileName+'</a>'
      
      const uploadFile = async () => {
        let formData = new FormData();
        formData.append("file", fileToSend.current.files[0]);
        formData.append("filename", fileNameToPath)
        const local = 'http://localhost/upload/upload.php'
        const deply = 'https://chat.ccipperu.com/upload/upload.php'
        await fetch(deply, {
          method: "POST", 
          body: formData
        }); 
      }

      uploadFile()
      handleSendMsg(tomsg)
      handleFileHideShow()
      handleAddToMsgHideShow()
      fileToSend.current.value = null
    }
  }

  useEffect(() => {
    setInterval(async () => {
      if (pkuser !== '' & pkadmin !== '') {
        const response = await axios.post(getMessagesRoute, {
          from: pkuser,
          to: pkadmin,
        });
        setMessages(response.data);
        console.log('getting msgs evr 5s')
      }
    }, 5000)
  }, [])
  
  return (
    <>
    <div className="chatContainer">
      <div className="chatBox">
        <div className="chatHeader">
          <div className="iconChat">
            <img src={iconCcip} alt="Chatea con CCIP" />
          </div>
          <h3>Chatea con CCIP</h3>
        </div>
        <div className="chatBody">
          <div className="msgs">
          {
            currentUser ? (
              hora === false ? (
                <center className="notTime"
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                  }}
                >
                  <IoChatbubblesOutline style={{fontSize: 60, color:'#ed2f2f'}}/>
                  <h2 style={{color:'#ed2f2f'}}>No disponible</h2>
                  <span>Hemos recibido tu notificación, pero en este momento no podemos responder tus mensajes.</span>
                  <span>Encuentranos entre las <b>{horario.sche_open}</b> y <b>{horario.sche_close}</b></span>
                </center>
              ) : (
              <div className="chat-messages">
                {messages.map((message) => {
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
                              <p dangerouslySetInnerHTML={{__html: message.message}}></p>
                              <small>{message.datetime}</small>
                            </>
                          }
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              )
            ) : (
              <div className="registerChat">
                <form onSubmit={(event) => handleSubmit(event)}>
                  <h4>Por favor, necesitamos estos datos</h4>
                  <input type="text" placeholder="Nombre" name="name" id="name" onChange={(e)=>handleChange(e)}/>
                  <input type="email" placeholder="Email" name="email" id="email" onChange={(e)=>handleChange(e)}/>
                  <p style={{fontsize: '10px', color:'red'}}>{formComplete}</p>
                  <button type="submit">Iniciar</button>
                </form>
              </div>
            )
          }
          </div>
        </div>
        <div className="chatFooter">
          {
            currentUser ? (
              hora === false ? (
                <center style={{textAlign: 'center', width: '100%'}}>No disponible...</center>
              ) : (
                <>
                <div className="emoji">
                  <button ref={addToMsgButton} onClick={handleAddToMsgHideShow}><IoAdd/></button>
                  <div className="addToMsg" ref={addToMsg}>
                    <button onClick={handleFileHideShow}><IoDocument/></button>
                    <button onClick={handleImgHideShow}><IoCamera/></button>
                    {/* <button onClick={handleEmojiPickerHideShow}><IoHappy/></button> */}
                  </div>
                  {/* {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>} */}
                </div>
                <form className="input-container" onSubmit={(event) => sendChat(event)}>
                  <input
                    type="text"
                    placeholder={'Escribe un mensaje '+currentUser.name}
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                    ref={textInput}
                    onClick={handleEmojiPickerHide}
                  />
                  <button type="submit"><IoSend/></button>
                </form>
                </>
              )
            ) : (
              <center style={{textAlign: 'center', width: '100%'}}>Completa los datos para iniciar el chat</center>
            )
          }
        </div>
      </div>
      
      <div className="addImageChatUser" ref={imageToMsg}>
        <span>Envio de imagen</span>
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
      <div className="addFileChatUser" ref={fileToMsg}>
        <span>Envio de archivo</span>
        <input type="file" accept="application/pdf" ref={fileToSend}/>
        {
          baseFile !== "" ?
          <>
          {/* <Link to={baseFile}>File</Link> */}
          </>
          :
          ''
        }
        <div className="btns" id='gbtns'>
          <button className="btn" onClick={handleFileHideShow}>x</button>
          <button className="btn btn-primary" onClick={handleSendFileMsg}>Enviar</button>
        </div>
      </div>
    </div>
    </>
  )
}
