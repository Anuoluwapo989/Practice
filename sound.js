"use strict";

class SoundManager {
    constructor() {
        this.backgroundMusic = new Audio('background.mp3'); 
        this.pointSound = new Audio('point.wav');
        this.nopeSound = new Audio('nope.wav');
        this.levelSound = new Audio('level.wav');
        
        const savedSettings = JSON.parse(localStorage.getItem('settings')) || {
            musicVolume: 50,
            effectsVolume: 50,
            music: true,
        };

        this.setMusicVolume(savedSettings.musicVolume);
        this.setEffectsVolume(savedSettings.effectsVolume);
        this.toggleMusic(savedSettings.music);
    }

    setMusicVolume(volume) {
        this.backgroundMusic.volume = volume / 100;
    }

    setEffectsVolume(volume) {
        this.pointSound.volume = volume / 100;
        this.nopeSound.volume = volume / 100;
        this.levelSound.volume = volume / 100;
    }

    toggleMusic(isPlaying) {
        if (isPlaying) {
            this.backgroundMusic.loop = true;
            this.backgroundMusic.play().catch(error => {
                console.log("Music play prevented by browser:", error);
            });
        } else {
            this.backgroundMusic.pause();
        }
    }

    playSound(sound) {
        sound.currentTime = 0;
        sound.play().catch(error => {
            console.log("Sound play prevented by browser:", error);
        });
    }

    playPointSound() {
        this.playSound(this.pointSound);
    }

    playNopeSound() {
        this.playSound(this.nopeSound);
    }

    playLevelSound() {
        this.playSound(this.levelSound);
    }
}

// Export SoundManager instance
export const soundManager = new SoundManager();