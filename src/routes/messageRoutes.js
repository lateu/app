const express=require('express');
const { saveMessage, sayHello } = require('../controllers/messageController');
const router=express.Router();


router.post("/save", saveMessage);
router.get("/",sayHello);


app.get('/healthz', (req, res) => {
  res.sendStatus(200);
});

module.exports=router;