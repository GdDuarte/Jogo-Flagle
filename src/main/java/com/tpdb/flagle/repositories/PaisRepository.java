package com.tpdb.flagle.repositories;

import com.tpdb.flagle.entities.Pais;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PaisRepository extends JpaRepository<Pais, Long> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE pais SET dia_jogado = :diaJogado WHERE id_pais = :idPais", nativeQuery = true)
    void updateDiaJogado(@Param("idPais") Long idPais,@Param("diaJogado") LocalDate diaJogado);

    @Modifying
    @Transactional
    @Query(value = "UPDATE pais SET nome = :nome WHERE id_pais = :idPais", nativeQuery = true)
    void updateNome(@Param("idPais") Long idPais,@Param("nome") String nome);

    @Override
    @Query(value = "SELECT * FROM pais ORDER BY nome ASC", nativeQuery = true)
    List<Pais> findAll();

    @Query(value = "SELECT nome FROM pais ORDER BY nome ASC", nativeQuery = true)
    List<String> findAllNames();

    @Query(value = "SELECT id_pais FROM pais WHERE nome LIKE :nome", nativeQuery = true)
    Long getIdByName(@Param("nome") String nome);

    @Query(value =
            "SELECT p.nome, COUNT(*) FROM pais p " +
            "JOIN sessao s ON s.id_pais = p.id_pais " +
            "WHERE acertou = 1 GROUP BY p.id_pais " +
            "ORDER BY COUNT(*) DESC", nativeQuery = true)
    List<Object[]> maisAcertos();

    @Query(value =
            "SELECT p.nome, COUNT(*) FROM pais p " +
            "JOIN sessao s ON s.id_pais = p.id_pais " +
            "GROUP BY p.id_pais " +
            "ORDER BY COUNT(*) DESC", nativeQuery = true)
    List<Object[]> maisJogados();
}
