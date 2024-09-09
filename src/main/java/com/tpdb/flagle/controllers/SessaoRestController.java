package com.tpdb.flagle.controllers;

import com.tpdb.flagle.entities.Sessao;
import com.tpdb.flagle.repositories.SessaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/sessoes")
public class SessaoRestController {

    @Autowired
    private SessaoRepository sessaoRepository;

    @GetMapping(value = "")
    public List<Sessao> findAll() {
        return sessaoRepository.findAll();
    }

    @GetMapping(value = "/{id}/dados")
    public List<Object> findSessionData(@PathVariable("id") Long idSessao) {
        return sessaoRepository.findSessionData(idSessao);
    }
}
