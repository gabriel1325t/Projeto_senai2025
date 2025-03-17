const connect = require("../db/connect");
const validateSala = require("../services/validateSala");
module.exports = class classroomController {
  static async createSala(req, res) {
    const { numero, descricao, capacidade } = req.body;

    const validationError = validateSala(req.body);
        if (validationError) {
          return res.status(400).json(validationError);
        }

    // Caso todos os campos estejam preenchidos, realiza a inserção na tabela
    const query = `INSERT INTO sala (numero, descricao, capacidade) VALUES ( 
        '${numero}', 
        '${descricao}', 
        '${capacidade}'
      )`;

    try {
      connect.query(query, function (err) {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "Erro ao cadastrar sala" });
          return;
        }
        console.log("Sala cadastrada com sucesso");
        res.status(201).json({ message: "Sala cadastrada com sucesso" });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }


  static async getAllSalas(req, res) {
    const query = `SELECT * FROM sala`;

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do Servidor" });
        }

        return res
          .status(200)
          .json({ message: "Lista de salas", sala: results });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async updateSala(req, res) {
    // Desestrutura e recupera os dados enviados via corpo da requisição
    const { id_sala, numero, capacidade, descricao} = req.body;

    // Validar se todos os campos foram preenchidos
    if (!numero || !capacidade ||!descricao ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const query = `UPDATE sala SET numero=?,capacidade=?,descricao=? WHERE id_sala = ?`;
    const values = [numero, capacidade, descricao, id_sala];

    try{
      connect.query(query,values,function(err,results){
        if(err){
          if(err.code === "ER_DUP_ENTRY"){
            return res.status(400).json({error:"Sala já cadastrada"});
          }else{
            console.error(err);
            return res.status(500).json({error:"Erro interno do servidor"});
          }
        }
        if(results.affectedRows === 0){
          return res.status(404).json({error:"Sala não encontrada"});
        }
        return res.status(200).json({message:"Sala atualizada com sucesso"});
        

      })
      
  }
    catch(error){
      console.error("Erro ao executar consulta",error);
      return res.status(500).json({error: "Erro interno no servidor"});

    }
  }

  static async deleteSala(req, res) {
    const salaId = req.params.id;
    const query = `DELETE FROM sala WHERE id_sala = ?`;
    const values = [salaId];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Sala não encontrada" });
        }

        return res
          .status(200)
          .json({ message: "Sala exluida com sucesso" });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json
        ({error:"Erro interno do servidor"});
    }
  }
};
