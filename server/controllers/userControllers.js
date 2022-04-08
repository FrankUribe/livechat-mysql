const User = require("../model/userModel");
const mysql = require('mysql');
const bcrypt = require("bcrypt")
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'livechat'
})

module.exports.login = async (req, res, next) => {  
  async function compareIt(password, hashedPsw, data){
    const isPasswordValid = await bcrypt.compare(password, hashedPsw)
    if (!isPasswordValid){
      return res.json({ msg: "Contraseñas no coinciden", status: false });
    }else{
      return res.json({ status: true, data });
    }
  }

  try {
    const { email, password } = req.body;
    connection.query("SELECT * FROM tb_users WHERE user_email = '" + email + "' AND user_account = 1", (error, result) => {
      if (error) {
        return res.json({ msg: "Correo incorrecto", status: false });
      }else{
        if (result.length <= 0) {
          return res.json({ msg: "Usuario sin accesso", status: false });
        }else{
          data = {
            email: result[0].user_email,
            name: result[0].user_name,
            id: result[0]._id
          }
          compareIt(password, result[0].user_cryptPassword, data);
        }
      }
    });
  } catch (error) {
    next(error)
  }
};

module.exports.getAdminUser = async (req, res, next) => {
  try {
    connection.query("SELECT * FROM tb_users WHERE user_account = 1 LIMIT 1", (error, result) => {
      if (error) {
        return res.json({ msg: "Error en el servidor", status: false });
      }else{
        if (result.length <= 0) {
          return res.json({ msg: "Usuario sin accesso", status: false });
        }else{
          return res.json({ status: true, id: result[0]._id });
        }
      }
    });
    
    // delete user.password;
  } catch (error) {
    next(error)
  }
};

module.exports.newChatUser = async (req, res, next) => {
  try {
    const { id, email, name } = req.body;
    const sql = 'INSERT INTO tb_users SET ?';
    const chatUserObj = {
      _id: id,
      user_email: email,
      user_name: name
    };
    connection.query(sql, chatUserObj, error => {
      if (error) {
        return res.json({ status: false })
      } else {
        data = {
          id: id,
          name: name,
        }
        return res.json({ status: true, data })
      }
    });
  } catch (error) {
    next(error)
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "name",
      "_id",
      "isActive",
      "phone",
      "country",
      "city",
    ]).sort({ _id: -1 });
    return res.json(users);
  } catch (error) {
    next(error)
  }
};

module.exports.updateIsActive = async (req, res, next) => {
  try {
    const { id, status } = req.body;
    await User.updateOne({ _id: id }, { isActive: status })
    
    connection.query("UPDATE tb_users SET user_online = "+status+" WHERE _id = "+id+"");
  } catch (error) {
    next(error)
  }
};

module.exports.updateChatUser = async (req, res, next) => {
  try {
    const { id, name, email, phone, country, city } = req.body;
    const user = await User.updateOne({ _id: id }, {
      email: email,
      name: name,
      phone: phone,
      country: country,
      city: city,
    })
    if (user)
      return res.json({ msg: "Los datos se han actualizado exitosamente", status: true });
  } catch (error) {
    next(error)
  }
};