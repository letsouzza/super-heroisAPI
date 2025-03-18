'use strict'

// Botão Pesquisar
const pesquisar = document.getElementById('botaoPesquisa')
const personagens = document.getElementById('galeria')

// Função para encontrar o heroi digitado
async function pesquisarInformacoes(nome){
    const url = `https://superheroapi.com/api/896c3ae8a2e2d92b14388ca61a36127e/${nome}`

    const response  = await fetch(url) // fetch -> faz requisições web (conversa com o back)
    const data      = await response.json() // chamar apenas o json
    console.log(data)
}

// Função para criar os cards dentro da DIV 
function criarCard(json){
    const novoCard = document.createElement('div') // criando novo card

    novoCard.innerHTML = `
            
    `


    personagens.appendChild(novoCard)
}

async function preencherCard(){
    const valorDigitado = document.getElementById('barraPesquisa').value // Reconhece o valor digitado dentro do input 
    const herois = await pesquisarInformacoes(heroi)

    fotos.forEach (criarImagem)
}

async function deletarTela(){
    const fundo = document.getElementById('imgPrincipal')
    const texto = document.getElementById('textoInicial')
    fundo.style.display = 'none';
    texto.style.display = 'none';
}

pesquisar.addEventListener('click', deletarTela, preencherCard)

// talvez fazer um foreach para rdar os ids e achar o nome do batman 
