import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import { registrar, perfil, confirmar, autenticar } from '../controllers/veterinarioController.js';

const router = express.Router();

// Asignación de métodos diferentes a URL's 
router.post('/', registrar);
// Parámetro dinámico
router.get('/confirmar/:token', confirmar);

router.post('/login', autenticar)

// URL PRIVADAS ==================================
// Implementación de middleware, antes de la respectiva función
router.get('/perfil', checkAuth, perfil)
export default router;