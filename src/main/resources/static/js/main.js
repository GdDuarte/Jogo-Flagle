var urlNomesPaises = "http://localhost:8080/paises/nomes";
var urlPaisHoje = "http://localhost:8080/paises/hoje";
var urlPaisHojeNome = "http://localhost:8080/paises/hoje/nome"

var nomesPaises = [];

var tentativa = 1;

const WIDTH = 500;
const HEIGHT = 300;

var nomePaisHoje = "";

function carregaNomePaisDoDIa() {
    fetch(urlPaisHojeNome)
        .then(response => {
            return response.text();
        })
        .then(data => {
            nomePaisHoje = data;
        });
}

// Preenche array nomesPaises com nomes de países
function carregaListaPaises() {
    fetch(urlNomesPaises)
        .then(response => {
            return response.json();
        })
        .then(data => {
            nomesPaises = data;
        });
}

const tempCanvas = document.getElementById('tempCanvas');
const tempContext = tempCanvas.getContext('2d', {
    willReadFrequently : true
});

// Carrega bandeira do país do dia para comparação com bandeira do país digitada pelo usuário
async function carregaPaisDoDia() {

    tempCanvas.width = WIDTH;
    tempCanvas.height = HEIGHT;

    var src = urlPaisHoje;
    var img = new Image;

    const loadImage = new Promise((resolve, reject) => {
        img.src = src;

        img.onload = function() {
            tempContext.drawImage(img, 0, 0, WIDTH, HEIGHT);
            resolve();
        };

        img.onerror = function() {
            reject(new Error("Falha ao carregar " + src));
        };

    });

    await loadImage;
}

const inputCanvas = document.getElementById('inputCanvas');
const inputContext = inputCanvas.getContext('2d', {
    willReadFrequently : true
});

// Carrega bandeira de país digitado pelo usuário
async function carregaPaisInput(idPais) {

    inputCanvas.width = WIDTH;
    inputCanvas.height = HEIGHT;

    var img = new Image;
    let src = "http://localhost:8080/paises/bandeira/" + idPais;
    const loadImage = new Promise((resolve, reject) => {
        img.src = src

        img.onload = function() {
            inputContext.drawImage(img, 0, 0, WIDTH, HEIGHT);
            resolve();
        };
        
        img.onerror = function() {
            reject(new Error("Falha ao carregar " + src));
        };

    });
    await loadImage;
}


const resultCanvas = document.getElementById('resultCanvas');
const resultContext = resultCanvas.getContext('2d');


const resultImage = resultContext.createImageData(WIDTH, HEIGHT);
resultCanvas.width = WIDTH;
resultCanvas.height = HEIGHT;

// Compara bandeira de país do dia com bandeira do país digitado pelo usuário
function comparaPaises() {
    const resultDados = resultImage.data;


    const inputPaisImage = inputContext.getImageData(0, 0, inputCanvas.width, inputCanvas.height);
    const inputDados = inputPaisImage.data;

    const tempPaisImage = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const tempDados = tempPaisImage.data;

    for (let i = 0; i < inputDados.length; i += 4) {
        resultDados[i + 3] = 255;

        const redInput = inputDados[i];
        const greenInput = inputDados[i + 1];
        const blueInput = inputDados[i + 2];
        // const alphaInput = dadosInput[i + 3];

        const redTemp = tempDados[i];
        const greenTemp = tempDados[i + 1];
        const blueTemp = tempDados[i + 2];
        // const alphaTemp = dadosTemp[i + 3];

        let difRed;
        let difGreen;
        let difBlue;

        difRed = redInput > redTemp ? redInput - redTemp : redTemp - redInput;
        difGreen = greenInput > greenTemp ? greenInput - greenTemp : greenTemp - greenInput;
        difBlue = blueInput > blueTemp ? blueInput - blueTemp : blueTemp - blueInput;
        if (difRed <= 50 && difGreen <= 50 && difBlue <= 50) {
            for (let j = 0; j < 3; j++) {
                resultDados[i + j] = tempDados[i + j];
            }
        }
        // else {
        //     for (let j = 0; j < 3; j++) {
        //         resultDados[i + j] = 0;
        //     }
        // }
    }
    resultContext.putImageData(resultImage, 0, 0);
}

function carregaBandeiras(idPais) {
    carregaPaisDoDia()
        .then(() => carregaPaisInput(idPais))
            .then(comparaPaises);
}

window.onload = function () {
    carregaListaPaises();
    carregaNomePaisDoDIa();
    resultContext.fillRect(0, 0, WIDTH, HEIGHT);
};

var suggestionContainer = document.getElementById('suggestions-container');
var typingBox = document.getElementById('editableText');
var errorMessage = document.getElementById('errorMessage');

let currentIndex = -1; // To track the index of the highlighted suggestion

