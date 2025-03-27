'use strict'

// Reconhecendo pelo ID tudo que será necessário para executar alguma função
const botaoPesquisa = document.getElementById('botaoPesquisa')
const barraPesquisa = document.getElementById('barraPesquisa')
const galeria = document.getElementById('galeria')
const detalhes = document.getElementById('detalhes')
const imgPrincipal = document.getElementById('imgPrincipal')
const textoInicial = document.getElementById('textoInicial')
const fundo = document.getElementById('fundo')

// Função para buscar herói na API
async function buscarHeroi(termo) {
    closeDetalhe() // Fecha o card de detalhes
    try {
        // Buscar por nome
        const response = await fetch(`https://www.superheroapi.com/api.php/896c3ae8a2e2d92b14388ca61a36127e/search/${termo}`) // URL da API
        const data = await response.json()
        
        // Confirmar que está retornando algum dado 
        if (data.response === "success" && data.results.length > 0) {
            return data.results //Return dos resultados da busca pelo nome
        }
        
        // Busca por ID
        if (!isNaN(termo)) {
            const responseById = await fetch(`https://www.superheroapi.com/api.php/896c3ae8a2e2d92b14388ca61a36127e/${termo}`)
            const hero = await responseById.json()
            
            // Confirmar que está retornando algum dado 
            if (hero.response === "success") {
                return [hero] //Return de array do heroi
            }
        }
        
        return []
    } catch (error) {
        console.error("Erro na API:", error)
        return [] // Retornar um Array vazio caso de um erro na API 
    }
}

// Função para criar o Card
function criarCard(heroi) {
    const card = document.createElement('div') // Cria o card
    card.className = 'character-card'
    card.addEventListener('click', () => detalhesPersonagem(heroi))
    
    // Pegar e colocar a imagem da API
    const img = document.createElement('img')
    img.src = heroi.image?.url || './img/placeholder.jpg'
    img.alt = heroi.name
    
    // Acrescentar o apelido do personagem
    const nome = document.createElement('h2')
    nome.textContent = heroi.name
    
    // Acrescentar o ID do personagem
    const id = document.createElement('p')
    id.textContent = `ID: ${heroi.id}`

    // Acrescentar o nome do personagem
    const nomeCompleto = document.createElement('h3')
    nomeCompleto.textContent = `Nome: ${heroi.biography["full-name"]} `
    
    // Colocar tudo no Card
    card.append(img, nome, id, nomeCompleto)
    return card
}

