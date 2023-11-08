const express = require('express');
const authController = require('../controllers/authController'); // Require the controller
const router = express.Router();

// Import middleware modules
const jwtMiddleware = require('../middleware/jwtMiddleware');

const hosting = async (req, res) => {
    try {
      // Your hosting logic goes here
      // You can add code to serve HTML, CSS, or other resources to the client
  
      res.status(200).json({ message: "Hosting is active" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Hosting failed" });
    }
  };
  
router.get('/', hosting);
// Registration route
router.post('/setSystemAdmin', authController.systemAdminInitialize);

router.post('/systemAdmin/login', authController.systemAdminLogin);

// Login route
router.post('/user/registerUser', authController.registerUser);
router.post('/user/login', authController.userLogin);
router.post('/sendOtp', authController.sendOtp);

//refresh Token 
router.post('/token/refresh', authController.refreshAccessTokenMiddleware);

// Route to sign trx with trxData and password
router.post('/signTransaction', jwtMiddleware, authController.signTransaction);
router.post('/userOpsBuilder', jwtMiddleware, authController.userOpsBuilder);

// Route to get user wallet and balance with JWT middleware applied
router.get('/user/getWalletAndBalance', jwtMiddleware, authController.getUserWalletAndBalance);
router.get('/systemAdmin/getWalletAndBalance', jwtMiddleware, authController.getASystemAdminWalletAndBalance);
router.get('/getProfile', jwtMiddleware, authController.getProfile);

// Logout route
router.post('/user/logout', authController.userLogout);
router.post('/systemAdmin/logout', authController.systemAdminLogout);


module.exports = router;
