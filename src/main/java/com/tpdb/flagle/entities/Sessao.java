package com.tpdb.flagle.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "sessao")
public class Sessao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sessao")
    private long id;
    @Column(name = "data_jogado")
    private LocalDate dataJogado;
    @Column(name = "tentativas")
    private int tentativas;
    @Column(name = "acertou")
    private boolean acertou;
    @Column(name = "id_usuario")
    private long idUsuario;
    @Column(name = "id_pais")
    private long idPais;

    public Sessao() {
    }

    public Sessao(long id, LocalDate dataJogado, int tentativas, boolean acertou, long idUsuario, long idPais) {
        this.id = id;
        this.dataJogado = dataJogado;
        this.tentativas = tentativas;
        this.acertou = acertou;
        this.idUsuario = idUsuario;
        this.idPais = idPais;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDate getDataJogado() {
        return dataJogado;
    }

    public void setDataJogado(LocalDate dataJogado) {
        this.dataJogado = dataJogado;
    }

    public int getTentativas() {
        return tentativas;
    }

    public void setTentativas(int tentativas) {
        this.tentativas = tentativas;
    }

    public boolean isAcertou() {
        return acertou;
    }

    public void setAcertou(boolean acertou) {
        this.acertou = acertou;
    }

    public long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public long getIdPais() {
        return idPais;
    }

    public void setIdPais(long idPais) {
        this.idPais = idPais;
    }
}
