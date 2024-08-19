let musicas = [
    {titulo: 'Before i Forget', artista: 'Slipknot', source: 'beforeiforget.mpeg', img: 'slipknot.jpg'}
];

let musica = document.querySelector('audio');
let musicaIndex = 0;

let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let imagem = document.querySelector('img');
let tempoDecorrido = document.querySelector('.tempo .inicio');
let duracaoMusica = document.querySelector('.tempo .fim');
let barraProgresso = document.querySelector('progress');
let ponto = document.querySelector('.ponto');

// Inicializa a música
renderizarMusica(musicaIndex);

// EVENTOS
document.querySelector('.botao-play').addEventListener('click', tocarMusica);
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizarBarra);
document.querySelector('.anterior').addEventListener('click', () => {
    musicaIndex--; 
    if (musicaIndex < 0){
        musicaIndex = musicas.length - 1;
    }
    renderizarMusica(musicaIndex);
});
document.querySelector('.proximo').addEventListener('click', () => {
    musicaIndex++;
    if (musicaIndex >= musicas.length){
        musicaIndex = 0;
    }
    renderizarMusica(musicaIndex);
});

// FUNÇÕES

function renderizarMusica(musicaIndex) {
    musica.setAttribute('src', musicas[musicaIndex].source);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[musicaIndex].titulo;
        nomeArtista.textContent = musicas[musicaIndex].artista;
        imagem.src = musicas[musicaIndex].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });

    resetarBarra();
}

function tocarMusica() {
    musica.play();
    document.querySelector('.botao-play').style.display = 'none';
    document.querySelector('.botao-pause').style.display = 'block';
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.botao-play').style.display = 'block';
    document.querySelector('.botao-pause').style.display = 'none';
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;

    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos;
    }
    return `${campoMinutos}:${campoSegundos}`;
}

function atualizarBarra() {
    let progresso = (musica.currentTime / musica.duration) * 100;
    barraProgresso.value = progresso / 100;
    ponto.style.transform = `translateX(${progresso}%)`;
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function resetarBarra() {
    barraProgresso.value = 0;
    ponto.style.transform = 'translateX(0%)';
    tempoDecorrido.textContent = '0:00';
}
