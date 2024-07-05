import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import { registrar, perfil, confirmar, autenticar, changePassword, validateToken, newPassword, updatePerfil } from '../controllers/veterinarioController.js';

const router = express.Router();

// URL PÚBLICA ==================================
router.post('/', registrar); // Asignación de métodos diferentes a URL's 
router.get('/confirm/:token', confirmar); // Parámetro dinámico
router.post('/login', autenticar);
router.post('/change-password', changePassword)
router.route("/change-password/:token") // Chaining route
    .get(validateToken)
    .post(newPassword);


// URL PRIVADAS ==================================
// Implementación de middleware, antes de la respectiva función
router.get('/profile', checkAuth, perfil)
router.put('/profile/:id', checkAuth, updatePerfil)

export default router;