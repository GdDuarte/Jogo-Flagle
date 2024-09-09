var urlAtual = window.location.href.split("/");
var idUsuario = urlAtual[urlAtual.length - 2];

var urlListaRankings = `http://localhost:8080/usuarios/${idUsuario}/sessoes`;

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
function addRankingRow(session) {
    const row = document.createElement('tr');
    row.id = "row" + rowsCounter;
    rowsCounter++;

    let sessionData = []
    let url = `http://localhost:8080/sessoes/${session.id}/dados`;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            sessionData = data;
        })
        .then(function() {

            // Create cells for each piece of user data
            const sessionIdCell = document.createElement('td');
            sessionIdCell.id = "session_id"
            sessionIdCell.textContent = session.id;
        
            const userNameCell = document.createElement('td');
            userNameCell.id = "user_name"
            userNameCell.textContent = sessionData[0][1];
        
            const countryNameCell = document.createElement('td');
            countryNameCell.id = "country_name"
            countryNameCell.textContent = sessionData[0][2];
        
            const tentativasCell = document.createElement('td');
            tentativasCell.id = "tentativas"
            tentativasCell.textContent = sessionData[0][3];

            const acertouCell = document.createElement('td');
            acertouCell.id = "acertou"
            acertouCell.textContent = sessionData[0][4] ? "Sim" : "Não";

            const dataJogadoCell = document.createElement('td');
            dataJogadoCell.id = "acertou"
            dataJogadoCell.textContent = sessionData[0][5];
        
            // <th>ID Sessão</th>
            // <th>Nome Usuário</th>
            // <th>País</th>
            // <th>Tentativas</th>
            // <th>Acertou</th>
            // <th>Dia Jogado</th>
        
            // Append cells to the row
            row.appendChild(sessionIdCell);
            row.appendChild(userNameCell);
            row.appendChild(countryNameCell);
            row.appendChild(tentativasCell);
            row.appendChild(acertouCell);
            row.appendChild(dataJogadoCell);
        
            // Append row to the table body
            sessionsTableBody.appendChild(row);
        })


}

// Attach the event listener to the table body
sessionsTableBody.addEventListener('click', (event) => {
    // Check if the clicked element is a button and has the correct class
    if (event.target && event.target.classList.contains('editButton')) {
        const row = event.target.closest('tr'); // Get the closest row element
        const cells = row.querySelectorAll('td'); // Get all cells in the row

        // Extract text content from cells
        const userId = cells[0].textContent; // Assuming ID is in the first cell
        const userName = cells[1].textContent; // Assuming Name is in the second cell
        const userEmail = cells[2].textContent; // Assuming Email is in the third cell

        let editIdForm = document.getElementById("edit_user_id");
        let editNomeForm = document.getElementById("edit_nome_usuario");
        let editEmailForm = document.getElementById("edit_email");
        //let editHashSenha = document.getElementById("edit_hash_senha");

        editIdForm.value = userId;
        editNomeForm.value = userName;
        editEmailForm.value = userEmail;
        //editHashSenha.value = editHashSenha;
    }

    if (event.target && event.target.classList.contains('deleteButton')) {
        const row = event.target.closest('tr'); // Get the closest row element
        const cells = row.querySelectorAll('td'); // Get all cells in the row

        // Extract text content from cells
        const userId = cells[0].textContent; // Assuming ID is in the first cell
        // const userName = cells[1].textContent; // Assuming Name is in the second cell
        // const userEmail = cells[2].textContent; // Assuming Email is in the third cell

        let url = urlRemoveUsuario + `${userId}`;

        fetch(url, {method: "DELETE"})
            .then(response => {
                if (response.status != 204) {
                    alert("Erro ao remover usuário");
                }
                else {
                    window.location.reload();
                }
            })

    }
});

window.onload = function() {
    carregaRankings();
}