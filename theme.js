"use strict";

class ThemeManager {
    constructor() {
        // Define theme settings (colors, background image, etc.)
        this.themes = {
            "default": { background: "#efe8d9", text: "#f9db54", button: "#000", cardBack: "backC.png" },
            "purple": { background: "#9f8dbe", text: "#cccccc", button: "#45404e", cardBack: "purple_back.png" },
            "red": { background: "#9c0909", text: "#000", button: "#a57575", cardBack: "red_back.png" },
            "blue": { background: "#7593a5", text: "#cccccc", button: "#d3d3d3", cardBack: "blue_back.png" },
            "gray": { background: "#a4a7a9", text: "#000", button: "#bfd1dd", cardBack: "gray_back.png" },
            "green": { background: "#699d8d", text: "#cccccc", button: "#c4efe2", cardBack: "green_back.png" },
            "dark": { background: "#1c2727", text: "#cccccc", button: "#414e4e", cardBack: "dark_back.png" }
        };

        // Get the current theme from localStorage or use the default theme
        const savedSettings = JSON.parse(localStorage.getItem('settings')) || { theme: "default" };
        this.applyTheme(savedSettings.theme);
    }

    // Apply the selected theme by updating CSS properties
    applyTheme(theme) {
        if (!this.themes[theme]) theme = "default"; // If theme doesn't exist, default to "default"

        // Extract theme colors and card back
        const { background, text, button, cardBack } = this.themes[theme];

        // Apply styles to the body, buttons, and other elements
        document.body.style.backgroundColor = background;
        document.body.style.color = text;

        // Update button colors dynamically
        document.querySelectorAll('button').forEach(buttonEl => {
            buttonEl.style.backgroundColor = button;
            buttonEl.style.color = text === "#fff" ? "#000" : "#fff"; // Ensure button text contrast
        });

        // Set custom property for card background
        document.documentElement.style.setProperty('--card-back', `url(${cardBack})`);

        // Save the selected theme to localStorage
        const settings = JSON.parse(localStorage.getItem('settings')) || {};
        settings.theme = theme;
        localStorage.setItem('settings', JSON.stringify(settings));
    }

    // Function to change theme (called on theme selector change)
    setTheme(theme) {
        this.applyTheme(theme);
    }
}

// Initialize ThemeManager instance
const themeManager = new ThemeManager();

// Add event listener to the theme selector dropdown to change theme on selection
document.getElementById('theme-selector').addEventListener('change', (event) => {
    // Set the theme and update localStorage
    themeManager.setTheme(event.target.value);
});