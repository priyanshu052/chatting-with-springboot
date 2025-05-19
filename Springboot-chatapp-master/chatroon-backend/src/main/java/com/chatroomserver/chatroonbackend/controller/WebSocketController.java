package com.chatroomserver.chatroonbackend.controller;

import com.chatroomserver.chatroonbackend.model.Message;
import com.chatroomserver.chatroonbackend.model.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receiveMessage(@Payload Message message) {
        if (message.getStatus() == Status.JOIN) {
            message.setMessage(message.getSenderName() + " joined the chat");
        } else if (message.getStatus() == Status.LEAVE) {
            message.setMessage(message.getSenderName() + " left the chat");
        }
        return message;
    }

    @MessageMapping("/private-message")
    public void receivePrivateMessage(@Payload Message message) {
        messagingTemplate.convertAndSendToUser(
                message.getReceiverName(), "/private", message);
    }

    @MessageMapping("/typing")
    public void handleTyping(@Payload Message message) {
        messagingTemplate.convertAndSendToUser(
                message.getReceiverName(), "/private", message);
    }
}
