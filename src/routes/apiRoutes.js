const router = require('express').Router();

const controllerCadastro = require("../controllers/controllerUsuario");
const controllerSala = require("../controllers/controllerSala");
const reservaController = require('../controllers/controllerReserva');

//Rotas Usuario
router.post('/usuario', controllerCadastro.createUser);
router.get('/usuario', controllerCadastro.getAllUsers);
router.put('/usuario', controllerCadastro.updateUser);
router.delete('/usuario/:id', controllerCadastro.deleteUser);
router.post('/login', controllerCadastro.loginUser);

router.post('/sala', controllerSala.createSala);
router.get('/sala', controllerSala.getAllSalas);
router.put('/sala', controllerSala.updateSala);
router.delete('/sala/:id', controllerSala.deleteSala);

router.get("/reserva", reservaController.createReservas); 
router.post("/reserva", reservaController.createReservas); 
router.get("/reservas", reservaController.getAllReservas); 
router.put("/reserva/:id_reserva", reservaController.updateReserva); 
router.delete("/reserva/:id_reserva", reservaController.deleteReserva);

// http://10.89.240.68:5000/projeto_senai/

module.exports = router;