function showSuggestions() {
    suggestionContainer.innerHTML = ""; // Clear previous suggestions
    nomesPaises.forEach((nome, index) => {
        if (nome.toLowerCase().startsWith(typingBox.value.toLowerCase())) {
            const div = document.createElement("div");
            div.className = "autocomplete-suggestion";
            div.textContent = nome;
            div.dataset.index = index; // Store the index in a data attribute
            div.addEventListener('click', function() {
                typingBox.value = nome; // Set the input value to the clicked suggestion
                suggestionContainer.innerHTML = ""; // Clear suggestions
                suggestionContainer.style.display = 'none'; // Hide suggestions
            }, false);
            suggestionContainer.appendChild(div);
        }
    });
    suggestionContainer.style.display = 'block'; // Show suggestions
    currentIndex = -1; // Reset the current index
}

// Handle keyboard navigation
function handleKeyboardNavigation(event) {
    const suggestions = Array.from(suggestionContainer.children);
    if (suggestions.length === 0) return;

    switch (event.key) {
        case "ArrowDown":
            event.preventDefault();
            if (currentIndex < suggestions.length - 1) {
                currentIndex++;
                updateHighlight(suggestions);
                scrollToHighlight();
            }
            break;
        case "ArrowUp":
            event.preventDefault();
            if (currentIndex > 0) {
                currentIndex--;
                updateHighlight(suggestions);
                scrollToHighlight();
            }
            break;
        case "Enter":
            event.preventDefault();
            if (currentIndex > -1 && currentIndex < suggestions.length) {
                typingBox.value = suggestions[currentIndex].textContent;
                suggestionContainer.innerHTML = ""; // Clear suggestions
                suggestionContainer.style.display = 'none'; // Hide suggestions
                currentIndex = -1; // Reset the current index
            }
            break;
        case "Escape":
            suggestionContainer.innerHTML = ""; // Clear suggestions
            suggestionContainer.style.display = 'none'; // Hide suggestions
            currentIndex = -1; // Reset the current index
            break;
    }
}

// Highlight the current suggestion
function updateHighlight(suggestions) {
    suggestions.forEach((suggestion, index) => {
        if (index === currentIndex) {
            suggestion.classList.add("highlighted");
        } else {
            suggestion.classList.remove("highlighted");
        }
    });
}

// Scroll to the highlighted suggestion
function scrollToHighlight() {
    const suggestions = Array.from(suggestionContainer.children);
    if (currentIndex < 0 || currentIndex >= suggestions.length) return;

    const highlightedElement = suggestions[currentIndex];
    const container = suggestionContainer;

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;
    const elementTop = highlightedElement.offsetTop;
    const elementBottom = elementTop + highlightedElement.clientHeight;

    if (elementTop < containerTop) {
        container.scrollTop = elementTop;
    } else if (elementBottom > containerBottom) {
        container.scrollTop = elementBottom - container.clientHeight;
    }
}

// Add event listener to the input box for keyboard navigation
typingBox.addEventListener('keydown', handleKeyboardNavigation);


typingBox.addEventListener('input', function() {
    if (typingBox.value) {
        showSuggestions();
    } else {
        suggestionContainer.innerHTML = ""; // Clear suggestions
        suggestionContainer.style.display = 'none'; // Hide suggestions
    }
}, false);

// Hide suggestions when clicking outside
document.addEventListener('click', function(event) {
    if (!typingBox.contains(event.target) && !suggestionContainer.contains(event.target)) {
        suggestionContainer.style.display = 'none'; // Hide suggestions
    }
}, false);


function recebeInput() {
    // Corrige cor de campo de texto pois ele pode estar vermelho
    editableText.style.borderColor = "rgb(128, 119, 105)";
    
    // Remove mensagem de erro
    errorMessage.textContent = "";
    
    // Pais digitado pelo usuário
    let inputNomePais = editableText.value;

    let textBar = document.getElementById("text" + tentativa);
    textBar.textContent = inputNomePais;

    let url = "http://localhost:8080/paises/id/" + inputNomePais
    console.log(url);
    let idPais = -1;
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            idPais = data;
        })
        .then(() => {
            carregaBandeiras(idPais);
        });
        
    tentativa++;

}

function acertou() {
    alert("Você acertou!");
    editableText.readOnly = true;
    editableText.style.borderColor = "rgb(0, 255, 0)";
}

function semTentativas() {
    alert("Você não tem mais tentativas disponíveis")
    editableText.readOnly = true;
}

// Clica em botão Jogar
const botaoJogar = document.getElementById('actionButton');
botaoJogar.addEventListener('click', function() {
    if (nomesPaises.includes(editableText.value) && tentativa < 6) {
        recebeInput();
        if (editableText.value === nomePaisHoje) {
            acertou();
            tentativa--;
        }
        else if(tentativa == 6) {
            semTentativas();
        }
        editableText.value = "";
    }

    else if(tentativa >= 6) {

    }

    // Pais não existe
    else {
        editableText.style.borderColor = "rgb(255, 0, 0)";
        errorMessage.textContent = "País não existe";
    }
});

// Aperta Enter
document.addEventListener('keypress', function (event) {
    if (document.activeElement === editableText) {
        if (event.key === "Enter") {
            botaoJogar.click();
        }
    }
}, false);

const cadastrarBotao = document.getElementById("signupButton");
cadastrarBotao.addEventListener('click', function() {
    window.location.href = "http://localhost:8080/cadastro";
}, false);