package com.tpdb.flagle.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/cadastro")
public class CadastroRestController {

    @GetMapping(value = "")
    public String cadastro() {
        return "cadastro.html";
    }

}
