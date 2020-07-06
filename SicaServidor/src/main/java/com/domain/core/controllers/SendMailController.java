package com.domain.core.controllers;

import com.domain.core.document.Usuario;
import com.domain.core.security.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController
@CrossOrigin()
public class SendMailController {

    @Autowired
    private EmailService emailservice;
     

    @PostMapping("/sendMail")
    public void sendMail(@RequestBody String mail){
        emailservice.sendMail(mail);
    }
    
}
