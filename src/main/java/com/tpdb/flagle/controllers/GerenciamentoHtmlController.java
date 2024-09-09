package com.tpdb.flagle.controllers;

import com.tpdb.flagle.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/gerencia")
public class GerenciamentoHtmlController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping(value = "/usuarios")
    public String gerenciaPaises() {
        return "crud-usuario.html";
    }

    @GetMapping(value = "/usuarios/{id_usuario}/sessoes")
    public String gerenciaSessoes(@PathVariable("id_usuario") Long id) {
        if (usuarioRepository.existsById(id)) {
            return "usuario-sessoes.html";
        }
        throw new RuntimeException("Usuário não existe");
    }

    @GetMapping(value = "/paises")
    public String gerenciaUsuarios() {
        return "crud-pais.html";
    }

    @GetMapping(value = "/rankings")
    public String gerenciaRankings() {
        return "crud-ranking.html";
    }

}
