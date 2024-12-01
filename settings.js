"use strict";

// Settings object to store values
let settings = JSON.parse(localStorage.getItem('settings')) || {
    musicVolume: 50,
    effectsVolume: 50,
    music: true,
    theme: 'default',
    difficulty: 'easy'
};

// Function to load settings into the UI
function loadSettings() {
    const musicVolumeSlider = document.getElementById('music-volume');
    const effectsVolumeSlider = document.getElementById('effects-volume');
    const musicToggle = document.getElementById('music-toggle');
    const themeSelector = document.getElementById('theme-selector');

    // Initialize UI with current settings
    musicVolumeSlider.value = settings.musicVolume;
    effectsVolumeSlider.value = settings.effectsVolume;
    musicToggle.checked = settings.music;
    themeSelector.value = settings.theme;
}

// Function to save settings from the UI to localStorage
function saveSettings() {
    const musicVolumeSlider = document.getElementById('music-volume');
    const effectsVolumeSlider = document.getElementById('effects-volume');
    const musicToggle = document.getElementById('music-toggle');
    const themeSelector = document.getElementById('theme-selector');

    settings.musicVolume = musicVolumeSlider.value;
    settings.effectsVolume = effectsVolumeSlider.value;
    settings.music = musicToggle.checked;
    settings.theme = themeSelector.value;

    // Store settings in localStorage
    localStorage.setItem('settings', JSON.stringify(settings));
    alert('Settings saved!');
}

// Function to navigate back to the previous page
function goBack() {
    window.history.back();
}

// Load settings into the UI on page load
document.addEventListener('DOMContentLoaded', loadSettings);

// Add event listeners to buttons
document.getElementById('save-button').addEventListener('click', () => {
    saveSettings();
    // Apply the selected theme immediately
    themeManager.setTheme(settings.theme);
});

document.getElementById('back-button').addEventListener('click', goBack);