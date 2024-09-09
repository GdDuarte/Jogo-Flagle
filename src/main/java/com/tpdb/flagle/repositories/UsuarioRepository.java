package com.tpdb.flagle.repositories;

import com.tpdb.flagle.entities.Usuario;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Override
    @Query(value = "SELECT * FROM usuario ORDER BY id_usuario ASC", nativeQuery = true)
    List<Usuario> findAll();

    @Override
    @Query(value = "SELECT * FROM usuario WHERE id_usuario= :id", nativeQuery = true)
    Optional<Usuario> findById(@Param("id")Long id);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO usuario VALUES(default, :nome, :email, :hashSenha)", nativeQuery = true)
    void create(@Param("nome") String nome, @Param("email") String email, @Param("hashSenha") String hashSenha);

    @Override
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM usuario WHERE id_usuario = :id",nativeQuery = true)
    void deleteById(@Param("id")Long id);

    @Query(value =
            "SELECT u.nome_usuario, COUNT(u.nome_usuario) FROM usuario u " +
            "JOIN sessao s ON s.id_usuario = u.id_usuario " +
            "GROUP BY u.id_usuario " +
            "ORDER BY COUNT(*) DESC", nativeQuery = true)
    List<Object[]> maisJogadas();

    @Query(value =
            "SELECT count(*) FROM usuario WHERE email LIKE :email", nativeQuery = true)
    Long countEmail(@Param("email") String email);

    @Query(value =
            "SELECT hash_senha FROM usuario WHERE email LIKE :email", nativeQuery = true)
    String getSenha(@Param("email") String email);
}
