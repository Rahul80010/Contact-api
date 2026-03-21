const express = require('express');
const router = express.Router();
const Message = require('../model/message');
const checkAuth = require('../middleware/checkAuth');
const { getReceiverSocketId, getIo } = require('../socket');

router.post('/send/:id', checkAuth, async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.userData.userId; 

        if(!message) {
            return res.status(400).json({ error: "Message content is required" });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            getIo().to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

router.get('/:id', checkAuth, async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.userData.userId;

        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

module.exports = router;
