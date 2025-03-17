const connect = require("../db/connect");

module.exports = async function validateEmail(email, userId = null) {
    return new Promise((resolve, reject) => {
      const query = "SELECT id_usuario FROM usuario WHERE cpf = ?";
      const values = [email];
  
      connect.query(query, values, (err, results) => {
        if (err) {
          reject("Erro ao verificar email");
        } else if (results > 0) {
  
          // Se um userId foi passado (update) e o CPF pertence a outro usuário, retorna er
          } else if (!userId) {
            resolve({ error: "Email já cadastrado" });
          } else {
            resolve(null);
          }
      });
    });
  };