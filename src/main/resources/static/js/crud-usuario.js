var urlAdicionaUsuario = "http://localhost:8080/usuarios/create";
var urlEditaUsuario = "http://localhost:8080/usuarios/update/";
var urlRemoveUsuario = "http://localhost:8080/usuarios/delete/"

const urlDownloadMaisJogadas = "http://localhost:8080/relatorios/usuarios/maisjogadas";

var urlListaRankings = "http://localhost:8080/usuarios";

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

const createUserForm = document.getElementById('createUserForm');
const usersTableBody = document.getElementById('usersTable').querySelector('tbody');
var rowsCounter = 0;

// Function to add a new row to the table
function addRankingRow(user) {
    const row = document.createElement('tr');
    row.id = "row" + rowsCounter;
    rowsCounter++;

    // Create cells for each piece of user data
    const idCell = document.createElement('td');
    idCell.id = "user_id"
    idCell.textContent = user.id;

    const nameCell = document.createElement('td');
    nameCell.id = "user_name"
    nameCell.textContent = user.nome;

    const emailCell = document.createElement('td');
    emailCell.id = "user_email"
    emailCell.textContent = user.email;

    const actionsCell = document.createElement('td');
    actionsCell.innerHTML =
     `<button class="editButton" id="rowEditButton"">Editar</button>
      <button type="button" class="deleteButton" id="rowDeleteButton">Remover</button>
      <button class="sessionsButton" id="rowSessionButton"">Sessões</button>`;

    // Append cells to the row
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(actionsCell);

    // Append row to the table body
    usersTableBody.appendChild(row);

}

// Attach the event listener to the table body
usersTableBody.addEventListener('click', (event) => {
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

    if (event.target && event.target.classList.contains('sessionsButton')) {
        const row = event.target.closest('tr'); // Get the closest row element
        const cells = row.querySelectorAll('td'); // Get all cells in the row

        // Extract text content from cells
        const userId = cells[0].textContent; // Assuming ID is in the first cell
        // const userName = cells[1].textContent; // Assuming Name is in the second cell
        // const userEmail = cells[2].textContent; // Assuming Email is in the third cell

        let url = `http://localhost:8080/gerencia/usuarios/${userId}/sessoes`;
        window.open(url, "_blank");

    }
});

const botaoAdicionar = document.getElementById("addButton");
botaoAdicionar.addEventListener('click', function () {
    let formNome = document.getElementById("nome_usuario");
    let formEmail = document.getElementById("email");
    let formHashSenha = document.getElementById("hash_senha");

    let nome = document.getElementById("nome_usuario").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("hash_senha").value;

    let requestBody = JSON.stringify({
        nome: nome,
        email: email,
        senha: senha
    });

    fetch(urlAdicionaUsuario, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
        .then(response => {
            if (response.status != 200) {
                alert("Erro ao adicionar usuário")
            }
            else {
                window.location.reload()  
            }
        });

}, false)

const botaoEditar = document.getElementById("botaoEditar");
botaoEditar.addEventListener("click", function() {
    let editIdForm = document.getElementById("edit_user_id");
    let editNomeForm = document.getElementById("edit_nome_usuario");
    let editEmailForm = document.getElementById("edit_email");
    //let editHashSenha = document.getElementById("edit_hash_senha");


    let url = urlEditaUsuario + `${editIdForm.value}`;
    let usuario;

    for (let index = 0; index < listaRankings.length; index++) {
        if(listaRankings[index].id == editIdForm.value) {
            console.log(listaRankings[index].id)
            usuario = listaRankings[index];
            break;
        }
    }
    
    let requestBody = JSON.stringify({
        nome: editNomeForm.value,
        email: editEmailForm.value,
        senha: usuario.senha
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
                alert("Erro ao editar usuário")
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
        window.open(urlDownloadMaisJogadas, '_blank');
    }
    // else {
    //     window.open(urlDownloadMaisAcertos, '_blank');
    // }
}, false)

window.onload = function() {
    carregaRankings();
}