package com.chatroomserver.chatroonbackend.controller;

import com.chatroomserver.chatroonbackend.model.Message;
import com.chatroomserver.chatroonbackend.model.Status;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/message")
public class MessageRestController {

    private final SimpMessagingTemplate messagingTemplate;

    public MessageRestController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/send")
    public String sendMessage(@RequestBody Message message) {
        if (message.getStatus() == Status.JOIN) {
            message.setMessage(message.getSenderName() + " joined the chat");
        } else if (message.getStatus() == Status.LEAVE) {
            message.setMessage(message.getSenderName() + " left the chat");
        }

        messagingTemplate.convertAndSend("/chatroom/public", message);
        return "Message sent!";
    }
}
