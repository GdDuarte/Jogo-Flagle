package com.tpdb.flagle.controllers;

import com.tpdb.flagle.entities.Sessao;
import com.tpdb.flagle.entities.Usuario;
import com.tpdb.flagle.repositories.SessaoRepository;
import com.tpdb.flagle.repositories.UsuarioRepository;
import org.hibernate.query.NativeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/usuarios")
public class UsuarioRestController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private SessaoRepository sessaoRepository;

    @GetMapping(value = "")
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public Usuario findById(@PathVariable Long id) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }
        return usuarioOptional.get();
    }

    @GetMapping(value = "/{id}/sessoes")
    public List<Sessao> findSessions(@PathVariable("id") Long idUsuario) {
        if (usuarioRepository.existsById(idUsuario)) {
            return sessaoRepository.findSessionsById(idUsuario);
        }
        throw new RuntimeException("Usuário não existe");
    }

    @PostMapping(value = "/create")
    public void create(@RequestBody Usuario usuario) {
        if (usuario.getNome().isEmpty() || usuario.getEmail().isEmpty() || usuario.getSenha().isEmpty()) {
            throw new RuntimeException("Erro ao adicionar usuário");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        usuario.setSenha(encoder.encode(usuario.getSenha()));

        usuarioRepository.create(usuario.getNome(), usuario.getEmail(), usuario.getSenha());
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping(value = "/update/{id}")
    public Usuario update(@PathVariable(value = "id") Long id, @RequestBody Usuario novoUsuario) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        // Checa se existe algum usuário com o ID informado
        if (usuarioOptional.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        Usuario usuarioAntigo = usuarioOptional.get();
        usuarioAntigo.setNome(novoUsuario.getNome());
        usuarioAntigo.setEmail(novoUsuario.getEmail());
        usuarioAntigo.setSenha(novoUsuario.getSenha());

        return usuarioRepository.save(usuarioAntigo);
    }

    @PostMapping("/autentica")
    public boolean autenticar(@RequestParam(value = "email") String email,
                              @RequestParam(value = "password") String password) {
        if (usuarioRepository.countEmail(email) == 0) {
            System.out.println("nao tem esse email");
            System.out.println(email);
            return false;
        }
        String hashPassword = usuarioRepository.getSenha(email);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println(password);
        System.out.println(hashPassword);
        System.out.println(encoder.matches(password, hashPassword));
        return encoder.matches(password, hashPassword);
    }
}
