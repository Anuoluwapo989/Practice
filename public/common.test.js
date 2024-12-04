// Import the function to be tested
const { playBackgroundMusic } = require('common.js');

// Mocking the Audio object
let mockAudioInstance;
global.Audio = jest.fn(() => {
    mockAudioInstance = {
        play: jest.fn(),
        pause: jest.fn(),
        volume: 1.0,
    };
    return mockAudioInstance;
});

describe('playBackgroundMusic function tests', () => {
    let settings;

    beforeEach(() => {
        // Reset the mock instance before each test
        jest.clearAllMocks();
        settings = {
            enableMusic: true,
            musicVolume: 1.0,
        };
    });

    it('should create an Audio object and start playing music', () => {
        playBackgroundMusic(settings);

        // Check if Audio was created with the correct file
        expect(global.Audio).toHaveBeenCalledWith('background.wav');

        // Check if the play method was called
        expect(mockAudioInstance.play).toHaveBeenCalled();
    });

    it('should not play music if the settings disable music', () => {
        settings.enableMusic = false;

        playBackgroundMusic(settings);

        // Audio should not be created
        expect(global.Audio).not.toHaveBeenCalled();

        // play method should not be called
        expect(mockAudioInstance.play).not.toHaveBeenCalled();
    });

    it('should adjust the volume based on the musicVolume setting', () => {
        settings.musicVolume = 0.75;

        playBackgroundMusic(settings);

        // Audio should be created and the volume adjusted
        expect(mockAudioInstance.volume).toBe(0.75);
    });
});