package com.tpdb.flagle.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "pais")
public class Pais {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pais")
    private long id;
    @Column(name = "nome")
    private String nome;
    @Column(name = "dia_jogado")
    private LocalDate diaJogado;
    @Lob
    @Column(name = "bandeira", columnDefinition = "MEDIUMBLOB")
    private byte[] bandeira;

    public Pais() {
    }

    public Pais(long id, String nome, LocalDate diaJogado, byte[] bandeira) {
        this.id = id;
        this.nome = nome;
        this.diaJogado = diaJogado;
        this.bandeira = bandeira;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public LocalDate getDiaJogado() {
        return diaJogado;
    }

    public void setDiaJogado(LocalDate diaJogado) {
        this.diaJogado = diaJogado;
    }

    public byte[] getBandeira() {
        return bandeira;
    }

    public void setBandeira(byte[] bandeira) {
        this.bandeira = bandeira;
    }
}
