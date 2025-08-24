const express=require('express');
const { saveMessage, sayHello } = require('../controllers/messageController');
const router=express.Router();


router.post("/saveMessage", saveMessage);
router.get("/",sayHello);

module.exports=router;