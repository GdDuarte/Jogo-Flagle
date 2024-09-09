package com.tpdb.flagle.controllers;

import com.tpdb.flagle.repositories.RankingDiarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class RankingHtmlController {

    @Autowired
    private RankingDiarioRepository rankingDiarioRepository;

    @GetMapping(value = "/rankings/{id_ranking}")
    public String rankingPage(@PathVariable("id_ranking")Long id_ranking) {
        if (rankingDiarioRepository.existsById(id_ranking)) {
            return "usuarios-ranking.html";
        }
        throw new RuntimeException("ID não existe");
    }

}
