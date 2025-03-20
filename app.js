'use strict'

// Botão Pesquisar
const pesquisar = document.getElementById('botaoPesquisa')
const personagens = document.getElementById('galeria')

// Função para encontrar o heroi digitado
async function pesquisarInformacoes(nome){
    const url = `https://superheroapi.com/api/896c3ae8a2e2d92b14388ca61a36127e/search/${nome}`

    const response  = await fetch(url) // fetch -> faz requisições web (conversa com o back)
    const data      = await response.json() // chamar apenas o json
}

// Função para criar os cards dentro da DIV 
function criarCard(json){

    json.forEach(item => {
        const card = document.createElement('div')
        card.classList.add('character-card')
        card.addEventListener('click', () => detalhesDoPersonagem(item))

        // Cria a imagem do personagem
        const img = document.createElement('img')
        img.src = item.image || './imgs/placeholder.jpg'
        img.alt = item.name

        // Cria o nome do personagem
        const name = document.createElement('h3')
        name.textContent = character.name
    })

    // const novoCard = document.createElement('div') // criando novo card
    // novoCard.innerHTML = `
    //     <h1>Legal</h1>
    // `
    // personagens.appendChild(novoCard)
}

async function preencherCard(){
    const valorDigitado = document.getElementById('barraPesquisa').value // Reconhece o valor digitado dentro do input 
    const herois = await pesquisarInformacoes(valorDigitado)

    const result = await criarCard()
    
    personagens.appendChild(result)
}

async function deletarTela(){
    const fundo = document.getElementById('imgPrincipal')
    const texto = document.getElementById('textoInicial')
    fundo.style.display = 'none';
    texto.style.display = 'none';
}

pesquisar.addEventListener('click', deletarTela, preencherCard)

// talvez fazer um foreach para rdar os ids e achar o nome do batman 
