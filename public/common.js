// "use strict";

let backgroundMusic;

function playBackgroundMusic() {
    if (!backgroundMusic) {
        backgroundMusic = new Audio('../assets/background.mp3');
        backgroundMusic.loop = true;

        const settings = JSON.parse(localStorage.getItem('settings')) || { music: true, musicVolume: 50 };

        if (settings.music) {
            backgroundMusic.volume = settings.musicVolume / 100;
            backgroundMusic.play().catch((error) => {
                console.log("Music play prevented by browser:", error);
            });
        }
    } else if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
}
// export {}
// to be accessible globally
window.playBackgroundMusic = playBackgroundMusic;