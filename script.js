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


const imagens = [
    "Imagens/foto1.png",
    "Imagens/foto2.png",
    "Imagens/foto3.png",
    "Imagens/foto4.png",
    "Imagens/foto5.png",
    "Imagens/foto6.png",
    "Imagens/foto7.png",
    "Imagens/foto8.png",
    "Imagens/foto9.png",
    "Imagens/foto10.png",
    "Imagens/foto11.png",
    "Imagens/foto12.png",
    "Imagens/foto13.png",
    "Imagens/foto14.png",
    "Imagens/foto15.png",
    "Imagens/foto16.png",
    "Imagens/foto17.png",
    "Imagens/foto18.png",
    "Imagens/foto19.png",
    "Imagens/foto20.png"
];


// COMEÇAR O JOGO

botaoComecar.addEventListener("click", function() {

    player1 = nomePlayer1.value.trim();
    player2 = nomePlayer2.value.trim();


    // VERIFICA SE OS NOMES FORAM PREENCHIDOS

    if (player1 === "" || player2 === "") {

        alert("⚠️ Por favor, preencha o nome dos dois jogadores!");

        return;
    }


    mostrarPlayer1.textContent = player1;
    mostrarPlayer2.textContent = player2;

    pontosPlayer1.textContent = "0";
    pontosPlayer2.textContent = "0";

    pontos1 = 0;
    pontos2 = 0;
    jogadorAtual = 0;
    paresEncontrados = 0;

    vezJogador.textContent = "🎯 Vez de: " + player1;

    telaInicial.style.display = "none";
    telaJogo.style.display = "block";

});


// ATUALIZA A VEZ

function atualizarVez() {

    if (jogadorAtual === 0) {

        vezJogador.textContent = "🎯 Vez de: " + player1;

    } else {

        vezJogador.textContent = "🎯 Vez de: " + player2;

    }

}


// TROCA O JOGADOR

function trocarJogador() {

    if (jogadorAtual === 0) {

        jogadorAtual = 1;

    } else {

        jogadorAtual = 0;

    }

    atualizarVez();

}


// ADICIONA PONTO

function adicionarPonto() {

    if (jogadorAtual === 0) {

        pontos1++;

        pontosPlayer1.textContent = pontos1;

    } else {

        pontos2++;

        pontosPlayer2.textContent = pontos2;

    }

}


// CRIA E EMBARALHA AS CARTAS

let cartas = [...imagens, ...imagens];

cartas.sort(() => Math.random() - 0.5);


let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;


// CRIA AS CARTAS

cartas.forEach(function(imagem, indice) {

    const carta = document.createElement("div");

    carta.classList.add("carta");

    carta.innerHTML = indice + 1;

    carta.dataset.imagem = imagem;

    carta.dataset.numero = indice + 1;


    carta.addEventListener("click", function() {

        if (bloqueado) return;

        if (carta === primeiraCarta) return;


        carta.innerHTML = `<img src="${carta.dataset.imagem}" alt="Foto">`;


        if (primeiraCarta === null) {

            primeiraCarta = carta;

        } else {

            segundaCarta = carta;

            bloqueado = true;


            // SE ACERTOU

            if (
                primeiraCarta.dataset.imagem ===
                segundaCarta.dataset.imagem
            ) {

                const carta1 = primeiraCarta;
                const carta2 = segundaCarta;


                // ADICIONA 1 PONTO

                adicionarPonto();

                paresEncontrados++;


                setTimeout(function() {

                    carta1.remove();
                    carta2.remove();


                    // VERIFICA SE O JOGO TERMINOU

                    if (paresEncontrados === 20) {

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


                }, 500);


                primeiraCarta = null;
                segundaCarta = null;

                bloqueado = false;


                // QUEM ACERTOU CONTINUA JOGANDO


            } else {


                // SE ERROU

                const carta1 = primeiraCarta;
                const carta2 = segundaCarta;


                setTimeout(function() {

                    carta1.innerHTML = carta1.dataset.numero;
                    carta2.innerHTML = carta2.dataset.numero;

                    primeiraCarta = null;
                    segundaCarta = null;

                    bloqueado = false;


                    // PASSA A VEZ

                    trocarJogador();


                }, 1000);

            }

        }

    });


    jogo.appendChild(carta);

});