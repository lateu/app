const Message = require('../models/GreetingModel');


exports.saveMessage = async (req, res) => {
  try {
    const newMessage = req.body;
   
    

    return res.status(201).json({
      status: "success",
      message:
        "message saved successfully.",
      data: {
        message: newMessage,
      },
    });
  } catch (error) {
  
    return res.status(500).json({ error: "Unable to save the message" });
  }
};


exports.sayHello = (req, res) => {

  return res.json({ success: true, message:"Hello! Wecome." });

};