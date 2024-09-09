package com.tpdb.flagle.controllers;

import com.tpdb.flagle.entities.Pais;
import com.tpdb.flagle.repositories.PaisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.tpdb.flagle.FlagleApplication.paisHoje;

@RestController
@RequestMapping(value = "/paises")
public class PaisRestController {

    @Autowired
    private PaisRepository paisRepository;

    @GetMapping
    public List<Pais> findAll() {
        return paisRepository.findAll();
    }

    @GetMapping(value = "/nomes")
    public List<String> findAllNames() {
        return paisRepository.findAllNames();
    }

    @GetMapping(value = "/bandeira/{pais_id}")
    public ResponseEntity<byte[]> getFlagById(@PathVariable Long pais_id) {
        Optional<Pais> optionalCountry = paisRepository.findById(pais_id);
        if (optionalCountry.isEmpty()) {
            return new ResponseEntity<>(new byte[0], HttpStatus.NOT_FOUND);
        }

        Pais pais = optionalCountry.get();
        byte[] imageBytes = pais.getBandeira();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }

    @GetMapping(value = "/hoje")
    public ResponseEntity<byte[]> getTodayFlag() {
        return getFlagById(paisHoje.getId());
    }

    @GetMapping(value = "/hoje/nome")
    public String getTodayName() {
        return paisHoje.getNome();
    }

    @GetMapping(value = "/id/{nome_pais}")
    public Long getIdByName(@PathVariable String nome_pais) {
        return paisRepository.getIdByName(nome_pais);
    }

    @PutMapping(value = "/update/{id}")
    public void updateNome(@PathVariable(value = "id") Long id, @RequestBody Pais novopais) {
        Optional<Pais> paisOptional = paisRepository.findById(id);
        // Checa se existe algum país com o ID informado
        if (paisOptional.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }
        paisRepository.updateNome(id, novopais.getNome());
    }

}
