const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'livechat'
})

module.exports.getSchedule = async (req, res, next) => {
  try {
    const sql = "SELECT * FROM tb_schedule";
    connection.query(sql, (error, result) => {
      if (error) {
        return res.json({ msg: "Error en el servidor", status: false });
      }else{
        if (result.length <= 0) {
          return res.json({ msg: "Error en la consulta", status: false });
        }else{
          return res.json({ result, status: true });
        }
      }
    });
  } catch (error) {
    next(error)
  }
};

module.exports.getScheduleByDay = async (req, res, next) => {
    try {
      const sql = "SELECT * FROM tb_schedule WHERE sche_day = '"+req.params.day+"'";
      connection.query(sql, (error, result) => {
        if (error) {
          return res.json({ msg: "Error en el servidor", status: false });
        }else{
          if (result.length <= 0) {
            return res.json({ msg: "Error en la consulta", status: false });
          }else{
            return res.json({ result, status: true });
          }
        }
      });
    } catch (error) {
      next(error)
    }
  };

module.exports.updateSchedule = async (req, res, next) => {
  try {
    const { open, close, id } = req.body;
    const sql = "UPDATE tb_schedule SET sche_open='"+open+"', sche_close='"+close+"' WHERE _id = '"+id+"'";
    connection.query(sql, error => {
      if (error) {
        return res.json({ msg: "Error en el servidor", status: false });
      }else{
        return res.json({ msg: "Los datos se han actualizado exitosamente", status: true });
      }
    });
  } catch (error) {
    next(error)
  }
};