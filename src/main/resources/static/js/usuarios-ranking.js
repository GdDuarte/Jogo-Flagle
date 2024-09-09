var urlAtual = window.location.href.split("/");
var idRanking = urlAtual[urlAtual.length - 1];

var urlListaRankingsData = `http://localhost:8080/rankings/data/${idRanking}`;

var urlRankingDate = `http://localhost:8080/rankings/date/${idRanking}`;

var listaRankings = [];

var date;

var posicao = 1;

const titulo = document.getElementById("titulo");
function carregaDataRanking() {
    fetch(urlRankingDate)
        .then(response => {
            return response.json();
        })
        .then(data => {
            date = data.replace(/-/g, "/").split("/").reverse().join("/");
            titulo.textContent = "Ranking " + date;
        });
}

function carregaRankings() {
    fetch(urlListaRankingsData)
        .then(response => {
        return response.json();
    })
        .then(data => {
        listaRankings = data;
    })
        .then(function() {
        for(let index = 0; index < listaRankings.length; index++) {
            addRankingRow(listaRankings[index]);
        }
    });
}

const createSessionForm = document.getElementById('createUserForm');
const sessionsTableBody = document.getElementById('usersTable').querySelector('tbody');
var rowsCounter = 0;



// Function to add a new row to the table
function addRankingRow(ranking) {
    const row = document.createElement('tr');
    row.id = "row" + rowsCounter;
    rowsCounter++;

    // Create cells for each piece of user data
    const rankingPositionCell = document.createElement('td');
    rankingPositionCell.id = "position"
    rankingPositionCell.textContent = posicao;
    posicao++;

    const userNameCell = document.createElement('td');
    userNameCell.id = "user_name"
    userNameCell.textContent = ranking[0];

    const tentativasCell = document.createElement('td');
    tentativasCell.id = "tentativas"
    tentativasCell.textContent = ranking[1];

    const acertouCell = document.createElement('td');
    acertouCell.id = "acertou"
    acertouCell.textContent = ranking[2] ? "Sim" : "Não";

    // const tentativasCell = document.createElement('td');
    // tentativasCell.id = "tentativas"
    // tentativasCell.textContent = sessionData[0][3];


    // const dataJogadoCell = document.createElement('td');
    // dataJogadoCell.id = "acertou"
    // dataJogadoCell.textContent = sessionData[0][5];

    // const actionsCell = document.createElement('td');
    // actionsCell.innerHTML =
    // `<button class="detailsButton" id="detailsButton"">Detalhes</button>`;

    // Append cells to the row
    row.appendChild(rankingPositionCell);
    row.appendChild(userNameCell);
    row.appendChild(tentativasCell);
    row.appendChild(acertouCell);
    // row.appendChild(countryNameCell);
    // row.appendChild(dataJogadoCell);

    // Append row to the table body
    sessionsTableBody.appendChild(row);
}

// Attach the event listener to the table body
sessionsTableBody.addEventListener('click', (event) => {
    // Check if the clicked element is a button and has the correct class
    if (event.target && event.target.classList.contains('detailsButton')) {
        const row = event.target.closest('tr'); // Get the closest row element
        const cells = row.querySelectorAll('td'); // Get all cells in the row

        // Extract text content from cells
        const userId = cells[0].textContent; // Assuming ID is in the first cell
        // const userName = cells[1].textContent; // Assuming Name is in the second cell
        // const userEmail = cells[2].textContent; // Assuming Email is in the third cell

        let editIdForm = document.getElementById("edit_user_id");
        // let editNomeForm = document.getElementById("edit_nome_usuario");
        // let editEmailForm = document.getElementById("edit_email");
        // let editHashSenha = document.getElementById("edit_hash_senha");



    }
});

window.onload = function() {
    carregaRankings();
    carregaDataRanking();
}