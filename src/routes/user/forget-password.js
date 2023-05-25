/******* Load Controller */
import {resetPasswordAction } from '../../controllers/user/reset-password';
const router = require('express').Router();

router.post('/', resetPasswordAction);
module.exports = router;
