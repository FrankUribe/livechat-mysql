const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'livechat'
})

module.exports.getResRap = async (req, res, next) => {
  try {
    const sql = "SELECT * FROM tb_resprapid ORDER BY rera_createdAt ASC";
    connection.query(sql, (error, result) => {
      if (error) {
        return res.json({ msg: error, status: false });
      } else {
        return res.json(result);
      }
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.addResRap= async (req, res, next) => {
  try {
    const { short, text } = req.body;
    const sql = "INSERT INTO tb_resprapid set ?";
    const reraObj = {
      rera_short: short,
      rera_text: text,
    };
    connection.query(sql, reraObj, error => {
      if (error) {
        return res.json({ msg: "No se ha podido crear", status: false })
      } else {
        return res.json({ msg: "Se ha creado la respuesta", status: true });
      }
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getResRapByShort = async (req, res, next) => {
  try {
    const { short } = req.body;
    const sql = "SELECT * FROM tb_resprapid WHERE rera_short LIKE '" + short + "%'";
    connection.query(sql, (error, result) => {
      if (error) {
        return res.json({ status: false });
      } else {
        return res.json({ status: true, result });
      }
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.updateResRap = (req, res, next) => {
  try {
    const { short, text, id } = req.body;
    connection.query("UPDATE tb_resprapid SET rera_short = '"+short+"', rera_text = '"+text+"' WHERE _id = '"+id+"'", error => {
      if (error) {
        return res.json({ status: false })
      }
      return res.json({ status: true })
    });
  } catch (error) {
    next(error)
  }
};

module.exports.deleteResRap = (req, res, next) => {
  try {
    const { id } = req.body;
    connection.query("DELETE FROM tb_resprapid WHERE _id = '"+id+"'", error => {
      if (error) {
        return res.json({ status: false })
      }
      return res.json({ status: true })
    });
  } catch (error) {
    next(error)
  }
};