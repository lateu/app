const express=require('express');
const { save, sayHello } = require('../controllers/messageController');
const router=express.Router();


router.post("/saveMessage", save);
router.get("/",sayHello);

module.exports=router;