// Função do card de novos detalhes do personagem
async function detalhesPersonagem(heroi) {
    galeria.replaceChildren() // Apaga toda a tela anterior 

    const cardDetalhes = document.createElement('div') // Cria o card
    cardDetalhes.className = 'character-details'

    // Pegar e colocar a imagem da API
    const imgDetalhes = document.createElement('img')
    imgDetalhes.src = heroi.image?.url || './img/placeholder.jpg'
    imgDetalhes.alt = heroi.name

    const nomeDetalhes = document.createElement('h2')
    nomeDetalhes.textContent = heroi.name

    const idDetalhes = document.createElement('span')
    idDetalhes.textContent = `ID: ${heroi.id}`


    // Acrescentar Biografia do personagem 
    const divBiografia = document.createElement('div')
    divBiografia.className = 'character-biography'

    const nomeCompletoDetalhes = document.createElement('p')
    nomeCompletoDetalhes.textContent = `Nome: ${heroi.biography["full-name"]}`
    divBiografia.appendChild(nomeCompletoDetalhes)

    const aparicao = document.createElement('p')
    aparicao.textContent = `Primeira Aparição: ${heroi.biography["first-appearance"]}`
    divBiografia.appendChild(aparicao)

    const publicador = document.createElement('p')
    publicador.textContent = `Editor: ${heroi.biography["publisher"]}`
    divBiografia.appendChild(publicador)

    const alinhamento = document.createElement('p')
    alinhamento.textContent = `Alinhamento: ${heroi.biography["alignment"]}`
    divBiografia.appendChild(alinhamento)


    // Acrescentar Aparência do personagem 
    const divAparencia = document.createElement('div')
    divAparencia.className = 'character-appearence'

    const tituloAparencia = document.createElement('h1')
    tituloAparencia.textContent = 'Aparência'

    const listaAparencia = document.createElement('ul')

    const genero = document.createElement('li')
    genero.textContent = `Gênero: ${heroi.appearance["gender"]}`
    listaAparencia.appendChild(genero)

    const peso = document.createElement('li')
    peso.textContent = `Peso: ${heroi.appearance["weight"]}`
    listaAparencia.appendChild(peso)

    const altura = document.createElement('li')
    altura.textContent = `Altura: ${heroi.appearance["height"]}`    
    listaAparencia.appendChild(altura)

    const corCabelo = document.createElement('li')
    corCabelo.textContent = `Cor do Cabelo: ${heroi.appearance["hair-color"]}`
    listaAparencia.appendChild(corCabelo)

    const corOlhos = document.createElement('li')
    corOlhos.textContent = `Cor dos Olhos: ${heroi.appearance["eye-color"]}`
    listaAparencia.appendChild(corOlhos)

    divAparencia.appendChild(tituloAparencia)
    divAparencia.appendChild(listaAparencia)


    // Acrescentar o Poder do personagem 
    const divPoderes = document.createElement("div")
    divPoderes.className = "character-power"

    const tituloPoderes = document.createElement('h1')
    tituloPoderes.textContent = 'Poder'
    divPoderes.appendChild(tituloPoderes)
    
    const icons = document.createElement('img')
    icons.src = ('./img/icons.png')
    divPoderes.appendChild(icons)

    const inteligencia = document.createElement("p")
    inteligencia.textContent = `Inteligência: ${heroi.powerstats["intelligence"]}`
    divPoderes.appendChild(inteligencia)

    const forca = document.createElement("p")
    forca.textContent = `Força: ${heroi.powerstats["strength"]}`
    divPoderes.appendChild(forca)

    const velocidade = document.createElement("p")
    velocidade.textContent = `Velocidade: ${heroi.powerstats["speed"]}`
    divPoderes.appendChild(velocidade)

    const durabilidade = document.createElement("p")
    durabilidade.textContent = `Durabilidade: ${heroi.powerstats["durability"]}`
    divPoderes.appendChild(durabilidade)

    const poder = document.createElement("p")
    poder.textContent = `Poder: ${heroi.powerstats["power"]}`
    divPoderes.appendChild(poder)

    const combate = document.createElement("p")
    combate.textContent = `Combate: ${heroi.powerstats["combat"]}`
    divPoderes.appendChild(combate)

    const linha = document.createElement('div')
    linha.className = 'line'

    // Icon de X para fechar a página
    const x = document.createElement('img')
    x.className = 'closeDetalhe'
    x.src = './img/excluir.png'
    x.id = 'closeDetalhe'

    // Acrescentando no card todos os outros itens
    cardDetalhes.appendChild(imgDetalhes)
    cardDetalhes.appendChild(nomeDetalhes)
    cardDetalhes.appendChild(idDetalhes)
    cardDetalhes.appendChild(divBiografia)
    cardDetalhes.appendChild(divAparencia)
    cardDetalhes.appendChild(divPoderes)
    cardDetalhes.appendChild(linha)
    cardDetalhes.appendChild(x)

    detalhes.appendChild(cardDetalhes)
    detalhes.style.visibility = 'visible'; // Carcterizando a div como visível
    
    // Chama a função fechar ao clicar no botão
    const xCloseCard = document.getElementById('closeDetalhe')
    xCloseCard.addEventListener('click', closeDetalhe)

    return detalhes
}

// Função para deletar os itens da tela estática
function limparTela() {
    imgPrincipal.style.display = 'none'
    textoInicial.style.display = 'none'
    fundo.style.display = 'none'
    galeria.innerHTML = ''
    galeria.style.display = 'grid' // Define o container como grid para melhor organizar na página 
}

// Função para executar todas as outras (limpar tela, pesquisar e mostrar os cards)
async function exibirHerois() {
    const termo = barraPesquisa.value.trim()  // Reconhecer o valor digitado na barra de pesquisa
    
    // Mensagem de erro caso clique no botão sem digitar nenhum nome ou ID
    if (!termo) {
        alert('Por favor, digite um nome ou ID de herói')
        return
    }
    
    // Executa a função de limpar a tela
    limparTela()
    
    // Mensagem de carregamento enquanto procura na API os pesonagens 
    const loading = document.createElement('div')
    loading.textContent = 'Buscando heróis...'
    loading.className = 'mensagem-carregamento'
    galeria.appendChild(loading)
    
    // Executa a função buscar herói
    const herois = await buscarHeroi(termo)
    
    galeria.innerHTML = ''
    
    // Mensagem de erro caso digite um heroi ou ID que não existe 
    if (herois.length === 0) {
        const mensagem = document.createElement('p')
        mensagem.textContent = 'Nenhum herói encontrado. Tente outro nome ou ID.'
        mensagem.className = 'mensagem-erro'
        galeria.appendChild(mensagem)
        return
    }
    
    // Acrescenta dentro da div galeria os cards 
    herois.forEach(heroi => {
        galeria.appendChild(criarCard(heroi))
    })
}

// Função para fechar a tela detalhes
const closeDetalhe = () => {
    detalhes.innerHTML = ''
    detalhes.style.visibility = 'hidden' // Esconde a tela
}

// Clique do botão
botaoPesquisa.addEventListener('click', exibirHerois)
barraPesquisa.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') exibirHerois() // Quando pressionar a tecla enter ele pesquisa
})