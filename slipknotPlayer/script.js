document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.querySelector('.botao-play');
    const pauseButton = document.querySelector('.botao-pause');
    const prevButton = document.querySelector('.anterior');
    const nextButton = document.querySelector('.proximo');
    const progress = document.querySelector('progress');
    const currentTimeDisplay = document.querySelector('.inicio');
    const durationDisplay = document.querySelector('.fim');
    const audio = document.querySelector('audio');
    const ponto = document.querySelector('.ponto');

    let isPlaying = false;

    // Play button event
    playButton.addEventListener('click', function () {
        audio.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
        isPlaying = true;
    });

    // Pause button event
    pauseButton.addEventListener('click', function () {
        audio.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        isPlaying = false;
    });

    // Update progress bar and time display
    audio.addEventListener('timeupdate', function () {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        progress.value = currentTime / duration;
        currentTimeDisplay.textContent = formatTime(currentTime);
        durationDisplay.textContent = formatTime(duration);

        // Atualiza a posição do ponto de progresso
        const progressWidth = progress.clientWidth;
        const pontoPosition = (currentTime / duration) * progressWidth;
        ponto.style.left = `${pontoPosition}px`;
    });

    // Skip to previous track (placeholder functionality)
    prevButton.addEventListener('click', function () {
        // Placeholder: você pode adicionar a funcionalidade real para a faixa anterior aqui
        console.log('Previous track');
    });

    // Skip to next track (placeholder functionality)
    nextButton.addEventListener('click', function () {
        // Placeholder: você pode adicionar a funcionalidade real para a próxima faixa aqui
        console.log('Next track');
    });

    // Atualiza o tempo do áudio ao clicar na barra de progresso
    progress.addEventListener('click', function (e) {
        const progressWidth = progress.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        const newTime = (clickX / progressWidth) * duration;
        audio.currentTime = newTime;
    });

    // Formata o tempo de segundos para minutos:segundos
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
