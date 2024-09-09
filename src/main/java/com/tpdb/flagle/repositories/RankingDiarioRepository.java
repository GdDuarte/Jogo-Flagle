package com.tpdb.flagle.repositories;

import com.tpdb.flagle.entities.RankingDiario;
import com.tpdb.flagle.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RankingDiarioRepository extends JpaRepository<RankingDiario, Long> {

    @Override
    @Query(value = "SELECT * FROM ranking_diario", nativeQuery = true)
    List<RankingDiario> findAll();

    @Query(value =
            "SELECT u.nome_usuario, s.tentativas, s.acertou FROM usuario_ranking ur " +
            "JOIN usuario u on u.id_usuario = ur.id_usuario " +
            "JOIN ranking_diario r on r.id_ranking = ur.id_ranking " +
            "JOIN sessao s on s.data_jogado = r.data " +
            "WHERE ur.id_ranking = :id_ranking " +
            "ORDER BY s.tentativas ASC"
            , nativeQuery = true)
    List<Object> findRankingData(@Param("id_ranking") Long id_ranking);

    @Query(value = "SELECT data FROM ranking_diario WHERE id_ranking = :id_ranking", nativeQuery = true)
    LocalDate findDateById(@Param("id_ranking") Long id_ranking);
}
