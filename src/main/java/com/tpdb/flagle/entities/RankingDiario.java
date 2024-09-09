package com.tpdb.flagle.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "ranking_diario")
public class RankingDiario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ranking")
    private long id;
    @Column(name = "data")
    private LocalDate data;

    public RankingDiario() {
    }

    public RankingDiario(long id, LocalDate data) {
        this.id = id;
        this.data = data;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }
}
