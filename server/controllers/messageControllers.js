const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'livechat'
})

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const sql = "INSERT INTO tb_messages set ?";
    const messageObj = {
      mesa_text: message,
      mesa_from: from,
      mesa_to: to
    };
    connection.query(sql, messageObj, error => {
      if (error) {
        return res.json({ status: false })
      } else {
        const sql = "SELECT * FROM tb_messages ORDER BY mesa_sendedAt DESC LIMIT 1";
        connection.query(sql, (error, result) => {
          if (error) {
            return res.json({ msg: "Error en el servidor", status: false });
          } else {
            const data = result[0]
            return res.json({ status: true, data });
          }
        });
      }
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const sql = "SELECT * FROM tb_messages "+
                "WHERE mesa_from = '"+from+"' AND mesa_to = '"+to+"' "+
                "OR mesa_from = '"+to+"' AND mesa_to = '"+from+"' "+
                "ORDER BY mesa_sendedAt ASC";
    connection.query(sql, (error, result) => {
      if (error) {
      } else {
        const projectedMessages = result.map((msg) => {
          const d = new Date(msg.mesa_sendedAt);
          const now = new Date();
          var time = d.getHours() + ":" + d.getMinutes();
          var date = d.getDate() + "/" + d.getMonth();
          var datenow = now.getDate() + "/" + now.getMonth();
          if (datenow !== date) {
            time = time + ' ' + date;
          }
          return {
            fromSelf: msg.mesa_from === from,
            message: msg.mesa_text,
            datetime: time,
          };
        });
        res.json(projectedMessages);
      }
    });
  } catch (ex) {
    next(ex);
  }
};
module.exports.getLastMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const sql = "SELECT * FROM tb_messages "+
                "WHERE mesa_from = '"+from+"' AND mesa_to = '"+to+"' "+
                "OR mesa_from = '"+to+"' AND mesa_to = '"+from+"' "+
                "ORDER BY mesa_sendedAt DESC LIMIT 1";
    connection.query(sql, (error, result) => {
      if (error) {
        return res.json({ msg: "Error en el servidor", status: false });
      } else {
        const data = result
        return res.json({ status: true, data });
      }
    });
  } catch (ex) {
    next(ex);
  }
};