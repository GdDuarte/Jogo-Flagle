var urlEditaPais = "http://localhost:8080/paises/update/";

var urlListaPaises = "http://localhost:8080/paises";

const urlDownloadMaisAcertos = "http://localhost:8080/relatorios/paises/maisacertos";
const urlDownloadMaisJogados = "http://localhost:8080/relatorios/paises/maisjogados";

var listaPaises = [];

function carregapaises() {
    fetch(urlListaPaises)
        .then(response => {
            return response.json();
        })
        .then(data => {
            listaPaises = data;
        })
        .then(function() {
            for(let index = 0; index < listaPaises.length; index++) {
                addRankingRow(listaPaises[index]);
            }
        });
}

const countriesTableBody = document.getElementById('countriesTable').querySelector('tbody');
var rowsCounter = 0;

// Function to add a new row to the table
function addRankingRow(country) {
    const row = document.createElement('tr');
    row.id = "row" + rowsCounter;
    rowsCounter++;

    // Create cells for each piece of user data
    const idCell = document.createElement('td');
    idCell.id = "pais_id"
    idCell.textContent = country.id;

    const nameCell = document.createElement('td');
    nameCell.id = "pais_nome"
    nameCell.textContent = country.nome;

    const diaJogadoCell = document.createElement('td');
    nameCell.id = "pais_dia_jogado"
    if (country.diaJogado === null) {
        diaJogadoCell.textContent = "Não jogado";
    }
    else {
        diaJogadoCell.textContent = country.diaJogado;
    }

    const actionsCell = document.createElement('td');
    actionsCell.innerHTML =
     `<button class="editButton" id="rowEditButton"">Editar</button>`;

    // Append cells to the row
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(diaJogadoCell);
    row.appendChild(actionsCell);

    // Append row to the table body
    countriesTableBody.appendChild(row);

}

// Attach the event listener to the table body
countriesTableBody.addEventListener('click', (event) => {
    // Check if the clicked element is a button and has the correct class
    if (event.target && event.target.classList.contains('editButton')) {
        const row = event.target.closest('tr'); // Get the closest row element
        const cells = row.querySelectorAll('td'); // Get all cells in the row

        // Extract text content from cells
        const countryId = cells[0].textContent; // Assuming ID is in the first cell
        const countryName = cells[1].textContent; // Assuming Name is in the second cell

        let editIdForm = document.getElementById("edit_country_id");
        let editNomeForm = document.getElementById("edit_nome_pais");
        //let editHashSenha = document.getElementById("edit_hash_senha");

        editIdForm.value = countryId;
        editNomeForm.value = countryName;
        //editHashSenha.value = editHashSenha;
    }

});

const botaoEditar = document.getElementById("botaoEditar");
botaoEditar.addEventListener("click", function() {
    let editIdForm = document.getElementById("edit_country_id");
    let editNomeForm = document.getElementById("edit_nome_pais");
    //let editHashSenha = document.getElementById("edit_hash_senha");


    let url = urlEditaPais + `${editIdForm.value}`;
    // let pais;

    // for (let index = 0; index < listaPaises.length; index++) {
    //     if(listaPaises[index].id == editIdForm.value) {
    //         console.log(listaPaises[index].id)
    //         pais = listaPaises[index];
    //         break;
    //     }
    // }
    
    let requestBody = JSON.stringify({
        nome: editNomeForm.value,
        diaJogado: null,
        bandeira: null
    });

    fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: requestBody
    })
        .then(response => {
            if (response.status != 200) {
                alert("Erro ao editar país")
            }
            else {
                window.location.reload()
            }
        });

}, false)

const botaoRelatorio = document.getElementById("generateReport");
botaoRelatorio.addEventListener('click', function() {
    let selecionar = document.getElementById("reportType");
    if (selecionar.value == "mostPlayed") {
        window.open(urlDownloadMaisJogados, '_blank');
    }
    else {
        window.open(urlDownloadMaisAcertosrl, '_blank');
    }
}, false)

window.onload = function() {
    carregapaises();
}