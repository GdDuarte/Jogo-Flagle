var urlAtual = window.location.href.split("/");
var idRanking = urlAtual[urlAtual.length - 2];

var urlListaRankings = `http://localhost:8080/rankings`;

var listaRankings = [];

function carregaRankings() {
    fetch(urlListaRankings)
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
    const sessionIdCell = document.createElement('td');
    sessionIdCell.id = "session_id"
    sessionIdCell.textContent = ranking.id;

    const userNameCell = document.createElement('td');
    userNameCell.id = "user_name"
    userNameCell.textContent = ranking.data;

    // const countryNameCell = document.createElement('td');
    // countryNameCell.id = "country_name"
    // countryNameCell.textContent = sessionData[0][2];

    // const tentativasCell = document.createElement('td');
    // tentativasCell.id = "tentativas"
    // tentativasCell.textContent = sessionData[0][3];

    // const acertouCell = document.createElement('td');
    // acertouCell.id = "acertou"
    // acertouCell.textContent = sessionData[0][4] ? "Sim" : "Não";

    // const dataJogadoCell = document.createElement('td');
    // dataJogadoCell.id = "acertou"
    // dataJogadoCell.textContent = sessionData[0][5];

    const actionsCell = document.createElement('td');
    actionsCell.innerHTML =
     `<button class="detailsButton" id="detailsButton"">Detalhes</button>`;

    // Append cells to the row
    row.appendChild(sessionIdCell);
    row.appendChild(userNameCell);
    row.appendChild(actionsCell);
    // row.appendChild(countryNameCell);
    // row.appendChild(tentativasCell);
    // row.appendChild(acertouCell);
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
        const rankingId = cells[0].textContent; // Assuming ID is in the first cell
        // const userName = cells[1].textContent; // Assuming Name is in the second cell
        // const userEmail = cells[2].textContent; // Assuming Email is in the third cell

        // let editIdForm = document.getElementById("edit_user_id");
        // let editNomeForm = document.getElementById("edit_nome_usuario");
        // let editEmailForm = document.getElementById("edit_email");
        // let editHashSenha = document.getElementById("edit_hash_senha");

        let url = `http://localhost:8080/rankings/${rankingId}`;
        window.open(url, "_blank");

    }
});

window.onload = function() {
    carregaRankings();
}