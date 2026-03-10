import express from 'express';
import userSignUpController from '../Controller/userSignup';
import userLogoutController from '../Controller/UserLogout';
import userloginController from '../Controller/UserLogin';
import isAuthorised from '../Middleware/UserAuthorization';
import isAuthenticated from '../Middleware/UserAuthentication';


const router = express.Router();

// routes
router.post('/signup', userSignUpController);
router.post('/login', userloginController);
router.get('/logout', userLogoutController);
router.get('/check-auth', isAuthenticated,isAuthorised);

export default router;
