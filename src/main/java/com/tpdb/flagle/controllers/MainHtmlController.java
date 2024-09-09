package com.tpdb.flagle.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainHtmlController {

    @GetMapping(value = "/")
    public String mainPage() {
        return "main.html";
    }

}
