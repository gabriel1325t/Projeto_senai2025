module.exports = function validateUser({numero, capacidade, descricao}){
 
    if(!numero || !capacidade ||!descricao ){
        return{error: "Todos os campos devem ser preenchidos"};
    }
    if(numero !== 0){
        return{error: "Sala já cadastrada"}
    }else {
        resolve(null);
      }
    return null; // se estiver tudo certo retorna nulo pra ignorar o if na userController
}