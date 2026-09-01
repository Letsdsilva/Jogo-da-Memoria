const jogo = document.querySelector(".jogo");
const botaoComecar = document.querySelector("#botaoComecar");

const telaInicial = document.querySelector("#telaInicial");
const telaJogo = document.querySelector("#telaJogo");

const nomePlayer1 = document.querySelector("#nomePlayer1");
const nomePlayer2 = document.querySelector("#nomePlayer2");

const mostrarPlayer1 = document.querySelector("#mostrarPlayer1");
const mostrarPlayer2 = document.querySelector("#mostrarPlayer2");

const pontosPlayer1 = document.querySelector("#pontosPlayer1");
const pontosPlayer2 = document.querySelector("#pontosPlayer2");

const vezJogador = document.querySelector("#vezJogador");

let player1 = "";
let player2 = "";

let jogadorAtual = 0;
let pontos1 = 0;
let pontos2 = 0;
let paresEncontrados = 0;

let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;


// IMAGENS

const imagens = [
    "foto1.png",
    "foto2.png",
    "foto3.png",
    "foto4.png",
    "foto5.png",
    "foto6.png",
    "foto7.png",
    "foto8.png",
    "foto9.png",
    "foto10.png",
    "foto11.png",
    "foto12.png",
    "foto13.png",
    "foto14.png",
    "foto15.png",
    "foto16.png",
    "foto17.png",
    "foto18.png",
    "foto19.png",
    "foto20.png"
];


// COMEÇAR JOGO

botaoComecar.addEventListener("click", function () {

    player1 = nomePlayer1.value.trim();
    player2 = nomePlayer2.value.trim();

    if (player1 === "" || player2 === "") {
        alert("⚠️ Por favor, preencha o nome dos dois jogadores!");
        return;
    }

    mostrarPlayer1.textContent = player1;
    mostrarPlayer2.textContent = player2;

    pontos1 = 0;
    pontos2 = 0;
    jogadorAtual = 0;
    paresEncontrados = 0;

    pontosPlayer1.textContent = "0";
    pontosPlayer2.textContent = "0";

    atualizarVez();

    telaInicial.style.display = "none";
    telaJogo.style.display = "block";

    criarJogo();
});


// ATUALIZAR VEZ

function atualizarVez() {

    if (jogadorAtual === 0) {
        vezJogador.textContent = "🎯 Vez de: " + player1;
    } else {
        vezJogador.textContent = "🎯 Vez de: " + player2;
    }

}


// TROCAR JOGADOR

function trocarJogador() {

    if (jogadorAtual === 0) {
        jogadorAtual = 1;
    } else {
        jogadorAtual = 0;
    }

    atualizarVez();
}


// ADICIONAR PONTO

function adicionarPonto() {

    if (jogadorAtual === 0) {

        pontos1++;
        pontosPlayer1.textContent = pontos1;

    } else {

        pontos2++;
        pontosPlayer2.textContent = pontos2;

    }
}


// CRIAR JOGO

function criarJogo() {

    jogo.innerHTML = "";

    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;
    paresEncontrados = 0;

    const cartas = [...imagens, ...imagens];

    cartas.sort(() => Math.random() - 0.5);

    cartas.forEach(function (imagem, indice) {

        const carta = document.createElement("div");

        carta.classList.add("carta");

        carta.textContent = indice + 1;

        carta.dataset.imagem = imagem;
        carta.dataset.numero = indice + 1;


        carta.addEventListener("click", function () {

            if (bloqueado) {
                return;
            }

            if (carta === primeiraCarta) {
                return;
            }


            // MOSTRA IMAGEM

            carta.innerHTML = "";

            const img = document.createElement("img");

            img.src = carta.dataset.imagem;
            img.alt = "Foto";

            carta.appendChild(img);


            // PRIMEIRA CARTA

            if (primeiraCarta === null) {

                primeiraCarta = carta;

                return;
            }


            // SEGUNDA CARTA

            segundaCarta = carta;

            bloqueado = true;


            // VERIFICA SE É PAR

            if (
                primeiraCarta.dataset.imagem ===
                segundaCarta.dataset.imagem
            ) {

                adicionarPonto();

                paresEncontrados++;

                const carta1 = primeiraCarta;
                const carta2 = segundaCarta;


                setTimeout(function () {

                    carta1.remove();
                    carta2.remove();

                    primeiraCarta = null;
                    segundaCarta = null;

                    bloqueado = false;


                    // FINALIZOU O JOGO

                    if (paresEncontrados === imagens.length) {

                        finalizarJogo();

                    }

                }, 500);


            } else {

                // NÃO É PAR

                const carta1 = primeiraCarta;
                const carta2 = segundaCarta;


                setTimeout(function () {

                    carta1.textContent = carta1.dataset.numero;
                    carta2.textContent = carta2.dataset.numero;

                    primeiraCarta = null;
                    segundaCarta = null;

                    bloqueado = false;

                    trocarJogador();

                }, 1000);

            }

        });


        jogo.appendChild(carta);

    });

}


// FINALIZAR JOGO

function finalizarJogo() {

    let mensagem;


    if (pontos1 > pontos2) {

        mensagem =
            "🏆 PARABÉNS " +
            player1.toUpperCase() +
            "! VOCÊ GANHOU!";

    } else if (pontos2 > pontos1) {

        mensagem =
            "🏆 PARABÉNS " +
            player2.toUpperCase() +
            "! VOCÊ GANHOU!";

    } else {

        mensagem =
            "🤝 EMPATE! OS DOIS JOGARAM MUITO BEM!";

    }


    vezJogador.textContent = mensagem;

}
