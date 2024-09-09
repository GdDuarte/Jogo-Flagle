package com.tpdb.flagle.controllers;

import com.tpdb.flagle.entities.RankingDiario;
import com.tpdb.flagle.repositories.RankingDiarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/rankings")
public class RankingDiarioRestController {

    @Autowired
    private RankingDiarioRepository rankingDiarioRepository;

    @GetMapping
    public List<RankingDiario> findAll() {
        return rankingDiarioRepository.findAll();
    }

    @GetMapping(value = "/date/{id}")
    public LocalDate findDate(@PathVariable("id")Long id) {
        if (rankingDiarioRepository.existsById(id)) {
            return rankingDiarioRepository.findDateById(id);
        }
        throw new RuntimeException("ID não existe");
    }

    @GetMapping(value = "/data/{id}")
    public List<Object> findRankingData(@PathVariable("id")Long id_ranking) {
        return rankingDiarioRepository.findRankingData(id_ranking);
    }
}
