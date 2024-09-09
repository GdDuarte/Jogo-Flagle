package com.tpdb.flagle.repositories;

import com.tpdb.flagle.entities.Sessao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessaoRepository extends JpaRepository<Sessao, Long> {

    @Query(value = "SELECT * FROM sessao WHERE id_usuario = :idUsuario", nativeQuery = true)
    List<Sessao> findSessionsById(@Param("idUsuario") Long idUsuario);

    @Query(value =
            "SELECT s.id_sessao, u.nome_usuario, p.nome, s.tentativas, s.acertou, s.data_jogado FROM sessao s " +
            "JOIN pais p on p.id_pais = s.id_pais JOIN usuario u on u.id_usuario = s.id_usuario " +
            "WHERE s.id_sessao = :idSessao"
            , nativeQuery = true)
    List<Object> findSessionData(@Param("idSessao") Long idSessao);

    @Override
    @Query(value = "SELECT * FROM sessao", nativeQuery = true)
    List<Sessao> findAll();

}
