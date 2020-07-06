package com.domain.core.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailService {
	
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail(String to) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setFrom("sicaapp.unaj@gmail.com");
        mail.setTo(to);
        mail.setSubject("Reestablecer contraseña SICA");
        mail.setText("\n\n Para reestablecer dirigirse a: " + "\n http://localhost:8101/reestablish-password/"+to);

        javaMailSender.send(mail);
    }
}