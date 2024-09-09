package com.tpdb.flagle.controllers;

import com.opencsv.CSVWriter;
import com.tpdb.flagle.repositories.PaisRepository;
import com.tpdb.flagle.repositories.UsuarioRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/relatorios")
public class RelatoriosController {

    @Autowired
    private PaisRepository paisRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping(value = "/paises/maisacertos", produces = "text/csv")
    public void paisesMaisAcertos(HttpServletResponse response) throws IOException {
        List<Object[]> data = paisRepository.maisAcertos(); // Fetch data from repository

        // Set response headers
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=paises-mais-acertos.csv");

        // Create a CSV writer
        try (CSVWriter writer = new CSVWriter(response.getWriter())) {
            // Write header
            writer.writeNext(new String[]{"Nome do País", "Total Acertos"});

            // Write data rows
            for (Object[] row : data) {
                String nome = (String) row[0];
                Long totalAcertos = ((Number) row[1]).longValue();
                writer.writeNext(new String[]{nome, totalAcertos.toString()});
            }
        }
    }

    @GetMapping(value = "/paises/maisjogados", produces = "text/csv")
    public void paisesMaisJogados(HttpServletResponse response) throws IOException {
        List<Object[]> data = paisRepository.maisJogados(); // Fetch data from repository

        // Set response headers
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=paises-mais-jogados.csv");

        // Create a CSV writer
        try (CSVWriter writer = new CSVWriter(response.getWriter())) {
            // Write header
            writer.writeNext(new String[]{"Nome do País", "Vezes Jogadas"});

            // Write data rows
            for (Object[] row : data) {
                String nome = (String) row[0];
                Long vezesJogadas = ((Number) row[1]).longValue();
                writer.writeNext(new String[]{nome, vezesJogadas.toString()});
            }
        }
    }

    @GetMapping(value = "/usuarios/maisjogadas", produces = "text/csv")
    public void usuariosMaisJogadas(HttpServletResponse response) throws IOException {
        List<Object[]> data = usuarioRepository.maisJogadas(); // Fetch data from repository

        // Set response headers
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=usuarios-mais-jogadas.csv");

        // Create a CSV writer
        try (CSVWriter writer = new CSVWriter(response.getWriter())) {
            // Write header
            writer.writeNext(new String[]{"Nome de Usuário", "Vezes Jogadas"});

            // Write data rows
            for (Object[] row : data) {
                String nome = (String) row[0];
                Long vezesJogadas = ((Number) row[1]).longValue();
                writer.writeNext(new String[]{nome, vezesJogadas.toString()});
            }
        }
    }

}
