var urlAdicionaUsuario = "http://localhost:8080/usuarios/create";
var urlAutentica = "http://localhost:8080/usuarios/autentica";

const botaoCadastrar = document.getElementById("botaoCadastrar");

botaoCadastrar.addEventListener('click',function() {
    let usernameForm = document.getElementById("username");
    let emailForm = document.getElementById("email");
    let passForm = document.getElementById("password");
    let passConfirmForm = document.getElementById("password-confirmation");

    let username = usernameForm.value;
    let email = emailForm.value;
    let pass = passForm.value;
    let passConfirm = passConfirmForm.value;

    if(pass == passConfirm) {
        cadastraUsuario(username, email, pass);
    }
    else {
        alert("As senhas digitadas são diferentes");
    }

}, false);

function cadastraUsuario(nome, email, senha) {

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
    }).then(response => {
        if (response.status != 500) {
            alert("Cadastro feito!");
            window.location.href = "http://localhost:8080";
        }
    });
}

function fazLogin() {
    let email = document.getElementById("login-email").value
    let password = document.getElementById("login-password").value

    fetch(urlAutentica, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            email: email,
            password: password,
        })
    })
    .then(response => response.text())
    .then(text => {
        if (text == "true") {
            window.location.href = "http://localhost:8080";
        }
        else {
            alert("Email ou senha incorretos");
        }
    });
}

const botaoLogin = document.getElementById("botaoLogin");
botaoLogin.addEventListener("click",fazLogin ,false);

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const toggleButton = document.getElementById("toggle-button");
const formTitle = document.getElementById("form-title");

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

toggleButton.addEventListener("click", () => {
    if (signupForm.style.display === "none") {
      // Switch to signup
      signupForm.style.display = "block";
      loginForm.style.display = "none";
      formTitle.textContent = "Nova conta";
      toggleButton.textContent = "Já tem uma conta? Faça login";
    } else {
      // Switch to login
      signupForm.style.display = "none";
      loginForm.style.display = "block";
      formTitle.textContent = "Login";
      toggleButton.textContent = "Ainda não tem uma conta? Cadastre-se";
    }
  });