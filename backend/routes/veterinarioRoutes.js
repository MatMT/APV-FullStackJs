import express from 'express';
import { registrar, perfil, confirmar, autenticar } from '../controllers/veterinarioController.js';

const router = express.Router();

// Asignación de métodos diferentes a URL's ========

router.post('/', registrar);

router.get('/perfil', perfil)

// Parámetro dinámico
router.get('/confirmar/:token', confirmar);

router.post('/login', autenticar)

export default router;