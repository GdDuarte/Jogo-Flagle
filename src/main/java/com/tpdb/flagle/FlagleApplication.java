package com.tpdb.flagle;

import com.tpdb.flagle.entities.Pais;
import com.tpdb.flagle.repositories.PaisRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@SpringBootApplication
public class FlagleApplication {

	public static Pais paisHoje;
	@Autowired
	private PaisRepository paisRepository;

	// Atualiza país do dia
	public void updatePais() {
		LocalDate dataHoje = LocalDate.now();

		List<Pais> listaPaises = paisRepository.findAll();
		for (Pais pais : listaPaises) {
			if (pais.getDiaJogado() != null) {
				if (pais.getDiaJogado().equals(dataHoje)) {
					paisHoje = pais;
					return;
				}
			}
		}
		Random random = new Random();
		paisHoje = listaPaises.get(random.nextInt(listaPaises.size()));
		paisHoje.setDiaJogado(dataHoje);
		paisRepository.updateDiaJogado(paisHoje.getId(), paisHoje.getDiaJogado());
	}

	@PostConstruct
	public void onStartup() {
		updatePais();
		System.out.println("Está rodando");
		System.out.println("País do dia: " + paisHoje.getNome());
	}

	public static void main(String[] args) {
		SpringApplication.run(FlagleApplication.class, args);
	}

}
